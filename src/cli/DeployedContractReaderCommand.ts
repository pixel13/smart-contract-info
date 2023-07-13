import SmartContract from '../contract/SmartContract';
import createProvider from '../web3/createProvider';
import Command from './Command';
class DeployedContractReaderCommand implements Command {
  private contractAddress: string;
  private networkId: number;

  constructor(address: string, networkId: number) {
    this.contractAddress = address;
    this.networkId = networkId;
  }

  async execute() {
    const provider = createProvider(this.networkId);
    const smartContract = new SmartContract(provider, this.contractAddress);
    const bytecode = await smartContract.getBytecode();
    console.log(bytecode.asOpcodeSequence());
  }
}

export default DeployedContractReaderCommand;
