import yargs from 'yargs/yargs';
import { hideBin } from 'yargs/helpers';
import networks from '../web3/networks';

interface Arguments {
  network: string;
  bytecode: boolean | undefined;
  networkId: number;
  _: (string | number)[];
}

const argParser = () =>
  yargs(hideBin(process.argv))
    .parserConfiguration({ 'parse-positional-numbers': false })
    .usage('Usage: $0 [-n|--network <network>] <contract-address>')
    .usage('Usage: $0 -b|--bytecode <bytecode>')
    .demandCommand(1, 'You must specify at least the address of the contract or the bytecode with -b option')
    .option('network', {
      alias: 'n',
      choices: ['mainnet', 'sepolia', 'goerli', 'polygon', 'mumbai'],
      default: 'mainnet',
      description: 'The network to use',
      requiresArg: true,
      type: 'string',
    })
    .option('bytecode', {
      alias: 'b',
      description: 'Use this option to pass directly the bytecode of a contract instead of an address',
      type: 'boolean',
    })
    .option('networkId', {
      type: 'number',
      default: networks.get('mainnet'),
      hidden: true,
    })
    .middleware((argv) => {
      argv.networkId = networks.get(argv.network);
    })
    .version(false)
    .parseSync();

export { Arguments };
export default argParser as () => Arguments;
