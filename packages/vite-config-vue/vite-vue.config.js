import { mergeConfig } from 'vite'
import { defineDefaultConfig } from '@padcom/vite-config-default'
import svg from 'vite-svg-loader'
import vue from '@vitejs/plugin-vue'
import devtools from 'vite-plugin-vue-devtools'
import autoprefixer from 'autoprefixer'

/**
 * @typedef {import('vite').UserConfig} UserConfig
 * @typedef {import('vite-plugin-vue-devtools').VitePluginVueDevToolsOptions} DevToolsOptions
 * @typedef {import('@vitejs/plugin-vue').Options } VuePluginOptions
 * @typedef {import('svgo')} SVGOConfig
 * @typedef {'url' | 'raw' | 'component'} SVGDefaultImportType
 *
 * @typedef {Object} SVGPluginOptions
 * @property {SVGOConfig} svgoConfig
 * @property {boolean} svgo
 * @property {SVGDefaultImportType} defaultImport
 *
 * @typedef {Object} DevTools
 * @property {DevToolsOptions} devtools
 * @property {VuePluginOptions} vue
 * @property {SVGPluginOptions} svg
 *
 * @typedef {UserConfig & DevTools} ViteConfigVue
 */

/**
 * @param {ViteConfigVue} overrides
 */
export function defineVueBaseConfig(overrides = {}) {
  const config = {
    plugins: [
      svg(overrides.svg || {
        defaultImport: 'component',
      }),
      vue(overrides.vue || {
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
 * @param {ViteConfigVue} overrides
 */
export function defineVueAppConfig(pkg, overrides = {}) {
  return defineDefaultConfig(pkg, defineVueBaseConfig(defineVueTestConfig(overrides)))
}
