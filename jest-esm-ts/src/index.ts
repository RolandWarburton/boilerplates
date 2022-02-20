import chalk from "chalk";
import fetch from "node-fetch";
import { bar } from "./bar.js";
import { remark } from "remark";

export async function foo() {
  const res = await fetch("https://wttr.in/moon");
  console.log(await res.text());
  console.log(chalk.green("Hello world!"));
  console.log(remark().parse(`# Hello world!`));
  bar("roland");
  return res.status;
}

export default foo;
