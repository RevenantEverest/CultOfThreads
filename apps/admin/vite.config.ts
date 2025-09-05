import { defineConfig } from 'vite';
import path from 'path';

/* Plugins */
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite';
import { TanStackRouterVite } from '@tanstack/router-plugin/vite';


// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(), 
        tailwindcss(), 
        TanStackRouterVite({
            routeToken: "_layout"
        })
    ],
    resolve: {
        alias: {
            "@@admin": path.resolve(__dirname, `./src`)
        }
    },
    server: {
        port: 4000
    }
});