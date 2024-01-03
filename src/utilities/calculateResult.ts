import type { CalcData } from '../types';

export const calculateResult = (calcData: CalcData) => {
  const firstNum = Number(calcData.result) || Number(calcData.previousNum);
  let secondNum = Number(calcData.currentNum) || Number(calcData.previousNum) || Number(calcData.result);

  const op = calcData.operation;

  if (calcData.currentNum[0] === '0' && calcData.currentNum.length === 1) {
    secondNum = 0;
  }

  switch (op) {
    case '+':
      return (firstNum + secondNum).toString();
    case '-':
      return (firstNum - secondNum).toString();
    case 'x':
      return (firstNum * secondNum).toString();
    case '÷':
      return (firstNum / secondNum).toString();
  }
};
