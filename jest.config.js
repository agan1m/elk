module.exports = {
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  setupFiles: ['<rootDir>/src/setupTests.ts'],
  moduleNameMapper: {
    '^react-dom/server$': 'preact-test-utils',
    '^react-addons-test-utils$': 'preact-test-utils',
    '^react$': 'preact-compat-enzyme',
    '^react-dom$': 'preact-compat-enzyme',
  },
};
