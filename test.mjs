#!/usr/bin/env node

import { defineBaseConfig, defineTestConfig, defineDefaultConfig } from './packages/vite-config-default/vite-default.config.js'
import { defineBaseLibConfig, defineExternalsConfig, defineLibConfig } from './packages/vite-config-lib/vite-lib.config.js'
import { defineVueBaseConfig, defineVueTestConfig, defineVueAppConfig } from './packages/vite-config-vue/vite-vue.config.js'
import { defineVueLibConfig } from './packages/vite-config-vue-lib/vite-vue-lib.config.js'

// const config = defineBaseLibConfig({ name: 'test' })
// const config = defineExternalsConfig({ name: 'test', dependencies: { x: '123' } })
// const config = defineLibConfig({ name: 'test', dependencies: { x: '123' } })
// const config = defineVueBaseConfig({ name: 'test' })
// const config = defineVueTestConfig({ name: 'test' })
// const config = defineVueAppConfig({ name: 'test' })
const config = defineVueLibConfig({ name: 'test' })

console.log(JSON.stringify(config, null, 2))
