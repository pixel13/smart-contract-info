import Command from './Command';
import BytecodeReaderCommand from './BytecodeReaderCommand';
import DeployedContractReaderCommand from './DeployedContractReaderCommand';
import { Arguments } from './argParser';

class CommandFactory {
  public static createCommand(argv: Arguments): Command {
    if (argv.bytecode) {
      return new BytecodeReaderCommand(argv._[0] as string);
    }

    return new DeployedContractReaderCommand(argv._[0] as string, argv.networkId);
  }
}

export default CommandFactory;
