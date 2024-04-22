module.exports = {
  clearMocks: true,
  coverageDirectory: "coverage",
  testEnvironment: "node",
  setupFiles: ["<rootDir>/src/tests/jest.setup.js"],
  testPathIgnorePatterns: [
    "/node_modules/",
  ],
  verbose: true,
};
