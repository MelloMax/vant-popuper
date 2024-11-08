import {defineConfig} from 'vite'
import {resolve} from 'path'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import dts from 'vite-plugin-dts'

// https://vite.dev/config/
export default defineConfig({
    base: './',
    plugins: [dts({
        tsconfigPath: './tsconfig.app.json',
        include: './lib/core.tsx'
    }), vue(), vueJsx()],
    resolve: {
        alias: {
            '@': resolve(__dirname, './lib')
        }
    },
    build: {
        lib: {
            // Could also be a dictionary or array of multiple entry points
            entry: resolve(__dirname, 'lib/index.ts'),
            name: 'VantPopuper',
            fileName: 'index'
        },
        rollupOptions: {
            external: ['vue', 'vant'],
            output: {
                globals: {
                    vue: 'Vue',
                    vant: 'Vant'
                },
            },
        }
    }
})
