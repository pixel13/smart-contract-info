import Command from './Command';
import Bytecode from '../contract/Bytecode';

class BytecodeReaderCommand implements Command {
  private bytecode: string;

  constructor(bytecode: string) {
    this.bytecode = bytecode;
  }

  async execute() {
    const bytecode = new Bytecode(this.bytecode);
    console.log(bytecode.asOpcodeSequence());
  }
}

export default BytecodeReaderCommand;
