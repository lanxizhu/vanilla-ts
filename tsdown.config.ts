import { defineConfig } from 'tsdown'

export default defineConfig({
  dts: true,
  entry: ['./src'],
  format: 'esm',
  platform: 'node',
  treeshake: true,
  fromVite: 'vitest',
})
