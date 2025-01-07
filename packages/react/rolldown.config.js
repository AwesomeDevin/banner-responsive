import typescript from '@rollup/plugin-typescript';
import { defineConfig } from 'rolldown';

// let defaults = { compilerOptions: { declaration: true } }


export default defineConfig({
  input: './src/index.ts',
  output: {
    dir: 'build',
  },
  plugins: [typescript(),],
})