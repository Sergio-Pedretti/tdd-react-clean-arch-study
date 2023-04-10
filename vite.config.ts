import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import reactRefresh from '@vitejs/plugin-react-refresh'

export default defineConfig({
    root: 'src',
    plugins: [
        tsconfigPaths(),
        reactRefresh()
    ],
    server: {
        port:3000
    },
     css: {
      preprocessorOptions:{
        use: ["css-loader"],
      }
    },
})
