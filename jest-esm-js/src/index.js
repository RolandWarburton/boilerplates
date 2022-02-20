import chalk from "chalk";
import fetch from "node-fetch";
import { foo as module } from "./module";
import { remark } from "remark";

export async function foo() {
  console.log(await fetch("https://wttr.in/moon").then((res) => res.text()));
  console.log(chalk.green("Hello world!"));
  console.log(remark().parse(`# Hello world!`));
  module();
  return 200;
}
