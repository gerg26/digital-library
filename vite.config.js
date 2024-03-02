import { defineConfig, loadEnv } from 'vite';
import laravel from 'laravel-vite-plugin';

export default defineConfig(({mode}) => {
    // gets env
    const env = loadEnv(mode, process.cwd())

    // returns config
    return {
        plugins: [
            laravel({
                input: ['resources/css/app.css', 'resources/js/app.jsx'],
                refresh: true,
            }),
        ],
        resolve: name => {
            const pages = import.meta.glob('./Pages/**/*.jsx')
            return pages[`./Pages/${name}.jsx`]()
        },
        build: {
            cssCodeSplit: true,
            lib: false,
            // rollupOptions: {
            //     output:{
            //         manualChunks(id) {
            //             if (id.includes('node_modules')) {
            //                 return id.toString().split('node_modules/')[1].split('/')[0].toString();
            //             }
            //         } // https://stackoverflow.com/questions/69260715/skipping-larger-chunks-while-running-npm-run-build
            //     }
            // }
        },
        base: mode == "production" ? env.VITE_BASE + "/build" : null,
    }
});