import { defineConfig } from '@playwright/test';

export default defineConfig({
  timeout: 60000, // 1 minuto de timeout para los tests
  use: {
    baseURL: 'https://highlifeshop.com', // URL base para evitar repetir en los tests
    headless: true, // Ejecutar en modo headless
    screenshot: 'only-on-failure', // Tomar capturas solo si falla
    video: 'retain-on-failure', // Grabar video solo en fallos
  },
  reporter: [
    ['list'], 
    ['html', { outputFolder: 'html-report', open: 'never' }]
  ],  projects: [
    {
      name: 'Chromium',
      use: { browserName: 'chromium' },
    },
    {
      name: 'Firefox',
      use: { browserName: 'firefox' },
    },
    {
      name: 'WebKit',
      use: { browserName: 'webkit' },
    },
  ],
});
