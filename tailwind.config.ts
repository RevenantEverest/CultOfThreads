import { Config } from "tailwindcss";
import Flowbite from 'flowbite-react/tailwind';

const tailwindConfig: Config = {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        Flowbite.content()
    ],
    theme: {
        extend: {
            colors: {
                primary: 'var(--color-primary)',
                secondary: 'var(--color-secondary)',
                accent: 'var(--color-accent)',
                text: 'var(--color-text)',
                'muted': 'var(--color-muted)',
                'text-accent': 'var(--color-text-accent)',
                'card': 'var(--color-card)',
                'card-light': 'var(--color-card-light)',
                'background': 'var(--background)'
            }
        },
    },
    plugins: [Flowbite.plugin()],
};

export default tailwindConfig;