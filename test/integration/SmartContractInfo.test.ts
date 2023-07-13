import { ethers, InfuraProvider } from 'ethers';
import CommandFactory from '../../src/cli/CommandFactory';
import argParser from '../../src/cli/argParser';

const NODE = 'node';
const SCRIPT_NAME = 'scriptName';
const NETWORK = 'sepolia';
const ADDRESS = '0x12345678';
const BYTECODE = '608060405234801561001057600080fd5b';
const EXPECTED =
  '[00] PUSH1 0x80\r\n' +
  '[02] PUSH1 0x40\r\n' +
  '[04] MSTORE\r\n' +
  '[05] CALLVALUE\r\n' +
  '[06] DUP1\r\n' +
  '[07] ISZERO\r\n' +
  '[08] PUSH2 0x0010\r\n' +
  '[0b] JUMPI\r\n' +
  '[0c] PUSH1 0x00\r\n' +
  '[0e] DUP1\r\n' +
  '[0f] REVERT\r\n' +
  '[10] JUMPDEST\r\n';

let log: string;
let originalArgv: string[];

jest.spyOn(console, 'log').mockImplementation((message) => (log += message));
jest.spyOn(ethers, 'InfuraProvider').mockImplementation(
  () =>
    ({
      getCode: () => {
        return Promise.resolve(BYTECODE);
      },
    }) as unknown as InfuraProvider
);

beforeEach(() => {
  originalArgv = process.argv;
  log = '';
  jest.clearAllMocks();
});

test('should parse a given bytecode, printing the opcode sequence', async () => {
  process.argv = [NODE, SCRIPT_NAME, '-b', BYTECODE];
  const command = CommandFactory.createCommand(argParser());
  await command.execute();
  expect(log).toBe(EXPECTED);
});

test('should get the bytecode of a deployed contract, printing the opcode sequence', async () => {
  process.argv = [NODE, SCRIPT_NAME, '-n', NETWORK, ADDRESS];
  const command = CommandFactory.createCommand(argParser());
  await command.execute();
  expect(log).toBe(EXPECTED);
});

afterEach(() => {
  process.argv = originalArgv;
});
