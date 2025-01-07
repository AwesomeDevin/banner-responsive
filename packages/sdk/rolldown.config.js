import { defineConfig } from 'rolldown';
import typescript from 'rollup-plugin-typescript2';

// let defaults = { compilerOptions: { declaration: true } }


export default defineConfig({
  input: './src/index.js',
  output: {
    file: 'dist/index.js',
  },
  plugins: [typescript({
    // tsconfigDefaults: defaults,
    tsconfig: 'tsconfig.json',
    clean: true,
    
  }),],
})