/* eslint-env node */
import { mergeConfig } from 'vite'

// @ts-ignore because this plugin doesn't export type information
import dts from 'vite-plugin-dts'
import { defineDefaultConfig } from '@padcom/vite-config-default'

/**
 * @typedef {import('vite').UserConfig} UserConfig
 * @typedef {import('vite-plugin-dts').PluginOptions} DtsPluginOverrides
 *
 * @typedef {Object} PluginOptions
 * @property {DtsPluginOverrides} dts
 *
 * @typedef {UserConfig & PluginOptions} ViteConfigLib
 */

const isWatch = process.argv.includes('-w') || process.argv.includes('--watch')
// Vite 8 drops its outDir ignore when passing watch options to rolldown,
// so on macOS (FSEvents) the dts plugin writing dist/types.d.ts re-triggers the build
// Since watch configuration makes Vite automatically watch the changes we need to
// make the configuration conditional
const watch = isWatch
  ? { exclude: ['dist/**'] }
  : null

/**
 * @param {import('@padcom/vite-config-default').PackageJSON} pkg
 * @param {ViteConfigLib} overrides
 */
export function defineBaseLibConfig(pkg, overrides = {}) {
  const config = {
    plugins: [
      dts({
        insertTypesEntry: true,
        bundleTypes: true,
        rollupTypes: true,
        logLevel: 'error',
        strictOutput: false,
        ...overrides.dts,
      }),
    ],
    build: {
      lib: {
        entry: './src/index.ts',
        name: pkg.name.split('/').at(-1),
        fileName: 'index',
      },
      sourcemap: true,
      watch,
    },
    esbuild: {
      minifyIdentifiers: false,
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
