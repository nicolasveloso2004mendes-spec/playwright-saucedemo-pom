import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    // Fica em modo headless (sem janela) no GitHub Actions e com janela no seu PC
    headless: process.env.CI ? true : false,
    
    launchOptions: {
      // Remove a pausa lenta no GitHub Actions para os testes correrem rápido, mantendo 2s no seu PC
      slowMo: process.env.CI ? 0 : 2000,
    },
    
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});