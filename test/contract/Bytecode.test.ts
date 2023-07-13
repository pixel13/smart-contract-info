import Bytecode from '../../src/contract/Bytecode';
import OpcodeIterator from '../../src/contract/OpcodeIterator';

const CODE = '12345678';
const PREFIX = '0x';
const CODE_WITH_PREFIX = PREFIX + CODE;

const OPCODE1 = { name: 'PUSH1', length: 4, argument: '80' };
const OPCODE2 = { name: 'PUSH1', length: 4, argument: '40' };
const OPCODE3 = { name: 'MSTORE', length: 2 };
const OPCODE4 = { name: 'CALLVALUE', length: 2 };
const EXPECTED_SEQUENCE = '[0] PUSH1 0x80\r\n[2] PUSH1 0x40\r\n[4] MSTORE\r\n[5] CALLVALUE\r\n';

jest.spyOn(OpcodeIterator, 'fromBytecode').mockImplementation(
  () =>
    ({
      *[Symbol.iterator]() {
        yield OPCODE1;
        yield OPCODE2;
        yield OPCODE3;
        yield OPCODE4;
      },
    }) as unknown as OpcodeIterator
);

beforeEach(() => {
  jest.clearAllMocks();
});

test('should save the bytecode without the leading 0x', () => {
  const bytecode = new Bytecode(CODE_WITH_PREFIX);
  expect(bytecode.toString()).toBe(CODE);
});

test('should leave the bytecode unchanged if the leading 0x is not present', () => {
  const bytecode = new Bytecode(CODE);
  expect(bytecode.toString()).toBe(CODE);
});

test('should print the bytecode as a sequence of opcodes', () => {
  const bytecode = new Bytecode(CODE);
  expect(bytecode.asOpcodeSequence()).toBe(EXPECTED_SEQUENCE);
});
