import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'

export default defineConfig({
    root: 'public',
    plugins: [reactRefresh()],
    server: {
        port:3000
    }
})
