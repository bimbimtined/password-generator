/**
 * Copyright (c) 2025 ktined
 */
import {expect, type Locator, type Page, test} from '@playwright/test'
import * as fs from 'fs';
import * as path from 'path';

export class PasswordGenerator {
    constructor(private readonly page: Page) {}

    async navigateToLastPassPasswordGenerator() {
        await this.page.goto('https://www.lastpass.com/features/password-generator#generatorTool');
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

    async passwordLength(targetPercentage: number) {
        test.slow();
        await this.page.waitForTimeout(30000);
    
        // Locate the slider bar and slider button
        const bar = this.page.locator('.lp-custom-range__bar');
        const slider = this.page.locator('.lp-custom-range__bar > button.lp-custom-range__slider');
    
        // Get the bounding box of the slider bar
        const barBox = await bar.boundingBox();
        if (!barBox) {
            throw new Error('Slider bar not found');
        }
    
        // Get the current slider position
        const currentX = parseFloat((await slider.getAttribute('style'))?.match(/translateX\((.*?)px\)/)?.[1] || '0');
    
        // Calculate the target position based on the percentage
        const targetX = barBox.x + (barBox.width * targetPercentage) / 100;
        const targetY = barBox.y + barBox.height / 2;
    
        // Directly click at the calculated position
        await bar.click({ position: { x: targetX - barBox.x, y: targetY - barBox.y } });
    
        // Verify the slider's position has been updated
        const updatedX = parseFloat((await slider.getAttribute('style'))?.match(/translateX\((.*?)px\)/)?.[1] || '0');
        console.log(`Slider position before: ${currentX}px, after: ${updatedX}px`);
    
        // Assert the slider's position has been updated
        if (updatedX === currentX) {
            throw new Error('Slider position did not update');
        }
    }
    async generateRandomPassword() {
        test.slow();
        await this.page.waitForTimeout(10000);
        // Locate the "Generate" button
        const generateButton = this.page.locator('.lp-pg-generated-password__icon.lp-pg-generated-password__icon-generate.lp-webbtn')
        
        // Click the "Generate" button
        await generateButton.click({force: true});
        await this.page.waitForTimeout(10000);
    
        // Wait for the generated password to appear in the input field
        const passwordInput = this.page.locator('input#GENERATED-PASSWORD');
        await this.page.waitForSelector('input#GENERATED-PASSWORD', { state: 'attached' });
    
        // Retrieve the value of the generated password
        const generatedPassword = await passwordInput.inputValue();
    
        // Log the generated password to the console
        console.log(`Generated Password: ${generatedPassword}`);
    
        // Ensure the password is not empty
        if (!generatedPassword) {
            throw new Error('Generated password is empty');
        }
    }

    async characterUsed() {
        test.slow();
        // Locate the "Uppercase" checkbox
        await this.page.locator('.lp-checkbox__label').locator('text=Uppercase').isChecked();
    
        // Uncheck the "Lowercase" checkbox
        const lowercaseCheckbox = this.page.locator('.lp-checkbox__label').locator('text=Lowercase');
        await lowercaseCheckbox.waitFor({ state: 'visible' }); // Ensure it's visible
        await lowercaseCheckbox.click();

        // Uncheck the "Numbers" checkbox
        const numbersCheckbox = this.page.locator('.lp-checkbox__label').locator('text=Numbers');
        await numbersCheckbox.waitFor({ state: 'visible' }); // Ensure it's visible
        await numbersCheckbox.click();

        // Uncheck the "Symbols" checkbox (corrected locator)
        const symbolsCheckbox = this.page.locator('.lp-checkbox__label').locator('text=Symbols');
        await symbolsCheckbox.waitFor({ state: 'visible' }); // Ensure it's visible
        await symbolsCheckbox.click();
        await this.page.waitForTimeout(15000);

        const passwordInput = this.page.locator('input#GENERATED-PASSWORD');
        // Wait for the input field to be attached
        await this.page.waitForSelector('input#GENERATED-PASSWORD', { state: 'attached' });

        // Retrieve the value of the generated password
        const generatedPassword = await passwordInput.inputValue();

        // Log the generated password
        console.log(`Generated Password: ${generatedPassword}`);

        // Check if the password is all uppercase
        if (!/^[A-Z]+$/.test(generatedPassword)) {
            throw new Error('Generated password is not all uppercase');
        } else {
            console.log('The generated password is all uppercase.');
        }
    
        // Check the "Lowercase" checkbox
        const lowercase1Checkbox = this.page.locator('.lp-checkbox__label').locator('text=Lowercase');
        await lowercase1Checkbox.waitFor({ state: 'visible' }); // Ensure it's visible
        await lowercase1Checkbox.click();
        await this.page.waitForTimeout(15000);

        // Locate the "Uppercase" checkbox
        await this.page.locator('.lp-checkbox__label').locator('text=Uppercase').click();

        const passwordInput_01 = this.page.locator('input#GENERATED-PASSWORD');
        // Wait for the input field to be attached
        await this.page.waitForSelector('input#GENERATED-PASSWORD', { state: 'attached' });

        // Retrieve the value of the generated password
        const generatedPassword_01 = await passwordInput_01.inputValue();

        // Log the generated password
        console.log(`Generated Password: ${generatedPassword_01}`);

        // Check if the password is all lowercase
        if (!/^[a-z]+$/.test(generatedPassword_01)) {
            throw new Error('Generated password is not all lowercase');
        } else {
            console.log('The generated password is all lowercase.');
        }

        // Check the "Numbers" checkbox
        const numbersCheckbox_01 = this.page.locator('.lp-checkbox__label').locator('text=Numbers');
        await numbersCheckbox_01.waitFor({ state: 'visible' }); // Ensure it's visible
        await numbersCheckbox_01.click();
        await this.page.waitForTimeout(15000);

        // Locate the "Lowercase" checkbox
        await this.page.locator('.lp-checkbox__label').locator('text=Lowercase').click();

        const passwordInput_02 = this.page.locator('input#GENERATED-PASSWORD');
        // Wait for the input field to be attached
        await this.page.waitForSelector('input#GENERATED-PASSWORD', { state: 'attached' });

        // Retrieve the value of the generated password
        const generatedPassword_02 = await passwordInput_02.inputValue();

        // Log the generated password
        console.log(`Generated Password: ${generatedPassword_02}`);

        // Check if the password is all numbers
        if (!/^[0-9]+$/.test(generatedPassword_02)) {
            throw new Error('Generated password is not all numbers');
        } else {
            console.log('The generated password is all numbers.');
        }
    }

    async copyPasswordToTextfile() {
        test.slow();
        await this.page.waitForTimeout(10000);
    
        // Locate the "Copy password" button
        const copyPasswordButton = this.page.getByRole('button', { name: 'Copy password' });

        // Click the "Copy password" button
        await copyPasswordButton.click();

        // Wait for the generated password to appear in the input field
        const passwordInput = this.page.locator('input#GENERATED-PASSWORD');
        await passwordInput.waitFor({ state: 'visible' });

        // Retrieve the value of the generated password
        const generatedPassword = await passwordInput.inputValue();

        // Ensure the password is not empty
        if (!generatedPassword) {
            throw new Error('Generated password is empty');
        }
        // Define the file path where the password will be saved
        const filePath = path.join(__dirname, 'generated-password.txt');

        // Write the password to the file
        fs.writeFileSync(filePath, generatedPassword, 'utf8');

        console.log(`Password saved to file: ${filePath}`);
    }
}
