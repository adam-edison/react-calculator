import { useState } from 'react';

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

const empty = '';

export const Calculator = () => {
  const [value, setValue] = useState(empty);

  return (
    <div>
      <h1>Calculator</h1>
      <input type="text" value={value} role="presentation" disabled />
      <div role="grid">
        {rows.map((row) => buttonRow(row, value, setValue))}
      </div>
    </div>
  );
};

const buttonRow = (row: CalculatorSymbol[], value, setValue: Function) => {
  return (
    <div role="row" key={row.toString()}>
      {row.map((n) => (
        <button
          key={`button${n}`}
          onClick={() => handleClick(n, value, setValue)}>
          {String(n)}
        </button>
      ))}
    </div>
  );
};

export function handleClick(
  symbol: CalculatorSymbol,
  value: string,
  setValue: Function,
) {
  if (symbol !== '=') {
    setValue(value.concat(String(symbol)));
  }
}
