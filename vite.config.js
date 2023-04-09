import path from 'path'
import {defineConfig} from 'vite'


export default defineConfig({
  root: path.resolve(__dirname, 'src'),
  build: {
    outDir: '../docs'
  },
  server: {
    port: 8080,
    hot: true
  }
});


