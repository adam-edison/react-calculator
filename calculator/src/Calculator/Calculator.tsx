const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] as const;
const symbols = ['+', '-', 'X', '/', '=', 'C', '+/-', '%', '.', '='] as const;

export type CalculatorSymbol =
  | (typeof numbers)[number]
  | (typeof symbols)[number];

const rows: CalculatorSymbol[][] = [
  ['C', '+/-', '%', '/'],
  [7, 8, 9, 'X'],
  [4, 5, 6, '-'],
  [1, 2, 3, '+'],
  [0, '.', '='],
];

export const Calculator = () => (
  <div>
    <h1>Calculator</h1>
    <div role="grid">{rows.map(buttonRow)}</div>
  </div>
);

const buttonRow = (row: CalculatorSymbol[]) => {
  return (
    <div role="row" key={row.toString()}>
      {row.map((n) => (
        <button key={`button${n}`}>{String(n)}</button>
      ))}
    </div>
  );
};
