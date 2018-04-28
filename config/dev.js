// Rollup plugins.
import buble from 'rollup-plugin-buble'
import cjs from 'rollup-plugin-commonjs'
import globals from 'rollup-plugin-node-globals'
import replace from 'rollup-plugin-replace'
import resolve from 'rollup-plugin-node-resolve'
import typescript from 'rollup-plugin-typescript2';
export default {
  input: 'src/index.ts',
  output: {
    name: 'dropEasy',
    file: 'build/drop-easy.js',
    format: 'iife',
    sourcemap: true
  },
  plugins: [
    
    replace({ 'process.env.NODE_ENV': JSON.stringify('development')}),
    globals(),
    
    resolve({
      browser: true,
      main: true
    }),
    typescript({}),
    cjs()
    //buble()
  ]
}
