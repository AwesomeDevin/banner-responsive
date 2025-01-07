

const typescript = require('@rollup/plugin-typescript');
const defineConfig = require('rolldown').defineConfig;



module.exports = defineConfig({
  input: './src/index.tsx',
  external: ['react', 'react-dom', 'react/jsx-runtime'],
  output: [
    {
      dir: 'build/es',
      format: 'es',
      sourcemap: 'hidden',

    },{
      dir: 'build/cjs',
      format: 'cjs',
      sourcemap: 'hidden'
    },
    {
      dir: 'build/umd',
      format: "umd",
      name: "ResponsiveBanner",
      sourcemap: 'hidden'
    }
  ],

})