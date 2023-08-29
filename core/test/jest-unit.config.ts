import type { Config } from 'jest';
import { defaults } from 'jest-config';

const config: Config = {
  verbose: true,
  moduleFileExtensions: [...defaults.moduleFileExtensions, 'js', 'json', 'ts'],
  rootDir: '../src/',
  moduleDirectories: ['<rootDir>/../', 'node_modules'],
  moduleNameMapper: {
    '@app/(.*)': '<rootDir>/../src/$1',
  },
  testEnvironment: 'node',
  testRegex: '.service.spec.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  reporters: ['default', 'jest-junit'],
  collectCoverage: false,
  coverageReporters: ['cobertura'],
};

export default config;
