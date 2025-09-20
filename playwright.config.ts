import { defineConfig, devices } from "@playwright/test";

const PORT = parseInt(process.env.PORT || "3000", 10);

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",
  use: {
    trace: "on-first-retry",
    baseURL: `http://127.0.0.1:${PORT}`,
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  webServer: {
    command: `next start -p ${PORT} || next dev -p ${PORT}`,
    timeout: 120_000,
    port: PORT,
    reuseExistingServer: !process.env.CI,
  },
});
