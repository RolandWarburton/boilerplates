import { existsSync, mkdirSync, copyFileSync } from 'fs';
import { join, dirname } from 'path';

const __dirname = dirname(new URL(import.meta.url).pathname);

function createDistFolderIfNotExist() {
  const distFolderPath = join(__dirname, '../dist');
  const jsFolderPath = join(__dirname, '../dist/js');
  // Check if the dist folder exists, and create it if it doesn't
  if (!existsSync(distFolderPath)) {
    mkdirSync(distFolderPath);
  }
  if (!existsSync(jsFolderPath)) {
    mkdirSync(jsFolderPath);
  }
}

function copyIndexHtmlToDistFolder() {
  const distFolderPath = join(__dirname, '../dist');
  const indexHtmlPath = join(__dirname, '../', 'src', 'index.html');
  // Copy index.html to the dist folder
  copyFileSync(indexHtmlPath, join(distFolderPath, 'index.html'));
}

export { createDistFolderIfNotExist, copyIndexHtmlToDistFolder }
