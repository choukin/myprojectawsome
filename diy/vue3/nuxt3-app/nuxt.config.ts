import { defineNuxtConfig } from 'nuxt3'
// import vue from '@vitejs/plugin-vue';
// import styleImport, { VantResolve } from 'vite-plugin-style-import';
// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
    publicRuntimeConfig: {
        API_BASE: '/api'
    },
    privateRuntimeConfig: {
        API_SECRET: '123' // 仅服务端可用，会覆盖publicRuntimeConfig的配置
    },
    vite:{
        // plugins: [
        //     vue(),
        //     styleImport({
        //     resolves: [VantResolve()],
        //     }),
        // ],
    },
    buildModules:[['@pinia/nuxt', {disableVuex: true}]]
})
