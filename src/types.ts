export type MainOperations = '+' | '-' | 'x' | '÷';
export type OtherOperations = 'clear' | '=' | '.' | '%' | '+/-';

export interface CalcData {
  currentNum: string;
  previousNum: string;
  operation?: MainOperations;
  result: string;
}

export interface ButtonData {
  operation: string | undefined;
  clearOption: string;
}
