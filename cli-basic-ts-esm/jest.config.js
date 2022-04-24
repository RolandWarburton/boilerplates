const esmSupport = {
  // use this jest provided preset
  preset: 'ts-jest/presets/js-with-ts-esm',
  // set the test environment to node because thats where we are testing
  testEnvironment: 'node',
  // treat .ts files as ESM
  extensionsToTreatAsEsm: ['.ts'],
  // ts-jest needs this incantation to work with esm
  globals: {
    'ts-jest': {
      useESM: true
    }
  },
  // jest wants imports to look like
  // `import thing from './thing'`\
  // but typescript wants `import thing from './thing.js` (js extension)
  // so this renames the import when jest runs
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1'
  }
};

const config = {
  moduleFileExtensions: ['ts', 'js'],
  testMatch: ['<rootDir>/src/**/tests/**/*.spec.ts'],
  testEnvironment: 'node',
  transform: {
    '^.+\\.ts?$': 'ts-jest'
  },
  transformIgnorePatterns: ['<rootDir>/node_modules/']
};

export default {
  ...esmSupport,
  ...config
};
