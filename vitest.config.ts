import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    setupFiles: ["./src/setupTests.ts"],
    coverage: {
      include: [
        "src/**/*.ts",
        "!src/index.ts",
        "!src/server/startServer.ts",
        "!src/database/index.ts",
      ],
    },
  },
});
