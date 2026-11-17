import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import { defineConfig } from 'vite'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] })
  ],
  resolve: {
    alias: [
      {
        find: /^sheryjs$/,
        replacement: path.resolve(__dirname, 'node_modules/sheryjs/dist/Shery.js')
      },
      {
        find: /^[Cc]ontrol[Kk]it$/,
        replacement: path.resolve(__dirname, 'src/utils/controlkitMock.js')
      }
    ]
  }
})
