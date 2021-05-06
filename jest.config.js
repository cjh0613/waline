const { resolve } = require('path');

module.exports = {
  rootDir: resolve(__dirname),
  preset: 'ts-jest',
  collectCoverage: true,
  moduleFileExtensions: ['js', 'json', 'jsx', 'ts', 'd.ts', 'tsx', 'node'],
  transform: {
    '\\.js$': 'babel-jest',
  },
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.json',
    },
  },
  testMatch: ['<rootDir>/packages/**/__tests__/**/*.spec.ts'],
};
