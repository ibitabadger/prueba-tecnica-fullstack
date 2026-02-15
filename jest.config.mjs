import nextJest from 'next/jest.js'

const createJestConfig = nextJest({
  dir: './',
})

const config = {
  testEnvironment: 'jest-environment-jsdom',

  transformIgnorePatterns: [
    '/node_modules/(?!(better-auth|@better-auth)/)',
  ],
}

export default createJestConfig(config)