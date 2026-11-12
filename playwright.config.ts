import { defineConfig, devices } from "@playwright/test";
import path from "node:path";

// Every run owns an isolated DB and storage copy. Never point mutation tests at the user's server.
const root = path.resolve(".recovery/browser-test");
const baseURL = "http://127.0.0.1:3101";
export default defineConfig({
  testDir: "./tests", fullyParallel: false, workers: 1, timeout: 45000,
  reporter: [["list"], ["json", { outputFile: "test-results/browser-results.json" }]],
  use: { baseURL, trace: "retain-on-failure", screenshot: "only-on-failure" },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"], channel: "msedge" } }],
  webServer: { command: "node node_modules/next/dist/bin/next start --hostname 127.0.0.1 --port 3101", url: baseURL + "/api/health", reuseExistingServer: false, timeout: 60000, env: {
    DATABASE_URL: "file:" + path.join(root, "test.db").replace(/\\/g, "/"),
    PRIVATE_STORAGE_PATH: path.join(root, "uploads"),
    CURATOR_ACCESS_KEY: "isolated-browser-tests-only-00000000000000000000",
    APP_ORIGIN: baseURL,
  } },
});
