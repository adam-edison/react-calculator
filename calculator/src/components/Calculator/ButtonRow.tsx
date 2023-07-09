import { CalculatorSymbol } from './Calculator.types';

export const ButtonRow = (row: CalculatorSymbol[], onClick: Function) => {
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
