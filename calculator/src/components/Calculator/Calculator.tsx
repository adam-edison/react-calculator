import { SetStateAction, useState } from 'react';

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
export type NumericOperand = (typeof NumberValues)[number];

export const isOperation = (value: any): value is Operation =>
  SymbolValues.includes(value);

export const isNumericOperand = (value: any): value is NumericOperand =>
  NumberValues.includes(value);

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

export interface CalculatorState {
  displayValue: string;
  firstOperand: string | null;
  secondOperand: string | null;
  operation: Operation | null;
}

const initialCalculatorState: CalculatorState = {
  displayValue: '0',
  firstOperand: null,
  secondOperand: null,
  operation: null,
};

export const Calculator = () => {
  const [calculatorState, setCalculatorState] = useState<CalculatorState>(
    initialCalculatorState,
  );

  function handleClick(symbol: CalculatorSymbol) {
    handleCalculatorButtonPress(calculatorState, setCalculatorState, symbol);
  }

  return (
    <div>
      <h1>Calculator</h1>
      <input
        type="text"
        value={calculatorState.displayValue}
        role="presentation"
        disabled
      />
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

function performCalculation(calculatorState: CalculatorState): Number {
  console.error('perform calculation', { calculatorState });
  const { firstOperand, secondOperand, operation } = calculatorState;

  if (operation === '+') {
    return Number(firstOperand) + Number(secondOperand);
  }

  return 0;
}

function handleEmptyOrZeroCase(operand: string | null) {
  if (operand === null || operand === '0') {
    return '';
  }

  return operand;
}

function handleCalculatorButtonPress(
  calculatorState: CalculatorState,
  setCalculatorState: {
    (value: SetStateAction<CalculatorState>): void;
    (arg0: CalculatorState): void;
  },
  symbol: CalculatorSymbol,
) {
  let { displayValue, firstOperand, secondOperand, operation } =
    calculatorState;

  if (isOperation(symbol) && symbol === 'C') {
    setCalculatorState(initialCalculatorState);
    return;
  }

  if (isNumericOperand(symbol) && !operation) {
    firstOperand = handleEmptyOrZeroCase(firstOperand);
    firstOperand = `${firstOperand}${symbol}`;

    setCalculatorState({
      ...calculatorState,
      firstOperand,
      displayValue: firstOperand,
    });
    return;
  }

  if (isOperation(symbol) && firstOperand && !secondOperand && !operation) {
    setCalculatorState({
      ...calculatorState,
      operation: symbol,
    });
    return;
  }

  if (isNumericOperand(symbol) && firstOperand && operation) {
    secondOperand = handleEmptyOrZeroCase(secondOperand);
    secondOperand = `${secondOperand}${symbol}`;

    setCalculatorState({
      ...calculatorState,
      secondOperand,
      displayValue: secondOperand,
    });
    return;
  }

  if (isOperation(symbol) && symbol === '=' && firstOperand && secondOperand) {
    const result = performCalculation(calculatorState);
    setCalculatorState({
      ...calculatorState,
      displayValue: `${result}`,
      firstOperand: displayValue,
      secondOperand: null,
    });
    return;
  }
}
