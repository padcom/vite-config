# Vite configuration for Vue.js applications

This package exposes a function that defines a a Vite configuration for Vue.js applications.
The default configuration consists of the following elements:

## Base configuration

- the `@/` alias to `./src`
- [vite-eslint-plugin](https://www.npmjs.com/package/vite-plugin-eslint/v/1.8.1) plugin
- [@padcom/vite-plugin-vue-i18n](https://npmjs.com/package/@padcom/vite-plugin-vue-i18n/v/0.6.0)
- [@vitejs/plugin-vue](https://npmjs.com/package/@vitejs/plugin-vue/v/5.0.4)
- [@vue/test-utils](https://npmjs.com/package/@vue/test-utils/v/2.4.5)
- [autoprefixer](https://npmjs.com/package/autoprefixer/v/10.4.19)
- [tailwindcss](https://npmjs.com/package/tailwindcss/v/3.4.3)
- [vite-svg-loader](https://npmjs.com/package/vite-svg-loader/v/5.1.0) (by default in component import mode)
- [vite-dts-plugin](https://www.npmjs.com/package/vite-plugin-dts/v/0.6.0) plugin

## Test configuration

- `./vitest.setup.js` initialization file
- test coverage using [@vitest/coverage-v8](https://npmjs.com/package/@vitest/coverage-v8/v/1.5.2)
- [@vue/test-utils](https://npmjs.com/package/@vue/test-utils/v/2.4.5)
- [jsdom](https://npmjs.com/package/jsdom/v24.0.0)

This configuration sets up testing using [vitest](https://npmjs.com/package/vitest)
