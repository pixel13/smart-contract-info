import opcodes from '../web3/opcodes';

class Opcode {
  static readonly HEX_CODE_LENGTH: number = 2;
  static readonly PUSH_OPCODE_REGEXP: string = 'PUSH(?<length>\\d+)';

  private _hex: string;
  private _name: string;
  private _length: number;
  private _arg: string;

  constructor(hex: string) {
    this._hex = hex.toUpperCase();
    this._name = Opcode.resolveName(this._hex);
    this._length = Opcode.HEX_CODE_LENGTH + Opcode.calculateArgLength(this._name);
    this._arg = '';
  }

  private static resolveName(hex: string) {
    return opcodes.get(hex) || `INVALID ('${hex}')`;
  }

  private static calculateArgLength(opname: string) {
    const regexp = RegExp(Opcode.PUSH_OPCODE_REGEXP);
    const matches = regexp.exec(opname);

    if (matches !== null) {
      return Number(matches.groups?.length) * Opcode.HEX_CODE_LENGTH;
    }

    return 0;
  }

  public get name() {
    return this._name;
  }

  public get length() {
    return this._length;
  }

  public get argument() {
    return this._arg;
  }

  public set argument(arg: string) {
    this._arg = arg;
  }
}

export default Opcode;
