import { assign, enqueueActions, setup } from 'xstate';
import type { CalcData, MainOperations, OtherOperations } from './types';
import { calculateResult } from './utilities/calculateResult';

export const machine = setup({
  types: {} as {
    context: CalcData;
    events:
      | { type: 'number'; payload: string }
      | { type: 'operation'; payload: MainOperations }
      | { type: 'other'; payload: OtherOperations };
  },
  guards: {
    isClearingInput: ({ event }) => event.type === 'other' && event.payload === 'clear',
    isCalculatingResult: ({ event, context }) => {
      return event.payload === '=' && context.previousNum && context.currentNum ? true : false;
    },
  },
  actions: {
    performOtherOperation: assign(({ event, context }) => {
      if (event.payload === '.') {
        if (context.currentNum.includes('.')) {
          return context;
        }

        return { ...context, currentNum: (context.currentNum || '0') + '.' };
      }

      if (event.payload === '+/-') {
        return {
          ...context,
          currentNum: (-Number(context.currentNum)).toString(),
        };
      }

      if (event.payload === '%') {
        return {
          ...context,
          currentNum: (Number(context.currentNum) / 100).toString(),
        };
      }

      return context;
    }),
  },
}).createMachine({
  context: {
    currentNum: '',
    previousNum: '',
    operation: undefined,
    result: '',
  },
  initial: 'initial',
  states: {
    initial: {
      on: {
        number: {
          actions: assign({
            currentNum: ({ event }) => event.payload,
          }),
          target: 'editingFirstNumber',
        },
        other: {
          actions: assign({
            currentNum: ({ event }) => (event.payload === '.' ? '0.' : ''),
          }),
          target: 'editingFirstNumber',
        },
      },
    },
    editingFirstNumber: {
      on: {
        number: {
          actions: assign({
            currentNum: ({ event, context }) => context.currentNum + event.payload,
          }),
          target: 'editingFirstNumber',
        },
        operation: {
          actions: assign(({ event, context }) => ({
            previousNum: context.currentNum || context.previousNum,
            currentNum: '',
            operation: event.payload,
          })),
          target: 'editingOperation',
        },
        other: [
          {
            target: 'initial',
            guard: {
              type: 'isClearingInput',
            },
            actions: assign(({ context }) => ({
              ...context,
              previousNum: '',
              currentNum: '',
              result: '',
            })),
          },
          {
            actions: {
              type: 'performOtherOperation',
            },
            target: 'editingFirstNumber',
          },
        ],
      },
    },
    editingOperation: {
      on: {
        number: {
          actions: assign(({ event, context }) => ({
            ...context,
            currentNum: event.payload,
          })),
          target: 'editingSecondNumber',
        },
        other: [
          {
            actions: assign(({ context }) => {
              return {
                ...context,
                operation: undefined,
              };
            }),
            target: 'editingFirstNumber',
            guard: {
              type: 'isClearingInput',
            },
          },
          {
            target: 'editingSecondNumber',
            actions: {
              type: 'performOtherOperation',
            },
          },
        ],
      },
    },
    editingSecondNumber: {
      on: {
        number: {
          actions: assign({
            currentNum: ({ event, context }) => context.currentNum + event.payload,
          }),
          target: 'editingSecondNumber',
        },
        operation: {
          actions: assign(({ event, context }) => {
            const result = calculateResult(context);
            return {
              previousNum: result || '',
              currentNum: '',
              result: '',
              operation: event.payload,
            };
          }),
          target: 'editingOperation',
        },
        other: [
          {
            target: 'editingOperation',
            guard: {
              type: 'isClearingInput',
            },
            actions: assign(({ context }) => {
              return {
                ...context,
                currentNum: '',
                result: '',
              };
            }),
          },
          {
            target: 'showingResult',
            guard: {
              type: 'isCalculatingResult',
            },
            actions: assign(({ context }) => {
              const result = calculateResult(context);
              return {
                ...context,
                result,
                previousNum: '',
                currentNum: '',
                operation: undefined,
              };
            }),
          },
          {
            target: 'editingSecondNumber',
            actions: {
              type: 'performOtherOperation',
            },
          },
        ],
      },
    },
    showingResult: {
      on: {
        number: {
          actions: assign(({ context, event }) => ({
            ...context,
            previousNum: '',
            currentNum: event.payload,
            result: '',
          })),
          target: 'editingFirstNumber',
        },
        operation: {
          actions: assign(({ event, context }) => ({
            previousNum: context.result,
            currentNum: '',
            result: '',
            operation: event.payload,
          })),
          target: 'editingOperation',
        },
        other: [
          {
            target: 'initial',
            guard: {
              type: 'isClearingInput',
            },
            actions: assign(() => ({
              previousNum: '',
              currentNum: '',
              operation: undefined,
              result: '',
            })),
          },
          {
            target: 'editingFirstNumber',
            actions: enqueueActions(({ enqueue, context, event }) => {
              enqueue.assign({ previousNum: '', currentNum: context.result, result: '' });
              enqueue.raise({ type: 'other', payload: event.payload });
            }),
          },
        ],
      },
    },
  },
});
