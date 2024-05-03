/* eslint-env node */
/* eslint-disable max-len */
import path from 'node:path'
import { mergeConfig } from 'vite'

// @ts-ignore because this plugin doesn't export type information
import eslint from 'vite-plugin-eslint'

/**
 * @typedef {Object.<string, string>} Dependencies
 */

/**
 * @typedef {Object} PackageJSON
 * @property {string} name
 * @property {Dependencies} dependencies
 * @property {Dependencies} peerDependencies
 * @property {Dependencies} optionalDependencies
 */

/**
 * @param {PackageJSON} pkg
 * @param {import('vite').UserConfig} overrides
 */
export function defineBaseConfig(pkg, overrides = {}) {
  const config = {
    plugins: [
      eslint({
        lintOnStart: false,
      }),
    ],
    resolve: {
      alias: {
        '@': path.join(process.cwd(), './src'),
      },
    },
  }

  return mergeConfig(config, overrides)
}

/**
 * @param {import('vite').UserConfig} overrides
 */
export function defineTestConfig(overrides) {
  const config = {
    test: {
      setupFiles: [
        './vitest.setup.js',
      ],
      coverage: {
        enabled: true,
        reporter: ['text', 'lcov'],
      },
    },
  }

  return mergeConfig(config, overrides)
}

/**
 * @param {PackageJSON} pkg
 * @param {import('vite').UserConfig} overrides
 */
export function defineDefaultConfig(pkg, overrides = {}) {
  return defineBaseConfig(pkg, defineTestConfig(overrides))
}
