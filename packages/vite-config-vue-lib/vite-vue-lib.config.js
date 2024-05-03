import { defineLibConfig } from '@padcom/vite-config-lib'
import { defineVueAppConfig } from '@padcom/vite-config-vue'

/**
 * @param {import('@padcom/vite-config-default').PackageJSON} pkg
 * @param {import('vite').UserConfig} overrides
 */
export function defineVueLibConfig(pkg, overrides) {
  return defineVueAppConfig(pkg, defineLibConfig(pkg, overrides))
}
