import { h, Fragment } from "preact";
import { useState, useEffect } from "preact/hooks";
import { evaluate } from "../lib/evaluate.worker";
import { replace, read } from "../lib/urlHash";

const childStyle = {
  flex: "1",
  height: "100%",
  padding: "10px",
  overflowY: "scroll",
  overflowX: "scroll",
  fontSize: "16px",
  fontFamily:
    'Menlo, Monaco, "Courier New", monospace, "Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
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
      spellcheck={false}
    />
  );
}

type FormattedProps = {
  value: string;
};
function Formatted(props: FormattedProps) {
  const { value } = props;
  const [formatted, setFormatted] = useState<null | string>("");
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
  return (
    <textarea
      style={childStyle}
      value={formatted ?? "...loading"}
      readOnly
      spellcheck={false}
    />
  );
}

const playgroundStyle = {
  display: "flex",
  height: "calc(100vh - 40px)"
};
const initialSource = `group(concat(["foo", hardline, "bar"]))`;
export default function Playground() {
  const [source, setSource] = useState(initialSource);
  useEffect(() => {
    const { source } = read();
    if (source) {
      setSource(source);
    } else {
      setSource(initialSource);
    }
  }, []);
  useEffect(() => {
    replace({ source });
  }, [source]);
  return (
    <div style={playgroundStyle}>
      <Fragment>
        <CodeEditor value={source} onInput={setSource} />
        <Formatted value={source} />{" "}
      </Fragment>
    </div>
  );
}
