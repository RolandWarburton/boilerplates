import chalk from "chalk";
import fetch from "node-fetch";
import { bar } from "./bar.js";
import { remark } from "remark";

export async function foo() {
  console.log(await fetch("https://wttr.in/moon").then((res) => res.text()));
  console.log(chalk.green("Hello world!"));
  console.log(remark().parse(`# Hello world!`));
  bar();
  return 200;
}

export default foo;
