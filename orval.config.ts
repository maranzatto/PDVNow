import { defineConfig } from "orval";

export default defineConfig({
    pdvnow: {
        input: "./openapi/swagger.json",
        output: {
            target: "src/api/generated.ts",
            client: "axios",
            mode: "single",
            clean: true,
            override: {
                axios: {
                    instance: "api",
                },
            },
        },
    },
});
