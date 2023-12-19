import { nanoid } from 'nanoid';
import type { MouseEvent } from 'react';
import type { ButtonData } from '../../types';

interface ButtonProps {
  handleClick: (e: MouseEvent<HTMLButtonElement>) => void;
  buttonData: ButtonData;
}

const checkIfHighlighted = (item: string, buttonData: ButtonData) => {
  return item === buttonData.operation ? 'highlight' : '';
};

interface ButtonItem {
  display: number | string;
  className: string;
  dataProp: string;
}

const buttonsList: ButtonItem[] = [
  {
    display: 0,
    className: `number-button zero`,
    dataProp: 'data-number',
  },
  {
    display: 1,
    className: `number-button one`,
    dataProp: 'data-number',
  },
  {
    display: 2,
    className: `number-button two`,
    dataProp: 'data-number',
  },
  {
    display: 3,
    className: `number-button three`,
    dataProp: 'data-number',
  },
  {
    display: 4,
    className: `number-button four`,
    dataProp: 'data-number',
  },
  {
    display: 5,
    className: `number-button five`,
    dataProp: 'data-number',
  },
  {
    display: 6,
    className: `number-button six`,
    dataProp: 'data-number',
  },
  {
    display: 7,
    className: `number-button seven`,
    dataProp: 'data-number',
  },
  {
    display: 8,
    className: `number-button eight`,
    dataProp: 'data-number',
  },
  {
    display: 9,
    className: `number-button nine`,
    dataProp: 'data-number',
  },
  {
    display: '+',
    className: `operation-button plus`,
    dataProp: 'data-operation',
  },
  {
    display: '-',
    className: `operation-button minus`,
    dataProp: 'data-operation',
  },
  {
    display: 'x',
    className: `operation-button times`,
    dataProp: 'data-operation',
  },
  {
    display: '÷',
    className: `operation-button divide`,
    dataProp: 'data-operation',
  },
  {
    display: '=',
    className: `button equals`,
    dataProp: 'data-other',
  },
  {
    display: 'clear',
    className: `button clear`,
    dataProp: 'data-other',
  },
  {
    display: '.',
    className: `button decimal`,
    dataProp: 'data-other',
  },
  {
    display: '+/-',
    className: `button negative`,
    dataProp: 'data-other',
  },
  {
    display: '%',
    className: `button percent`,
    dataProp: 'data-other',
  },
];

export const Buttons = ({ handleClick, buttonData }: ButtonProps) => {
  return (
    <div className="buttons-container">
      {buttonsList.map((item) => (
        <button
          key={nanoid()}
          type="button"
          {...{ [item.dataProp]: item.display }}
          className={`${item.className} ${checkIfHighlighted(
            item.display.toString(),
            buttonData,
          )}`}
          onClick={handleClick}
        >
          {item.display === 'clear' ? buttonData.clearOption : item.display}
        </button>
      ))}
    </div>
  );
};
