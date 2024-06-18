import { existsSync, mkdirSync, readdirSync, statSync, copyFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { build as esbuild } from 'esbuild';

function copyFolderSync(source, target) {
  if (!existsSync(target)) {
    mkdirSync(target);
  }

  const files = readdirSync(source);

  files.forEach((file) => {
    const sourcePath = join(source, file);
    const targetPath = join(target, file);

    const stats = statSync(sourcePath);

    if (stats.isFile()) {
      copyFileSync(sourcePath, targetPath);
    } else if (stats.isDirectory()) {
      copyFolderSync(sourcePath, targetPath);
    }
  });
}

function makeTemp(name) {
  if (!existsSync(`./${name}`)) {
    mkdirSync(`./${name}`);
  }
}

const buildSettings = {
  entryPoints: ['src/index.tsx', 'src/options.tsx'],
  outdir: './dist',
  platform: 'node',
  bundle: true,
  write: false,
  format: 'esm',
  jsx: 'automatic',
  loader: {
    '.js': 'jsx',
    '.ts': 'tsx'
  },
  globalName: 'React',
  define: { 'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development') }
};

async function build() {
  const result = await esbuild(buildSettings).catch((err) => {
    console.log(err);
    process.exit(1);
  });
  return result;
}

async function main() {
  makeTemp('dist');
  const result = await build();

  let content = '';
  content = result.outputFiles[0].text;
  writeFileSync('dist/index.js', content);
  content = result.outputFiles[1].text;
  writeFileSync('dist/options.js', content);

  copyFileSync('manifest.json', 'dist/manifest.json');
  copyFileSync('./static/popup.html', './dist/popup.html');
  copyFileSync('./static/options.html', './dist/options.html');
  copyFileSync('./static/styles.css', './dist/styles.css');
  copyFolderSync('./images/', './dist/images');
}
main();
