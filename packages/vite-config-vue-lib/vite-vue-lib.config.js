import { defineLibConfig } from '@padcom/vite-config-lib'
import { defineVueBaseConfig, defineVueTestConfig } from '@padcom/vite-config-vue'

/**
 * @param {import('@padcom/vite-config-default').PackageJSON} pkg
 * @param {import('@padcom/vite-config-vue').ViteConfigVue} overrides
 */
export function defineVueLibConfig(pkg, overrides) {
  return defineLibConfig(pkg, defineVueBaseConfig(defineVueTestConfig(overrides)))
}
