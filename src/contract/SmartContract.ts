import { BigNumberish, Provider } from 'ethers';
import Bytecode from './Bytecode';

export default class SmartContract {
  private provider: Provider;
  private address: string;

  public constructor(provider: Provider, address: string) {
    this.provider = provider;
    this.address = address;
  }

  public async getBytecode(): Promise<Bytecode> {
    const code = await this.provider.getCode(this.address);

    if (code === '0x') {
      throw new Error('Invalid address: this is not a smart contract!');
    }

    return new Bytecode(code);
  }

  public async getStorage(position: BigNumberish): Promise<string> {
    return this.provider.getStorage(this.address, position);
  }
}
