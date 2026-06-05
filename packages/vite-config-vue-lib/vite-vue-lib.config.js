import { defineLibConfig } from '@padcom/vite-config-lib'
import { defineVueBaseConfig, defineVueTestConfig } from '@padcom/vite-config-vue'

/**
 * @typedef {import('@padcom/vite-config-vue').ViteConfigVue} ViteConfigVue
 * @typedef {import('vite-plugin-dts').PluginOptions} DtsPluginOverrides

 * @typedef {Object} PluginOptions
 * @property {DevToolsOptions} devtools
 * @property {DtsPluginOverrides} dts
 * @property {VuePluginOptions} vue
 * @property {SVGPluginOptions} svg

 * @typedef {ViteConfigVue & PluginOptions} ViteConfigVueLib
 */

/**
 * @param {import('@padcom/vite-config-default').PackageJSON} pkg
 * @param {ViteConfigVueLib} overrides
 */
export function defineVueLibConfig(pkg, overrides) {
  return defineLibConfig(pkg, defineVueBaseConfig(defineVueTestConfig(overrides)))
}
