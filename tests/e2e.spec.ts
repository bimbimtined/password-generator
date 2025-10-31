import { test, expect } from '@playwright/test';
import { PasswordGenerator } from '../page-object/password-generator-screen';

test.describe('E2E Tests', () => {
  test.beforeEach('TC_Navigate to Password Generator Site', async ({ page }) => {
    const passwordGenerator = new PasswordGenerator(page)
    await passwordGenerator.navigateToLastPassPasswordGenerator()
    // Assert the URL
    await expect.soft(page).toHaveURL('https://www.lastpass.com/features/password-generator')
  });
  test('TC_01_Verify headers, subheaders, buttons and checkboxes in Password Generator Section ', async ({ page }) => {
    const passwordGeneratorScreen = new PasswordGenerator(page)
    await passwordGeneratorScreen.verifyPasswordGeneratorSection()
  });
});