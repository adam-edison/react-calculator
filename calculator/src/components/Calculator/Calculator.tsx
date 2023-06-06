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

// TODO: refactor in const case
// TODO: add default value of '0' as constant
const empty = '';

export const Calculator = () => {
  const [current, setCurrent] = useState<string>('0');

  return (
    <div>
      <h1>Calculator</h1>
      <input type="text" value={current} role="presentation" disabled />
      <div role="grid">
        {rows.map((row) => buttonRow(row, current, setCurrent))}
      </div>
    </div>
  );
};

const buttonRow = (
  row: CalculatorSymbol[],
  current: string,
  setCurrent: Function,
) => {
  return (
    <div role="row" key={row.toString()}>
      {row.map((n) => (
        <button
          key={`button${n}`}
          onClick={() => handleClick(n, current, setCurrent)}>
          {String(n)}
        </button>
      ))}
    </div>
  );
};

export function handleClick(
  symbol: CalculatorSymbol,
  current: string,
  setCurrent: Function,
) {
  if (symbol === 'C') {
    setCurrent('0');
    return;
  }

  const isNumeric = /[0-9]/.test(String(symbol));

  if (isNumeric && current === '0') {
    current = empty;
  }

  if (isNumeric) {
    setCurrent(`${current}${symbol}`);
  }
}
