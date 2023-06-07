import * as esbuild from 'esbuild';
import { createDistFolderIfNotExist, copyIndexHtmlToDistFolder } from './common.js';
import { sassPlugin } from 'esbuild-sass-plugin';

const jsBuildOptions = {
  entryPoints: ['src/index.tsx'],
  bundle: true,
  sourcemap: true,
  treeShaking: true,
  minify: false,
  logLevel: 'info',
  outbase: 'src',
  outdir: 'dist/js',
  target: 'es6',
  format: 'esm',
  loader: {
    '.scss': 'empty'
  }
};

const scssBuildOptions = {
  entryPoints: ['src/css/app.scss'],
  bundle: true,
  sourcemap: true,
  treeShaking: true,
  minify: false,
  logLevel: 'info',
  outbase: 'src/css',
  outdir: 'dist/css',
  plugins: [
    sassPlugin({
      filter: /\.scss$/,
      basedir: 'src/css',
      cssImports: true
    })
  ]
};

function startBuildProcess() {
  esbuild.build(jsBuildOptions);
  esbuild.build(scssBuildOptions);
}

createDistFolderIfNotExist();
copyIndexHtmlToDistFolder();
startBuildProcess();

export { jsBuildOptions, scssBuildOptions };
