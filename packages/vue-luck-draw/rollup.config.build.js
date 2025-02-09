import ts from 'rollup-plugin-typescript2'
import dts from 'rollup-plugin-dts'
import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import resolve from '@rollup/plugin-node-resolve'
import PostCSS from 'rollup-plugin-postcss'
import del from 'rollup-plugin-delete'
import pkg from './package.json'

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        file: `${pkg.module}.js`,
        format: 'esm',
        sourcemap: true,
      },
      {
        file: `${pkg.browser}.js`,
        format: 'umd',
        name: 'VueLuckDraw',
        sourcemap: true,
        globals: {
          'vue-demi': 'VueDemi',
          'lucky-canvas': 'LuckyCanvas',
        },
      },
      // {
      //   exports: 'named',
      //   format: 'cjs',
      //   file: pkg.main
      // },
    ],
    plugins: [
      ts(),
      json(),
      resolve(),
      commonjs(),
      PostCSS(),
    ],
    external: ['vue-demi'],
  }, {
    input: "dist/src/index.d.ts",
    output: [
      {
        file: "dist/index.d.ts",
        format: "es"
      }
    ],
    plugins: [
      dts(),
      del({
        targets: 'dist/src',
        hook: 'buildEnd'
      })
    ],
  },
]
