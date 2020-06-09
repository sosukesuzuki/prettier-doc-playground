import { h, Fragment } from "preact";
import { useState, useEffect } from "preact/hooks";
import { evaluate } from "../lib/evaluate.worker";

const childStyle = {
  flex: "1",
  height: "100%",
};

type CodeEditorProps = {
  onInput: (value: string) => void;
  value: string;
};
function CodeEditor(props: CodeEditorProps) {
  const { onInput, value } = props;
  return (
    <textarea
      style={childStyle}
      value={value}
      onInput={(e) => {
        /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
        const value = (e.target as any).value as string;
        onInput(value);
      }}
    />
  );
}

type FormattedProps = {
  value: string;
};
function Formatted(props: FormattedProps) {
  const { value } = props;
  const [formatted, setFormatted] = useState("");
  useEffect(() => {
    (async () => {
      let result: string;
      try {
        result = await evaluate(value);
      } catch (error) {
        result = error.message;
      }
      setFormatted(result);
    })();
  }, [value]);
  return <textarea style={childStyle} value={formatted} readOnly />;
}

const playgroundStyle = {
  display: "flex",
};
const initialSource = `group(concat(["foo", hardline, "bar"]))`;
export default function Playground() {
  const [source, setSource] = useState(initialSource);
  return (
    <div style={playgroundStyle}>
      <Fragment>
        <CodeEditor value={source} onInput={setSource} />
        <Formatted value={source} />{" "}
      </Fragment>
    </div>
  );
}
