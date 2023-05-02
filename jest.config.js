module.exports = {
  roots: ['<rootDir>/src'],
  preset: 'ts-jest/presets/default-esm',
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.{ts,tsx}',
    '!<rootDir>/src/**/index.ts',
    '!<rootDir>/src/main/**/*',
    '!<rootDir>/src/presentations/components/router/**/*',
    '!**/*.d.ts'
    
  ],
  coverageDirectory: 'coverage',
  testEnvironment: 'jsdom',
  global: {
    'ts-jest': {
        useESM: true,
        babelConfig: true,
        plugins: ['babel-plugin-transform-vite-meta-env']
      }
  },
  transform: {
    '.+\\.(ts|tsx)$': 'ts-jest'
  },
  extensionsToTreatAsEsm: ['.ts'],
  moduleNameMapper: {
    '\\.scss$': 'identity-obj-proxy',
    '@/(.*)': '<rootDir>/src/$1'
  }
}
