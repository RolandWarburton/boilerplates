// module.exports = {
//   preset: "ts-jest",
//   testEnvironment: "node",
//   transform: {
//     "^.+\\.(ts|tsx)?$": "ts-jest",
//     "^.+\\.(js|jsx)$": "babel-jest"
//   }
// };

export default {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["<rootDir>/src/tests/*.ts"],
  transform: {},
  // transformIgnorePatterns: [],
  // transform: {
  //   "^.+\\.(ts|tsx)?$": "ts-jest",
  //   "^.+\\.(js|jsx)$": "babel-jest"
  // },
  // testing
  globals: {
    extensionsToTreatAsEsm: [".ts", ".js"],
    "ts-jest": {
      tsconfig: "tsconfig.json",
      useESM: true
    }
  }
};
