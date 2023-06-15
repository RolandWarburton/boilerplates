async function main(config: any): Promise<string> {
  const { name } = config;
  console.log(`Hello, ${name}!`);
  return name;
}

export { main };
