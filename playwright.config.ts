import { defineConfig, devices } from '@playwright/test';
import type { ConfigOptions } from './tests/module2/pages/fixtures/base.js';
//import dotenv from "dotenv";
import {config} from "@dotenvx/dotenvx";

config();

//dotenv.config(); // reads .env file and loads and for every key value pair it finds, it writes it into the process.env

export default defineConfig<ConfigOptions>({
  
  testDir: './tests',
  reporter: 'html',
  fullyParallel: true,
  workers: process.env.CI ? 1 : '50%',
    
  use: {
    baseURL: 'http://localhost:3000/',
    actionTimeout: 5000 
    ,
    headless: false,
    launchOptions: { slowMo: 1000 },
  },

  webServer: {
    command: 'npm run start',
    url: 'http://localhost:3000/',
    reuseExistingServer: !process.env.CI,
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'],
        failOnJSError: true,
       },
    }
  ],
});
