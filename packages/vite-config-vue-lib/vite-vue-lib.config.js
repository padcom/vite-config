import { defineLibConfig } from '@padcom/vite-config-lib'
import { defineVueBaseConfig, defineVueTestConfig } from '@padcom/vite-config-vue'

/**
 * @typedef {import('vite').UserConfig} UserConfig
 * @typedef {import('vite-plugin-vue-devtools').VitePluginVueDevToolsOptions} DevToolsOptions
 *
 * @typedef {Object} DevTools
 * @property {DevToolsOptions} devtools
 *
 * @param {import('@padcom/vite-config-default').PackageJSON} pkg
 * @param {UserConfig & DevTools} overrides
 */
export function defineVueLibConfig(pkg, overrides) {
  return defineLibConfig(pkg, defineVueBaseConfig(defineVueTestConfig(overrides)))
}
