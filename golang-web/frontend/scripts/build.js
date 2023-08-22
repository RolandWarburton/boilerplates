/* eslint-disable no-console */
//
// watch and rebuild changes by using below
// node build.js watch
//
const fs = require('fs');
const sassPlugin = require('esbuild-plugin-sass');
const { build } = require('esbuild');
const path = require('path');
const { promisify } = require('util');
const { context } = require('esbuild');

const mkdir = promisify(fs.mkdir);
const readdir = promisify(fs.readdir);
const copyFile = promisify(fs.copyFile);
const lstat = promisify(fs.lstat);

function makeTemp(name) {
  if (!fs.existsSync(`./${name}`)) {
    fs.mkdirSync(`./${name}`);
  }
}

async function copyDirContents(sourcePath, destPath) {
  try {
    if (!fs.existsSync(destPath)) {
      await mkdir(destPath);
    }

    const files = await readdir(sourcePath);

    for (const file of files) {
      const sourceFile = path.join(sourcePath, file);
      const destFile = path.join(destPath, file);

      const stats = await lstat(sourceFile);

      if (stats.isDirectory()) {
        await copyDirContents(sourceFile, destFile);
      } else {
        await copyFile(sourceFile, destFile);
      }
    }
  } catch (err) {
    console.error('Error copying directory contents:', err);
  }
}

async function main() {
  makeTemp('build');

  // copy the html root over
  await copyFile('./public/index.html', './build/index.html');

  // copy the other directory contents over
  // await copyDirContents('public', 'build');

  const esbuildOptions = {
    entryPoints: ['./src/index.tsx'],
    bundle: true,
    // jsx: 'preserve',
    write: true,
    splitting: true,
    outdir: 'build',
    format: 'esm',
    plugins: [sassPlugin()],
    loader: {
      '.png': 'file',
      '.jpg': 'file',
      '.svg': 'dataurl',
      '.ts': 'tsx'
    }
  };

  if (process.argv[2] === 'watch') {
    const result = await context({
      ...esbuildOptions
    }).catch((err) => {
      console.error(err);
      process.exit(1);
    });
    result.serve({
      port: 8000,
      servedir: 'build',
      host: '0.0.0.0',
      keyfile: '../nginx/keys/privkey.pem',
      certfile: '../nginx/keys/fullchain.pem'
    });
    await result.watch();
    console.log('watching...');

    let timeout;
    fs.watch('build', (eventType) => {
      if (eventType === 'change') {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
          console.log('Rebuilding...');
        }, 2000);
      }
    });
  } else {
    const result = await build({
      ...esbuildOptions
    }).catch((err) => {
      console.error(err);
      process.exit(1);
    });
    console.log(result);
  }
}

main();
