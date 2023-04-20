import * as esbuild from 'esbuild'
import { createDistFolderIfNotExist, copyIndexHtmlToDistFolder } from './common.js'
import { buildOptions } from './build.js'

const serveOptions = {
  port: 8081,
  host: 'localhost',
  servedir: 'dist'
}

function startDevServer() {
  const build = esbuild.context(buildOptions)
  build.then((c) => c.watch()) // watch and rebuild
  build.then((c) => c.serve(serveOptions)) // serve it locally
}

createDistFolderIfNotExist()
copyIndexHtmlToDistFolder()
startDevServer()
