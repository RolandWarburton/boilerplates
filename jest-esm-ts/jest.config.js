export default {
  testMatch: ["<rootDir>/src/tests/*.ts"],
  preset: "ts-jest/presets/default-esm", // or other ESM presets
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
