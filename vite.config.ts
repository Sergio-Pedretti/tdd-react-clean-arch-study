import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import react from '@vitejs/plugin-react'
import reactRefresh from '@vitejs/plugin-react-refresh'
import EnvironmentPlugin from 'vite-plugin-environment';

export default defineConfig({
    root: 'src',
    plugins: [
        react(),
        tsconfigPaths(),
        reactRefresh(),
        EnvironmentPlugin('all')
    ],
    server: {
        port:3000
    },
     css: {
      preprocessorOptions:{
        use: ["css-loader"],
      }
    },
    build: {
      target: 'esnext',
    },
    esbuild: {
      target: 'esnext'
    },
})
