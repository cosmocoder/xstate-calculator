import type { CalcData } from '../../types';

export interface DisplayProps {
  currentCalc: CalcData;
}

const calculateFontSize = (numLength: number) => {
  const excess = numLength - 6;
  const calculatedSize = 50 - excess * 3.5;
  const fontSize = calculatedSize > 18 ? calculatedSize : 18;
  return `${fontSize}px`;
};

export const Display = ({ currentCalc }: DisplayProps) => {
  const { previousNum, currentNum, result } = currentCalc;

  const numToDisplay = result || currentNum || previousNum || '0';

  const numLength = numToDisplay.toString().length;

  const style = numLength > 7 ? { fontSize: calculateFontSize(numLength) } : undefined;

  return (
    <div style={style} className="display">
      {numToDisplay}
    </div>
  );
};
