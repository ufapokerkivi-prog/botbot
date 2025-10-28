import baseConfig from './jest.config';
import type { Config } from 'jest';

const config: Config = {
  ...baseConfig,
  testMatch: ['**/__tests__/**/*.integration.test.ts', '**/__tests__/**/*.integration.test.tsx'],
};

export default config;
