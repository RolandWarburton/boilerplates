#!/usr/bin/env node

const { cli } = require('../dist/cli');

async function run() {
  await cli(process.argv);

  // wait for input before closing
  console.log('press any key to continue');
  process.stdin.setRawMode(true);
  process.stdin.resume();

  process.stdin.once('data', () => {
    process.stdin.setRawMode(false);
    console.log('Closing...');
    process.exit(0);
  });
}

run();
