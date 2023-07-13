import BytecodeReaderCommand from '../../src/cli/BytecodeReaderCommand';

const BYTECODE = '0x12345678';
const OPCODE_SEQUENCE = 'opcode sequence';

let log: string;

jest.mock('../../src/contract/Bytecode', () =>
  jest.fn().mockImplementation(() => ({
    asOpcodeSequence: () => OPCODE_SEQUENCE,
  }))
);

jest.spyOn(console, 'log').mockImplementation((message) => (log += message));

beforeEach(() => {
  log = '';
  jest.clearAllMocks();
});

test('should write a bytecode string as an opcode sequence', async () => {
  const command = new BytecodeReaderCommand(BYTECODE);
  await command.execute();
  expect(log).toBe(OPCODE_SEQUENCE);
});
