import { mergeConfig } from 'vite'
import { defineDefaultConfig } from '@padcom/vite-config-default'
import svg from 'vite-svg-loader'
import vue from '@vitejs/plugin-vue'
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
 * @param {import('vite').UserConfig} overrides
 */
export function defineVueAppConfig(pkg, overrides = {}) {
  return defineDefaultConfig(pkg, defineVueBaseConfig(defineVueTestConfig(overrides)))
}
