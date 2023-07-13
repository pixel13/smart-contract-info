import Opcode from '../../src/contract/Opcode';
import OpcodeIterator from '../../src/contract/OpcodeIterator';

test('should iterate through the opcodes extracted from the given bytecode', () => {
  const result = OpcodeIterator.fromBytecode('6080604052');
  const iterator = result[Symbol.iterator]();
  expectNextValue(iterator.next(), 'PUSH1', 4, '80');
  expectNextValue(iterator.next(), 'PUSH1', 4, '40');
  expectNextValue(iterator.next(), 'MSTORE', 2, '');
  const next = iterator.next();
  expect(next.done).toBeTruthy();
  expect(next.value).toBeUndefined();
});

function expectNextValue(opcode: IteratorResult<Opcode, Opcode>, opName: string, length: number, argument: string) {
  expect(opcode.done).toBeFalsy();
  expect(opcode.value.name).toBe(opName);
  expect(opcode.value.length).toBe(length);
  expect(opcode.value.argument).toBe(argument);
}
