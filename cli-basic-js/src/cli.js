import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { main } from "./index.js";

export async function cli(processArgs) {
  const args = yargs(hideBin(processArgs)).command("--name <string>", "The user's name").parse();

  let config = {};

  if (args.name) {
    config.name = args.name;
  }

  await main(config);
}
