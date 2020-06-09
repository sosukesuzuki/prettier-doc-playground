import { h, render } from "preact";

function App() {
  return <h1>hello</h1>;
}

/* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */
render(<App />, document.querySelector(".root")!);
