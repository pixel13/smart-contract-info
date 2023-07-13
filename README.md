# Smart Contract Info

Retrieve information on a given smart contract.

Please note: at the moment the only supported provider is Infura.

## Build

Just clone the repo and create a ".env" file in the root directory, with the following content:

```
INFURA_API_KEY='<PUT YOUR INFURA API KEY HERE>'
```

Then install the required dependencies with `npm install` (or `yarn`, if you prefer).

To build the project, use this command:

```
npm run build
```

## Usage

You can run the CLI through `npm start` or using `node ./dist/index.js`.

Run the command without arguments to receive hints on the available options.

You can pass a smart contract to the CLI in two ways:

- using the `-b` option, followed by a bytecode, e.g. `npm start -- -b 0x...`
- passing the address of a deployed contract (you can use the `-n` option to select the network), e.g. `npm start -- -n goerli 0x...`

In both cases, the bytecode is read and printed out in the form of a list of opcodes.
