import { SetStateAction, useState } from 'react';
import {
  CalculatorSymbol,
  Operation,
  isNumericOperand,
  isOperation,
} from './Calculator.types';
import { ButtonRow } from './ButtonRow';

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
      <div role="grid">{rows.map((row) => ButtonRow(row, handleClick))}</div>
    </div>
  );
};

function performCalculation(calculatorState: CalculatorState): Number {
  const { firstOperand, secondOperand, operation } = calculatorState;

  if (operation === '+') {
    return Number(firstOperand) + Number(secondOperand);
  }

  if (operation === '-') {
    return Number(firstOperand) - Number(secondOperand);
  }

  if (operation === 'X') {
    return Number(firstOperand) * Number(secondOperand);
  }

  if (operation === '/') {
    return Number(firstOperand) / Number(secondOperand);
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
  let { firstOperand, secondOperand, operation } = calculatorState;

  if (isOperation(symbol) && symbol === 'C') {
    setCalculatorState(initialCalculatorState);
    return;
  }

  if (isOperation(symbol) && symbol === '.' && !operation) {
    firstOperand = `${firstOperand}${symbol}`;

    setCalculatorState({
      ...calculatorState,
      firstOperand,
      displayValue: firstOperand,
    });
    return;
  }

  if (isOperation(symbol) && symbol === '.' && operation) {
    secondOperand = `${secondOperand}${symbol}`;

    setCalculatorState({
      ...calculatorState,
      firstOperand,
      displayValue: secondOperand,
    });
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
      firstOperand: `${result}`,
      secondOperand: null,
      operation: null,
    });
    return;
  }
}
