/* eslint-env node */
import { mergeConfig } from 'vite'

// @ts-ignore because this plugin doesn't export type information
import dts from 'vite-plugin-dts'
import { defineDefaultConfig } from '@padcom/vite-config-default'

/**
 * @param {import('@padcom/vite-config-default').PackageJSON} pkg
 * @param {import('vite').UserConfig} overrides
 */
export function defineBaseLibConfig(pkg, overrides = {}) {
  const config = {
    plugins: [
      dts({
        insertTypesEntry: true,
        rollupTypes: true,
        logLevel: 'error',
      }),
    ],
    build: {
      lib: {
        entry: './src/index.ts',
        name: pkg.name.split('/').at(-1),
      },
      sourcemap: true,
    },
  }

  return mergeConfig(config, overrides)
}

/**
 * @param {import('@padcom/vite-config-default').PackageJSON} pkg
 * @param {import('vite').UserConfig} overrides
 */
export function defineExternalsConfig(pkg, overrides = {}) {
  /**
   * @param {string} name
   */
  function makeModuleConst(name) {
    return name
      .replaceAll('@', '')
      .replaceAll('/', '')
      .replaceAll('-', '')
  }

  const external = [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {}),
    ...Object.keys(pkg.optionalDependencies || {}),
  ].filter(name => !name.startsWith('@types/'))

  const globals = external.reduce((acc, entry) => ({ ...acc, [entry]: makeModuleConst(entry) }), {})

  const config = {
    build: {
      rollupOptions: {
        external,
        output: {
          globals,
        },
      },
    },
  }

  return mergeConfig(config, overrides)
}

/**
 * @param {import('@padcom/vite-config-default').PackageJSON} pkg
 * @param {import('vite').UserConfig} overrides
 */
export function defineLibConfig(pkg, overrides = {}) {
  return defineDefaultConfig(pkg, defineBaseLibConfig(pkg, defineExternalsConfig(pkg, overrides)))
}
