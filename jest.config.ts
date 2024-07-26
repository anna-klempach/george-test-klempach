const config = {
  automock: false,
  moduleDirectories: ['node_modules', __dirname],
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'jsdom',
  clearMocks: true,
  coverageDirectory: 'coverage',
  collectCoverageFrom: ['<rootDir>/src/**'],
  coveragePathIgnorePatterns: [],
  coverageProvider: 'v8',
};
export default config;
