const fs = require('fs');
const sassPlugin = require('esbuild-plugin-sass');
const { build } = require('esbuild');
const path = require('path');
const { promisify } = require('util');

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
    // eslint-disable-next-line
    console.error('Error copying directory contents:', err);
  }
}

async function main() {
  let entryFileName;
  makeTemp('build');
  const result = await build({
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
    // onEnd: (result) => {
    //   if (result?.outputFiles?.[0]?.path) {
    //     const outputPath = result.outputFiles[0].path;
    //     entryFileName = path.basename(outputPath);
    //   }
    // }
  }).catch((err) => {
    console.log(err);
    process.exit(1);
  });
  await copyFile('./public/index.html', './build/index.html');
  // await copyDirContents('public', 'build');
  // eslint-disable-next-line no-console
  console.log(result);
}

main();
