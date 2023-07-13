import createProvider from '../../src/web3/createProvider';

const API_KEY = 'MY_API_KEY';
const NETWORK_ID = 123;
const PROVIDER = {};

jest.mock('ethers', () => ({
  ethers: {
    InfuraProvider: jest.fn().mockImplementation((networkId: number, secret: string) => {
      expect(networkId).toBe(NETWORK_ID);
      expect(secret).toBe(API_KEY);
      return PROVIDER;
    }),
  },
}));

test('should create an Infura provider', () => {
  process.env.INFURA_API_KEY = API_KEY;
  const result = createProvider(NETWORK_ID);
  expect(result).toBe(PROVIDER);
});
