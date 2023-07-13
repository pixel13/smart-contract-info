import CommandFactory from '../../src/cli/CommandFactory';

const ARGUMENT = '0x12345678';
const NETWORK_ID = 123;
const argv = {
  bytecode: false,
  _: [ARGUMENT],
  network: 'test',
  networkId: NETWORK_ID,
};

const mockBytecodeReaderCommand = {};
const mockDeployedContractReaderCommand = {};

jest.mock('../../src/cli/BytecodeReaderCommand', () =>
  jest.fn().mockImplementation((bytecode) => {
    expect(bytecode).toBe(ARGUMENT);
    return mockBytecodeReaderCommand;
  })
);

jest.mock('../../src/cli/DeployedContractReaderCommand', () =>
  jest.fn().mockImplementation((address, networkId) => {
    expect(address).toBe(ARGUMENT);
    expect(networkId).toBe(NETWORK_ID);
    return mockDeployedContractReaderCommand;
  })
);

beforeEach(() => {
  jest.clearAllMocks();
});

test('should return BytecodeReaderCommand if a bytecode argument is given', () => {
  argv.bytecode = true;
  const result = CommandFactory.createCommand(argv);
  expect(result).toBe(mockBytecodeReaderCommand);
});

test('should return DeployedContractReaderCommand if bytecode argument is not given', () => {
  argv.bytecode = false;
  const result = CommandFactory.createCommand(argv);
  expect(result).toBe(mockDeployedContractReaderCommand);
});
