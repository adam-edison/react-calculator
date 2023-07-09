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
