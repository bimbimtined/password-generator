import { test, expect } from '@playwright/test';
import { PasswordGenerator } from '../page-object/password-generator-screen';

test.describe('E2E Tests', () => {
  test.beforeEach('TC_Navigate to Password Generator Site', async ({ page }) => {
    const passwordGenerator = new PasswordGenerator(page)
    await passwordGenerator.navigateToLastPassPasswordGenerator()
    // Assert the URL
    await expect.soft(page).toHaveURL('https://www.lastpass.com/features/password-generator#generatorTool')
  });
  test('TC_01_Verify headers, subheaders, buttons and checkboxes in Password Generator Section ', async ({ page }) => {
    const passwordGeneratorScreen = new PasswordGenerator(page)
    await passwordGeneratorScreen.verifyPasswordGeneratorSection()
  });

  test('TC_02_Set password length', async ({ page }) => {
    const adjustLength = new PasswordGenerator(page)
    await adjustLength.passwordLength(50)
  });

  test('TC_03_Generate a password', async ({ page }) => {
    const generatePassword = new PasswordGenerator(page)
    await generatePassword.generateRandomPassword()
  });
});