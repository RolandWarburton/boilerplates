import chalk from "chalk";

export function bar(name: string) {
  console.log(chalk.green(`Hello world! ${name}`));
  return 200;
}
