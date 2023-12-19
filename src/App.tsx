import type { MouseEvent } from 'react';
import { Buttons } from './components/Buttons/Buttons';
import { Display } from './components/Display';
import type { ButtonData, MainOperations, OtherOperations } from './types';
import { useMachine } from '@xstate/react';
import { machine } from './machine';

export const App = () => {
  const [snapshot, send] = useMachine(machine);

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    const numFromClick = e.currentTarget.dataset.number;
    const opFromClick = e.currentTarget.dataset.operation as MainOperations;
    const otherFromClick = e.currentTarget.dataset.other as OtherOperations;

    if (numFromClick) {
      send({ type: 'number', payload: numFromClick });
      return;
    }

    if (opFromClick) {
      send({ type: 'operation', payload: opFromClick });
      return;
    }

    if (otherFromClick) {
      send({ type: 'other', payload: otherFromClick });
      return;
    }
  };

  const buttonData: ButtonData = {
    operation: snapshot.context.operation,
    clearOption:
      snapshot.context.currentNum ||
      snapshot.context.previousNum ||
      snapshot.context.result
        ? 'C'
        : 'AC',
  };

  return (
    <div className="calculator-container">
      <Display currentCalc={snapshot.context} />
      <Buttons handleClick={handleClick} buttonData={buttonData} />
    </div>
  );
};
