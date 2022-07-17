import resolve from '@rollup/plugin-node-resolve';
import scss from 'rollup-plugin-scss';
import vue from 'rollup-plugin-vue2';
import json from '@rollup/plugin-json';
import nodePolyfills from 'rollup-plugin-polyfill-node';
import commonjs from '@rollup/plugin-commonjs';
import svg from 'rollup-plugin-svg';

export default {
    input: 'main.js',
    output: [
        {
            inlineDynamicImports : true,
            dir: 'dist',
            format: 'esm',
            sourcemap: 'inline',
            name: 'App',
        }
    ],
    plugins: [
        resolve({
            browser: true,
            extensions: ['.js', '.json', '.vue'],
            preferBuiltins: false
        }),
        nodePolyfills({	include: ['.js', '.mjs', '.vue'] }),
        svg(),
        vue(),
        commonjs({
            extensions: [ '.js', '.mjs', '.vue' ],
            transformMixedEsModules: true
        }),
        json(),
        scss(),
    ],
};
