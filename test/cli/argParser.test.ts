import argParser from '../../src/cli/argParser';

const ARGUMENT = '0x12345';
const NODE = 'node';
const SCRIPT_NAME = 'scriptName';
const NETWORK = 'goerli';
const NETWORK_ID = 5;

let originalArgv: string[];

beforeEach(() => {
  originalArgv = process.argv;
});

test('should parse the -b option with its argument', () => {
  process.argv = [NODE, SCRIPT_NAME, '-b', ARGUMENT];
  const result = argParser();
  expect(result.bytecode).toBeTruthy();
  expect(result._[0]).toBe(ARGUMENT);
});

test('should parse the --bytecode option with its argument', () => {
  process.argv = [NODE, SCRIPT_NAME, '--bytecode', ARGUMENT];
  const result = argParser();
  expect(result.bytecode).toBeTruthy();
  expect(result._[0]).toBe(ARGUMENT);
});

test('should parse the -n option with its argument', () => {
  process.argv = [NODE, SCRIPT_NAME, '-n', NETWORK, ARGUMENT];
  const result = argParser();
  expect(result.bytecode).toBeUndefined();
  expect(result.network).toBe(NETWORK);
  expect(result.networkId).toBe(NETWORK_ID);
  expect(result._[0]).toBe(ARGUMENT);
});

test('should parse the --network option with its argument', () => {
  process.argv = [NODE, SCRIPT_NAME, '--network', NETWORK, ARGUMENT];
  const result = argParser();
  expect(result.bytecode).toBeUndefined();
  expect(result.network).toBe(NETWORK);
  expect(result.networkId).toBe(NETWORK_ID);
  expect(result._[0]).toBe(ARGUMENT);
});

test('should parse an argument without options as an address on mainnet', () => {
  process.argv = [NODE, SCRIPT_NAME, ARGUMENT];
  const result = argParser();
  expect(result.bytecode).toBeUndefined();
  expect(result.network).toBe('mainnet');
  expect(result.networkId).toBe(1);
  expect(result._[0]).toBe(ARGUMENT);
});

afterEach(() => {
  process.argv = originalArgv;
});
