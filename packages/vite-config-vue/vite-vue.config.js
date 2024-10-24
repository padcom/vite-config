import { mergeConfig } from 'vite'
import { defineDefaultConfig } from '@padcom/vite-config-default'
import svg from 'vite-svg-loader'
import vue from '@vitejs/plugin-vue'
import devtools from 'vite-plugin-vue-devtools'
import autoprefixer from 'autoprefixer'

/**
 * @typedef {import('vite').UserConfig} UserConfig
 * @typedef {import('vite-plugin-vue-devtools').VitePluginVueDevToolsOptions} DevToolsOptions
 *
 * @typedef {Object} DevTools
 * @property {DevToolsOptions} devtools
 */

/**
 * @param {UserConfig & DevTools} overrides
 */
export function defineVueBaseConfig(overrides = {}) {
  const config = {
    plugins: [
      svg({
        defaultImport: 'component',
      }),
      vue({
        template: {
          compilerOptions: {
            isCustomElement: tag => tag.includes('-'),
          },
        },
      }),
      devtools(overrides.devtools || {}),
    ],
    css: {
      postcss: {
        plugins: [
          autoprefixer(),
        ],
      },
    },
  }

  return mergeConfig(config, overrides)
}

/**
 * @param {import('vite').UserConfig} overrides
 */
export function defineVueTestConfig(overrides = {}) {
  const config = {
    test: {
      environment: 'jsdom',
    },
  }

  return mergeConfig(config, overrides)
}

/**
 * @param {import('@padcom/vite-config-default').PackageJSON} pkg
 * @param {UserConfig & DevTools} overrides
 */
export function defineVueAppConfig(pkg, overrides = {}) {
  return defineDefaultConfig(pkg, defineVueBaseConfig(defineVueTestConfig(overrides)))
}
