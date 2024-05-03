# Vite configuration for libraries

This package exposes a function that defines a a Vite configuration for libraries.
The default configuration consists of the following elements:

## Base library configuration

- [vite-dts-plugin](https://www.npmjs.com/package/vite-plugin-dts/v/0.6.0) plugin

The base library configuration (without vitest-based testing) can be used through the
`defineBaseLibConfig()` function

## Externals configuration

Packages specified in `package.json' in the following sections are automatically added to externals:

- `dependencies`
- `peerDependencies`
- `optionslDependencies`

The externals configuration can be used standalone throug the `defineExternalsConfig()`
function
