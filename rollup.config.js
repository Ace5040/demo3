import resolve from '@rollup/plugin-node-resolve';
import scss from 'rollup-plugin-scss';
import vue from 'rollup-plugin-vue2';
import json from '@rollup/plugin-json';
import nodePolyfills from 'rollup-plugin-polyfill-node';
import commonjs from '@rollup/plugin-commonjs';
import svg from 'rollup-plugin-svg';
import alias from 'rollup-plugin-alias';

export default {
    input: './src/main.js',
    context: 'null',
    moduleContext: 'null',
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
        alias({
            entries: [
                { find: 'geotiff', replacement: 'node_modules/geotiff/dist-browser/geotiff.js' }
            ]
        }),
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
