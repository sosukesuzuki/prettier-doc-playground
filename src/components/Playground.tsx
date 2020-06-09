import { h } from "preact";
import { useState } from "preact/hooks";

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
  return <div style={childStyle}>{value}</div>;
}

const playgroundStyle = {
  display: "flex",
};
const initialSource = `group(concat(["foo", hardline, "bar"]))`;
export default function Playground() {
  const [source, setSource] = useState(initialSource);
  return (
    <div style={playgroundStyle}>
      <CodeEditor value={source} onInput={setSource} />
      <Formatted value={source} />
    </div>
  );
}
