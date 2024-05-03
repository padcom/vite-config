import { mergeConfig } from 'vite'
import { defineDefaultConfig } from '@padcom/vite-default-config'

import svg from 'vite-svg-loader'
import vue from '@vitejs/plugin-vue'
import i18n from '@padcom/vite-plugin-vue-i18n'
import nesting from 'tailwindcss/nesting'
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'

/**
 * @param {import('vite').UserConfig} overrides
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
      i18n({}),
    ],
    css: {
      postcss: {
        plugins: [
          nesting(),
          tailwindcss(),
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
 * @param {import('@padcom/vite-default-config').PackageJSON} pkg
 * @param {import('vite').UserConfig} overrides
 */
export function defineVueAppConfig(pkg, overrides = {}) {
  return defineDefaultConfig(pkg, defineVueBaseConfig(defineVueTestConfig(overrides)))
}
