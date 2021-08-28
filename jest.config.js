require('dotenv').config();
const ENV = process.env.NODE_ENV || 'dev';

/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleDirectories: ["node_modules", "src"],
  moduleNameMapper: {
    "@/(.*)": "<rootDir>/src/$1",
  },
  setupFilesAfterEnv: ['<rootDir>/__tests__/setup.ts'],
  verbose: true,
  collectCoverage: ENV === 'dev' ? false : true,
  coverageReporters: ["text", "json-summary", "lcov"]
};
