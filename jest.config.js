const config = require('@angular-builders/jest/dist/jest-config/default-config').default;

module.exports = {
  ...config,
  rootDir: './',
  testPathIgnorePatterns: ['e2e'],

  clearMocks: true,

  collectCoverage: true,
  setupFilesAfterEnv: ['./src/test-setup.ts'],
};
