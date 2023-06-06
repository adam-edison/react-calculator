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

export type Operation = (typeof SymbolValues)[number];

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

  function handleClick(symbol: CalculatorSymbol) {
    if (symbol === 'C') {
      setCurrent('0');
      return;
    }

    const isNumeric = /[0-9]/.test(String(symbol));

    if (isNumeric && current === '0') {
      setCurrent(`${symbol}`);
      return;
    }

    if (isNumeric) {
      setCurrent(`${current}${symbol}`);
    }
  }

  return (
    <div>
      <h1>Calculator</h1>
      <input type="text" value={current} role="presentation" disabled />
      <div role="grid">{rows.map((row) => buttonRow(row, handleClick))}</div>
    </div>
  );
};

/// TODO: maybe extract this as a separate component?
const buttonRow = (row: CalculatorSymbol[], onClick: Function) => {
  return (
    <div role="row" key={row.toString()}>
      {row.map((n) => (
        <button key={`button${n}`} onClick={() => onClick(n)}>
          {String(n)}
        </button>
      ))}
    </div>
  );
};
