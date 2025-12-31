import primeui from "tailwindcss-primeui";

/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
    important: true,
    corePlugins: {
        preflight: false,
    },
    theme: {
        extend: {
            colors: {
                primary: "var(--color-primary)",
                secondary: "var(--color-secondary)",

                background: {
                    primary: "var(--bg-primary)",
                    secondary: "var(--bg-secondary)",
                    tertiary: "var(--bg-tertiary)",
                },

                text: {
                    primary: "var(--text-primary)",
                    secondary: "var(--text-secondary)",
                    muted: "var(--text-muted)",
                    disabled: "var(--text-disabled)",
                    inverted: "var(--text-inverted)",
                },

                success: "var(--success)",
                warning: "var(--warning)",
                error: "var(--error)",
                info: "var(--info)",

                gray: {
                    50: "var(--gray-50)",
                    100: "var(--gray-100)",
                    200: "var(--gray-200)",
                    300: "var(--gray-300)",
                    400: "var(--gray-400)",
                    500: "var(--gray-500)",
                    600: "var(--gray-600)",
                    700: "var(--gray-700)",
                    800: "var(--gray-800)",
                    900: "var(--gray-900)",
                    950: "var(--gray-950)",
                },
            },
            borderRadius: {
                sm: "var(--radius-sm)",
                md: "var(--radius-md)",
                lg: "var(--radius-lg)",
            },
            boxShadow: {
                sm: "var(--shadow-sm)",
                md: "var(--shadow-md)",
                lg: "var(--shadow-lg)",
            },
        },
    },
    presets: [primeui],
    plugins: [],
};
