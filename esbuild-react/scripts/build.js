import * as esbuild from 'esbuild'
import { createDistFolderIfNotExist, copyIndexHtmlToDistFolder } from './common.js'

const buildOptions = {
  entryPoints: ['src/index.tsx'],
  bundle: true,
  sourcemap: true,
  logLevel: 'info',
  outfile: 'dist/js/index.js',
  loader: {
    '.html': 'text'
  }
}

function startBuildProcess() {
  esbuild.build(buildOptions)
}

createDistFolderIfNotExist()
copyIndexHtmlToDistFolder()
startBuildProcess()

export { buildOptions }
