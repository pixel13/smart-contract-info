import Opcode from './Opcode';
import OpcodeIterator from './OpcodeIterator';

class Bytecode {
  private source: string;

  public constructor(source: string) {
    this.source = this.normalize(source);
  }

  public asOpcodeSequence(): string {
    let result = '';
    for (const [key, value] of this.asOpcodes()) {
      result += `[${key}] ${value}\r\n`;
    }
    return result;
  }

  private asOpcodes(): Map<string, string> {
    const decoded: Map<string, string> = new Map();

    const indexHexLength = this.indexHexLength();
    const iterator = OpcodeIterator.fromBytecode(this.source);

    let index = 0;
    for (const opCode of iterator) {
      const indexHex = this.toHexString(index, indexHexLength);
      decoded.set(indexHex, `${opCode.name}${opCode.argument ? ' 0x' + opCode.argument : ''}`);

      index += opCode.length / 2;
    }

    return decoded;
  }

  public toString(): string {
    return this.source;
  }

  private indexHexLength(): number {
    const totalBytes = Math.ceil(this.source.length / Opcode.HEX_CODE_LENGTH);
    return this.toHexString(totalBytes, 0).length;
  }

  private toHexString(num: number, length: number): string {
    return num.toString(16).toLowerCase().padStart(length, '0');
  }

  private normalize(source: string): string {
    return source.substring(0, Opcode.HEX_CODE_LENGTH) === '0x' ? source.substring(2) : source;
  }
}

export default Bytecode;
