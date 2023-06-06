import { useState } from 'react';

export const NumberValues = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] as const;
export const SymbolValues = [
  '+',
  '-',
  'X',
  '/',
  '=',
  'C',
  '+/-',
  '%',
  '.',
  '=',
] as const;

export type CalculatorSymbol =
  | (typeof NumberValues)[number]
  | (typeof SymbolValues)[number];

const rows: CalculatorSymbol[][] = [
  ['C', '+/-', '%', '/'],
  [7, 8, 9, 'X'],
  [4, 5, 6, '-'],
  [1, 2, 3, '+'],
  [0, '.', '='],
];

const empty = '';

export const Calculator = () => {
  const [value, setValue] = useState<string>('0');

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

const buttonRow = (
  row: CalculatorSymbol[],
  value: string,
  setValue: Function,
) => {
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
  const isNumeric = /[0-9]/.test(String(symbol));

  if (isNumeric && value === '0') {
    value = empty;
  }

  if (isNumeric) {
    setValue(`${value}${symbol}`);
  }
}
