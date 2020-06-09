import type { evaluate as original } from "prettier-doc-interpreter";

type Promisify<T extends (...args: any) => any> = (
  ...args: Parameters<T>
) => Promise<ReturnType<T>>;

let _evaluate: null | typeof original;

export const evaluate: Promisify<typeof original> = async (source, options) => {
  if (!_evaluate) {
    const label = "import prettier-doc-interpreter";
    console.time(label);
    _evaluate = (await import("prettier-doc-interpreter")).evaluate;
    console.timeEnd(label);
  }
  return _evaluate(source, options);
};
