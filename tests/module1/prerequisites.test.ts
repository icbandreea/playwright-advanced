import { test, expect } from '@playwright/test';

// not a real test - just a collection of fundamental Playwright capabilities
test.skip('Prerequisite knowledge for the advanced course', async ({ page, browser, request }) => {

  const ctx = browser.newContext({
    javaScriptEnabled: false,
    locale: 'Es-es',
    acceptDownloads: true
    // etc.
  });

 
  await page.goto('url');

  // locators
  const input = page.getByLabel('User name');
  const btn = page.getByRole('button', { name: 'Sign in', exact: true });
  const msg = page.getByTestId('some_id');

  // actions
  await input.fill('...');
  await btn.click();

  // + upload / download files
  // handle dialogs (popups)

  await request.get('url');

  // assertions
  await expect(msg).toBeVisible();
  await expect(msg).toBeInViewport();
});




