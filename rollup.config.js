import resolve from '@rollup/plugin-node-resolve';
import scss from 'rollup-plugin-scss';
import vue from 'rollup-plugin-vue';
import json from '@rollup/plugin-json';

// import nodePolyfills from 'rollup-plugin-polyfill-node';

export default {
    input: 'main.js',
    output: [
        {
            inlineDynamicImports : true,
            // file: 'public/index.js',
            dir: 'dist',
            format: 'esm',
            // sourcemap: 'inline',
            name: 'App',
            // globals: {
            //     vue: 'Vue',
            //     App: 'App',
            // },
        }
    ],
    plugins: [
        resolve({
            // browser: true,
            // main: false,
            // node: false,
            extensions: ['.js', '.json', '.vue'],
        }),
        // nodePolyfills({	include: ['.js', '.mjs', '.vue'] }),
        vue(),
        // commonjs({
        //     ignoreGlobal: true,
        //     include: /\/node_modules\//,
        //     extensions: [ '.js', '.mjs' ],
        //     // transformMixedEsModules: true
        // }),
        json(),
        scss(),
    ],
};


// "ingnoredDependencies": {
//     "@babel/preset-typescript": "^7.18.6",
//     "@enhancedjs/vue-template-in-string-loader": "^0.1.5",
//     "@reduxjs/toolkit": "^1.6.2",
//     "@vue/babel-helper-vue-jsx-merge-props": "^1.2.1",
//     "@vue/babel-preset-jsx": "^1.2.4",
//     "axios": "^0.26.1",
//     "core-js": "^3.6.5",
//     "devextreme": "21.2.6",
//     "devextreme-vue": "21.2.6",
//     "jsx-to-string": "^1.4.0",
//     "lodash": "^4.17.21",
//     "moment": "^2.29.1",
//     "ol": "^6.14.1",
//     "proj4": "^2.8.0",
//     "vue-draggable-resizable": "^2.3.0",
//     "wkx": "^0.5.0"
//   },
//   "ignoredDevDependencies": {
//     "@babel/core": "^7.12.16",
//     "@vue/cli-plugin-babel": "~4.5.15",
//     "@vue/cli-service": "~4.5.15",
//     "babel-plugin-transform-inline-environment-variables": "^0.4.4",
//     "jsdoc": "^3.6.10"
//   }
// import commonjs from '@rollup/plugin-commonjs';
// import resolve from '@rollup/plugin-node-resolve';
// import scss from 'rollup-plugin-scss';
// import vue from 'rollup-plugin-vue';
// import json from '@rollup/plugin-json';
// import nodePolyfills from 'rollup-plugin-polyfill-node';

// export default {
//     input: 'src/index.js',
//     context: 'window',
//     moduleContext: 'window',
//     output: [
//         {
//             inlineDynamicImports : true,
//             // file: 'public/index.js',
//             dir: 'public',
//             format: 'iife',
//             sourcemap: 'inline',
//             name: 'App',
//             // globals: {
//             //     vue: 'Vue',
//             //     App: 'App',
//             // },
//         }
//     ],
//     plugins: [
//         resolve({
//             browser: true,
//             main: false,
//             node: false,
//             extensions: ['.js', '.json', '.vue'],
//         }),
//         nodePolyfills({	include: ['.js', '.mjs', '.vue'] }),
//         vue(),
//         commonjs({
//             ignoreGlobal: true,
//             include: /\/node_modules\//,
//             extensions: [ '.js', '.mjs' ],
//             // transformMixedEsModules: true
//         }),
//         json(),
//         scss(),
//     ],
// };