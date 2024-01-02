import { calculateResult } from './calculateResult';

describe('calculateResult', () => {
  it('should add two numbers correctly', () => {
    expect(calculateResult({ previousNum: '1', currentNum: '2', result: '', operation: '+' })).toBe('3');
    expect(calculateResult({ previousNum: '1', currentNum: '', result: '2', operation: '+' })).toBe('3');
    expect(calculateResult({ previousNum: '', currentNum: '2', result: '1', operation: '+' })).toBe('3');
  });

  it('should subtract two numbers correctly', () => {
    expect(calculateResult({ previousNum: '1', currentNum: '2', result: '', operation: '-' })).toBe('-1');
    expect(calculateResult({ previousNum: '1', currentNum: '', result: '2', operation: '-' })).toBe('1');
    expect(calculateResult({ previousNum: '', currentNum: '2', result: '1', operation: '-' })).toBe('-1');
  });

  it('should multiply two numbers correctly', () => {
    expect(calculateResult({ previousNum: '1', currentNum: '2', result: '', operation: 'x' })).toBe('2');
    expect(calculateResult({ previousNum: '1', currentNum: '', result: '2', operation: 'x' })).toBe('2');
    expect(calculateResult({ previousNum: '', currentNum: '2', result: '1', operation: 'x' })).toBe('2');
  });

  it('should divide two numbers correctly', () => {
    expect(calculateResult({ previousNum: '1', currentNum: '2', result: '', operation: '÷' })).toBe('0.5');
    expect(calculateResult({ previousNum: '1', currentNum: '', result: '2', operation: '÷' })).toBe('2');
    expect(calculateResult({ previousNum: '', currentNum: '2', result: '1', operation: '÷' })).toBe('0.5');
  });
});
