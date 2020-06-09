import { h, render } from "preact";
import "minireset.css";
import App from "./components/App";

/* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */
render(<App />, document.querySelector(".root")!);
