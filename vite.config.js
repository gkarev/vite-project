import {resolve} from 'path'
import {defineConfig} from 'vite'
import handlebars from 'vite-plugin-handlebars'
import {ViteImageOptimizer} from 'vite-plugin-image-optimizer'
import {CustomHmr} from './vite_config/custom-hmr'


const sourceFolder = 'src'


export default defineConfig({
  root: resolve(__dirname, sourceFolder),
  publicDir: resolve(__dirname, 'public'),
  // base: '/vite-deploy-demo/',
  build: {
    outDir: '../docs',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, sourceFolder, 'index.html'),
        home: resolve(__dirname, sourceFolder, 'home.html')
      },

    },
  },
  plugins: [
    CustomHmr(),
    handlebars({
      partialDirectory: resolve(__dirname, sourceFolder, 'partials'),
    }),

    ViteImageOptimizer({
      test: /\.(jpe?g|png|tiff|webp|svg|avif)$/i,
      exclude: undefined,
      include: undefined,
      includePublic: true,
      logStats: true,
      svg: {
        multipass: true,
        plugins: [
          {
            name: 'preset-default',
            params: {
              overrides: {
                cleanupNumericValues: false,
                removeViewBox: false,
              },
              cleanupIDs: {
                minify: false,
                remove: false,
              },
              convertPathData: false,
            },
          },
          'sortAttrs',
          {
            name: 'addAttributesToSVGElement',
            params: {
              attributes: [{xmlns: 'http://www.w3.org/2000/svg'}],
            },
          },
        ],
      },
      png: {
        quality: 60,
      },
      jpeg: {
        quality: 60,
      },
      jpg: {
        quality: 60,
      },
      tiff: {
        quality: 100,
      },
      webp: {
        lossless: true,
      },
      avif: {
        lossless: true,
      },
    }),
  ],

  server: {
    port: 8080,
    hot: true,
    open: 'index.html',
    usePolling: true,
  },


})

