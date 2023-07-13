import { Provider } from 'ethers';
import SmartContract from '../../src/contract/SmartContract';

const ADDRESS = '0x12345678';
const CODE = '0xABCDEF';
const EMPTY_CODE = '0x';
const BYTECODE = {};

jest.mock('../../src/contract/Bytecode', () =>
  jest.fn().mockImplementation((code: string) => {
    expect(code).toBe(CODE);
    return BYTECODE;
  })
);

beforeEach(() => {
  jest.clearAllMocks();
});

test('should return the bytecode of a valid contract', async () => {
  const MOCK_PROVIDER = {
    getCode: (address: string) => {
      expect(address).toBe(ADDRESS);
      return CODE;
    },
  } as unknown as Provider;

  const result = new SmartContract(MOCK_PROVIDER, ADDRESS);
  const bytecode = await result.getBytecode();
  expect(bytecode).toBe(BYTECODE);
});

test('should throw an error if the returned value is not a contract bytecode', async () => {
  const MOCK_PROVIDER = {
    getCode: (address: string) => {
      expect(address).toBe(ADDRESS);
      return EMPTY_CODE;
    },
  } as unknown as Provider;

  const result = new SmartContract(MOCK_PROVIDER, ADDRESS);
  await expect(result.getBytecode()).rejects.toThrow();
});
