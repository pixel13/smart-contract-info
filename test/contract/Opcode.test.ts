import Opcode from '../../src/contract/Opcode';

test('should set name and length from the hex code', () => {
  const result = new Opcode('50');
  expect(result.name).toBe('POP');
  expect(result.length).toBe(2);
  expect(result.argument).toBe('');
});

test('should contain the argument if set', () => {
  const result = new Opcode('61');
  expect(result.name).toBe('PUSH2');
  expect(result.length).toBe(6);
  expect(result.argument).toBe('');
  result.argument = '1234';
  expect(result.argument).toBe('1234');
});
