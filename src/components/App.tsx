import { h } from "preact";
import Header from "./Header";
import Playground from "./Playground";

const appStyle = {
  height: "100vh",
};

export default function App() {
  return (
    <div style={appStyle}>
      <Header />
      <Playground />
    </div>
  );
}
