/* eslint-disable no-console */
import * as esbuild from 'esbuild'
import { createDistFolderIfNotExist, copyIndexHtmlToDistFolder } from './common.js'
import { jsBuildOptions, scssBuildOptions } from './build.js'
import { spawn } from 'child_process'

function startDevServer() {
  const buildjs = esbuild.context(jsBuildOptions)
  buildjs.then((c) => c.watch()) // watch and rebuild
  const buildscss = esbuild.context(scssBuildOptions)
  buildscss.then((c) => c.watch()) // watch and rebuild

  const devServer = spawn('go', ['run', './devserver/main.go'])

  devServer.stdout.on('data', (data) => {
    console.log(`[DEVSERVER]: ${data}`)
  })

  devServer.stderr.on('data', (data) => {
    console.log(`[DEVSERVER]: ${data}`)
  })

  devServer.on('close', (code) => {
    console.log(`[DEVSERVER]: dev server exited with code ${code}`)
  })
}

createDistFolderIfNotExist()
copyIndexHtmlToDistFolder()
startDevServer()
