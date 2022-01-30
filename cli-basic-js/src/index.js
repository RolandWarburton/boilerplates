import fs from "fs";
import chalk from "chalk";
import { URL } from "url";

const __filename = new URL("", import.meta.url).pathname;
const __dirname = new URL(".", import.meta.url).pathname;

export async function main(config) {
  console.log(chalk.bgGreen("now we are cooking!"));
  console.log(config);
}
