# CLI Basic TS ESM Version

This version uses the currently nightly build of TypeScript to support NodeJS ECMAScript Module Resolution (ESM) announced in [4.5 beta](https://devblogs.microsoft.com/typescript/announcing-typescript-4-5-beta/).

Slightly more useful compared to cli-basic-js.

## Changes Made

Adds type module to package.json and bump typescript to the nightly build.

```json
{
  "type": "module",
  "devDependencies": {
    "typescript": "^4.7.0-dev.20220422"
  },
}
```

Changes bin/index.js to use ESM.

```js
// bin/index.js

import { cli } from '../dist/cli.js';
cli(process.argv);
```

Uses the .js extension when importing files in src/cli.ts.

```js
// src/cli.ts

import { main } from "./index";
```

Ensure the following values are set in tsconfig.json.

```json
{
  "compilerOptions": {
    /* Language and Environment */
    "target": "ES2022",

    /* Modules */
    "module": "NodeNext",
    "moduleResolution": "NodeNext",

    /* Interop Constraints */
    "allowSyntheticDefaultImports": true,
    "esModuleInterop": true,
}
```

## Intsalling

```none
npm i && \
npm link
```
