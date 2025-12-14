import { globalIgnores } from "eslint/config";
import { defineConfigWithVueTs, vueTsConfigs } from "@vue/eslint-config-typescript";
import pluginVue from "eslint-plugin-vue";

export default defineConfigWithVueTs(
    {
        name: "app/files-to-lint",
        files: ["**/*.{ts,mts,tsx,vue}"],
        rules: {
            "vue/block-order": [
                "warn",
                {
                    order: ["script", "template", "style"],
                },
            ],
        },
    },

    globalIgnores(["**/dist/**", "**/dist-ssr/**", "**/coverage/**"]),

    pluginVue.configs["flat/essential"],
    vueTsConfigs.recommended
);
