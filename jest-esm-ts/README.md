# Jest ESM Typescript Boilerplate

Jest and ESM is not totally supported yet, but its sorta working.

## Instructions

### Switching to ESM

Check out the reading list for more.

set the `"type": "module"` in the package.json.

Set the `"main": "dist/index.js" and "types" fields to point to the emitted code.

Also optionally add some exports for ESM.

```json
// package.json
"name": "@rolandwarburton/jest-ts-boilerplate",
"main": "dist/index.js",
"types": "dist/index.d.ts",
"type": "module",
"exports": {
  ".": {
    "import": "./dist/index.js"
  }
}
```

### Configuring typescript

Use these settings.

```json
{
  "compilerOptions": {
    "target": "ES2021", // DO NOT CHANGE!
    "module": "ES2022", // DO NOT CHANGE!
    "moduleResolution": "Node",
    "allowJs": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "sourceMap": true,

    "outDir": "./dist",
    "types": ["node", "jest"],
    "lib": ["ES6", "DOM"]
  },
  "include": ["src/**/*.ts"],
  "exclude": ["node_modules", "tests", ".vscode"]
}
```

Optionally in the spirit of a reduced boilerplate you can turn `esModuleInterop` off, but i would leave it on for better compatability with CJS.

Other notable settings are "target" and "module" which are strictly set to ES2021 (or whatever is most recent at the time) so that we can use EJS.

### Configuring jest

Read to get jest setup. First follow the instructions [here](https://jestjs.io/docs/ecmascript-modules).

Then read [these docs](https://kulshekhar.github.io/ts-jest/docs/guides/esm-support/) from ts-jest for details to work with typescript.

Create a `jest.config.js` file. It should also be ESM format because we are adopting ESM for the entire project.

```js
// jest.config.js
export default {
  testMatch: ["<rootDir>/src/tests/*.ts"],
  extensionsToTreatAsEsm: [".ts"],
  globals: {
    "ts-jest": {
      useESM: true
    }
  },
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1"
  }
};
```

Do not touch anything here, other than the `testMatch` setting to find the tests in your project.

### Scripts

Run jest with "--experimental-vm-modules" flag. This cannot be set through `NODE_OPTS` (does not work for me), it has to be run like `node --experimental-vm-modules ./node_modules/.bin/jest`.

To build the project use `tsc -p tsconfig.json`.

```json
// package.json
  "scripts": {
    "build": "tsc -p tsconfig.json",
    "test": "node --experimental-vm-modules ./node_modules/.bin/jest"
  },
```

## Reading List

[node and esm exports](https://formidable.com/blog/2021/node-esm-and-exports/).

[esm modules at war: why commonjs and es modules can't get along](https://redfin.engineering/node-modules-at-war-why-commonjs-and-es-modules-cant-get-along-9617135eeca1).

[support nodejs esm](https://www.the-guild.dev/blog/support-nodejs-esm).
