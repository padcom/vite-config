import { defineLibConfig } from '@padcom/vite-lib-config'
import { defineVueAppConfig } from '@padcom/vite-vue-config'

/**
 * @param {import('./vite-default.config').PackageJSON} pkg
 * @param {import('vite').UserConfig} overrides
 */
export function defineVueLibConfig(pkg, overrides) {
  return defineVueAppConfig(pkg, defineLibConfig(pkg, overrides))
}
