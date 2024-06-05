const fs = require('fs');
const path = require('path');
const { build } = require('esbuild');

function copyFolderSync(source, target) {
  if (!fs.existsSync(target)) {
    fs.mkdirSync(target);
  }

  const files = fs.readdirSync(source);

  files.forEach((file) => {
    const sourcePath = path.join(source, file);
    const targetPath = path.join(target, file);

    const stats = fs.statSync(sourcePath);

    if (stats.isFile()) {
      fs.copyFileSync(sourcePath, targetPath);
    } else if (stats.isDirectory()) {
      copyFolderSync(sourcePath, targetPath);
    }
  });
}

function makeTemp(name) {
  if (!fs.existsSync(`./${name}`)) {
    fs.mkdirSync(`./${name}`);
  }
}

async function main() {
  makeTemp('dist');

  const result = await build({
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
  }).catch((err) => {
    console.log(err);
    process.exit(1);
  });

  let content = ""
  content = result.outputFiles[0].text;
  fs.writeFileSync('dist/index.js', content);
  content = result.outputFiles[1].text;
  fs.writeFileSync('dist/options.js', content);

  fs.copyFileSync('manifest.json', 'dist/manifest.json');
  fs.copyFileSync('./static/popup.html', './dist/popup.html');
  fs.copyFileSync('./static/options.html', './dist/options.html');
  copyFolderSync('./images/', './dist/images');
}
main();
