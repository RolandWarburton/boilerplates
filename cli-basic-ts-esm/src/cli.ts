import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { main } from './index.js';

export async function cli(processArgs: any) {
  const args = yargs(hideBin(processArgs)).command('--name <string>', "The user's name").parse();

  let config = {};

  await main(config);
}
