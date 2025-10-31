import {expect, type Locator, type Page} from '@playwright/test'

export class PasswordGenerator {
    readonly page: Page;
    constructor(page:Page){
        this.page = page;
    }

    async navigateToLastPassPasswordGenerator() {
        await this.page.goto('https://www.lastpass.com/password-generator');
    }

    async verifyPasswordGeneratorSection() {
        const sectionLocator = this.page.locator('section[data-component-name="Generic Callout"]');
        await expect(sectionLocator).toBeVisible();
    
        const headingLocator = sectionLocator.locator('h2', { hasText: 'Instantly generate a secure, random password with the LastPass online tool' });
        await expect(headingLocator).toBeVisible();

        const paragraphLocator = sectionLocator.locator('p.large', { hasText: 'Use our online password generator tool to instantly create a secure, random password.' });
        await expect(paragraphLocator).toBeVisible();

        // Locate the label for "Password Length"
        const labelLocator = this.page.locator('label.lp-custom-range__label.lp-passlength[for="lp-pg-password-length"]');
        await expect(labelLocator).toBeVisible();

        // Locate the label for "Characters Used"
        const label1Locator = this.page.locator('label.lp-custom-range__label', { hasText: 'Characters Used' });
        await expect(label1Locator).toBeVisible();

        // Locate the checkbox for "Uppercase"
        const uppercaseCheckbox = this.page.locator('input#lp-pg-uppercase');
        // Verify the checkbox is visible
        await expect(uppercaseCheckbox).toBeVisible();

        // Locate the checkbox for "Lowercase"
        const lowercaseCheckbox = this.page.locator('input#lp-pg-lowercase');
        // Verify the checkbox is visible
        await expect(lowercaseCheckbox).toBeVisible();

        // Locate the checkbox for "Numbers"
        const numbersCheckbox = this.page.locator('input#lp-pg-numbers');
        // Verify the checkbox is visible
        await expect(numbersCheckbox).toBeVisible();

        // Locate the checkbox for "Symbols"
        const symbolsCheckbox = this.page.locator('input#lp-pg-numbers');
        // Verify the checkbox is visible
        await expect(symbolsCheckbox).toBeVisible();

        // Check if the checkbox is checked by default
        const isChecked = await uppercaseCheckbox.isChecked();
        expect(isChecked).toBe(true); 

        const isChecked1 = await lowercaseCheckbox.isChecked();
        expect(isChecked1).toBe(true); 

        const isChecked2 = await numbersCheckbox.isChecked();
        expect(isChecked2).toBe(true); 

        const isChecked3 = await symbolsCheckbox.isChecked();
        expect(isChecked3).toBe(true); 
        
        // Locate the "Copy password" button
        const copyPasswordButton = this.page.locator('button[data-clipboard-target="#GENERATED-PASSWORD"]');
        
        // Verify the button is visible
        await expect(copyPasswordButton).toBeVisible();
    }
}