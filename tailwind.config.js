/** @type {import('tailwindcss').Config} */
export default {
    content: [
        // Adicionado index.html e arquivos .vue
        "./index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {},
    },
    plugins: [],
};
