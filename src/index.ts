import argParser from './cli/argParser';
import CommandFactory from './cli/CommandFactory';

(async () => {
  const command = CommandFactory.createCommand(argParser());
  await command.execute();
})();
