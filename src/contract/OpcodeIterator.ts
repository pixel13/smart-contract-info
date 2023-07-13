import Opcode from './Opcode';

class OpcodeIterator implements Iterable<Opcode> {
  private bytecode: string;

  private constructor(bytecode: string) {
    this.bytecode = bytecode;
  }

  public static fromBytecode(bytecode: string): OpcodeIterator {
    return new OpcodeIterator(bytecode);
  }

  [Symbol.iterator](): Iterator<Opcode> {
    let index = 0;

    return {
      next: () => {
        if (index >= this.bytecode.length) {
          return {
            value: undefined,
            done: true,
          };
        }

        const hexCode = this.bytecode.substring(index, index + Opcode.HEX_CODE_LENGTH);

        const opCode = new Opcode(hexCode);
        opCode.argument = this.bytecode.substring(index + Opcode.HEX_CODE_LENGTH, index + opCode.length);

        index += opCode.length;

        return {
          value: opCode,
          done: false,
        };
      },
    };
  }
}

export default OpcodeIterator;
