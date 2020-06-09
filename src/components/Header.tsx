import { h } from "preact";
import { BACKGROUND_COLOR, TEXT_COLOR } from "../lib/colors";

const headerStyle = {
  backgroundColor: BACKGROUND_COLOR,
  color: TEXT_COLOR,
  padding: "10px",
  display: "flex",
  justifyContent: "space-between",
};
const anchorStyle = {
  color: TEXT_COLOR,
  textDecoration: "underline",
};

export default function Header() {
  return (
    <header style={headerStyle}>
      <h1>prettier doc playground</h1>
      <a
        href="https://github.com/sosukesuzuki/prettier-doc-playground"
        style={anchorStyle}
      >
        GitHub
      </a>
    </header>
  );
}
