# Default Vite configuration

This package exposes a function that defines a default Vite configuration.
The default configuration consists of the following elements:

## Base configuration

- the `@/` alias to `./src`
- [vite-eslint-plugin](https://www.npmjs.com/package/vite-plugin-eslint/v/1.8.1) plugin

The base configuration (without vitest-based testing) can be used through the
`defineBaseConfig()` function

## Test configuration

- `./vitest.setup.js` initialization file
- test coverage using [@vitest/coverage-v8](https://npmjs.com/package/@vitest/coverage-v8/v/1.5.2)

The test configuration can be used standalone throug the `defineTestConfig()` function
