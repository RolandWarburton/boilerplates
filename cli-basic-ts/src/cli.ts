import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { main } from './index';

interface ArgsOptions {
  name?: string;
}

export async function cli(processArgs: any) {
  const argv = await yargs(hideBin(processArgs)).option('name', {
    alias: 'n',
    description: "The user's name",
    type: 'string'
  }).argv;

  let config: ArgsOptions = {
    name: argv.name || 'hello'
  };

  await main(config);
}
