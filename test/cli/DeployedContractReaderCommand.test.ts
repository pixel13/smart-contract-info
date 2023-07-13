import DeployedContractReaderCommand from '../../src/cli/DeployedContractReaderCommand';

const CONTRACT_ADDRESS = '0x12345678';
const NETWORK_ID = 123;
const OPCODE_SEQUENCE = 'opcode sequence';

let log: string;
jest.mock('../../src/web3/createProvider', () => jest.fn().mockImplementation(() => ({})));

const mockBytecode = {
  asOpcodeSequence: () => OPCODE_SEQUENCE,
};

jest.mock('../../src/contract/SmartContract', () =>
  jest.fn().mockImplementation(() => ({
    getBytecode: async () => {
      return Promise.resolve(mockBytecode);
    },
  }))
);

jest.spyOn(console, 'log').mockImplementation((message) => (log += message));

beforeEach(() => {
  log = '';
  jest.clearAllMocks();
});

test('should read a deployed contract bytecode and write it as an opcode sequence', async () => {
  const command = new DeployedContractReaderCommand(CONTRACT_ADDRESS, NETWORK_ID);
  await command.execute();
  expect(log).toBe(OPCODE_SEQUENCE);
});
