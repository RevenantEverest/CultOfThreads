import { defineConfig } from 'vite';
import path from 'path';

/* Plugins */
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite';
import { TanStackRouterVite } from '@tanstack/router-vite-plugin';

function defineRoot(mode: string): string {
    const base = "packages/";
    let rootPath = `${base}/client`; // default to client

    switch(mode) {
        case "client":
            rootPath = `${base}/client`;
            break;
        case "admin":
            rootPath = `${base}/admin`
            break;
    };

    return rootPath;
};

function definePort(mode: string): number {
    switch(mode) {
        case "client":
            return 3000;
        case "admin":
            return 4000;
        default:
            return 3000; 
    };
};

function defineAliases(mode: string): { [key: string]: string } {
    const rootPath = defineRoot(mode);

    return {
        [`@@${mode}/root`]: path.resolve(__dirname, `./${rootPath}/src`),
        [`@@${mode}/assets`]: path.resolve(__dirname, `./${rootPath}/src/assets`),
        [`@@${mode}/components`]: path.resolve(__dirname, `./${rootPath}/src/components`),
        [`@@${mode}/containers`]: path.resolve(__dirname, `./${rootPath}/src/containers`),
        [`@@${mode}/navigation`]: path.resolve(__dirname, `./${rootPath}/src/navigation`),
        [`@@${mode}/pages`]: path.resolve(__dirname, `./${rootPath}/src/pages`),
        [`@@${mode}/store`]: path.resolve(__dirname, `./${rootPath}/src/store`),
        [`@@${mode}/types`]: path.resolve(__dirname, `./${rootPath}/src/types`),

        /* Index specific aliases */
        [`@@${mode}/constants`]: path.resolve(__dirname, `./${rootPath}/src/constants`),
        [`@@${mode}/hooks`]: path.resolve(__dirname, `./${rootPath}/src/hooks`),
        [`@@${mode}/themes`]: path.resolve(__dirname, `./${rootPath}/src/themes`),
        [`@@${mode}/services`]: path.resolve(__dirname, `./${rootPath}/src/services`),
        [`@@${mode}/utils`]: path.resolve(__dirname, `./${rootPath}/src/utils`),
    };
};

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
    const rootPath = defineRoot(mode);
    const port = definePort(mode);
    const aliases = defineAliases(mode);

    console.log(`Vite started in mode: ${mode}`);
    console.log(`Root: ${rootPath}, Port: ${port}`);

    return {
        plugins: [react(), tailwindcss(), TanStackRouterVite()],
        resolve: {
            alias: aliases
        },
        root: rootPath,
        build: {
            outDir: "dist"
        },
        server: {
            port
        }
    }
});