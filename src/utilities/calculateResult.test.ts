import { calculateResult } from './calculateResult';

describe('calculateResult', () => {
  it('should add two numbers correctly', () => {
    expect(calculateResult({ previousNum: '1', currentNum: '2', result: '', operation: '+' })).toEqual('3');
    expect(calculateResult({ previousNum: '1', currentNum: '', result: '2', operation: '+' })).toEqual('3');
    expect(calculateResult({ previousNum: '', currentNum: '2', result: '1', operation: '+' })).toEqual('3');
  });

  it('should subtract two numbers correctly', () => {
    expect(calculateResult({ previousNum: '1', currentNum: '2', result: '', operation: '-' })).toEqual('-1');
    expect(calculateResult({ previousNum: '1', currentNum: '', result: '2', operation: '-' })).toEqual('1');
    expect(calculateResult({ previousNum: '', currentNum: '2', result: '1', operation: '-' })).toEqual('-1');
  });

  it('should multiply two numbers correctly', () => {
    expect(calculateResult({ previousNum: '1', currentNum: '2', result: '', operation: 'x' })).toEqual('2');
    expect(calculateResult({ previousNum: '1', currentNum: '', result: '2', operation: 'x' })).toEqual('2');
    expect(calculateResult({ previousNum: '', currentNum: '2', result: '1', operation: 'x' })).toEqual('2');
  });

  it('should divide two numbers correctly', () => {
    expect(calculateResult({ previousNum: '1', currentNum: '2', result: '', operation: '÷' })).toEqual('0.5');
    expect(calculateResult({ previousNum: '1', currentNum: '', result: '2', operation: '÷' })).toEqual('2');
    expect(calculateResult({ previousNum: '', currentNum: '2', result: '1', operation: '÷' })).toEqual('0.5');
  });
});
