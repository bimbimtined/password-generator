Automated Tests for LassPass Password Generator

This project contains a set of e2e tests for the Password Generator (https://www.lastpass.com/features/password-generator#generatorTool). It uses Playwright Typescript to validate key functionalities of the password generator.

Project Overview

The goal is to demonstrate maintainable, extensible, and readable test automation code.
The tests validates different aspects of the password generator's functionality to ensure it behaves as expected.

Feature Tested

Following features are tested:
1. Verify headers, subheaders, buttons and checkboxes in Password Generator Section - Verified all the visible headers, buttons and checkboxes.
2. Set the password length - Verify changing password lenfth slider updates password accordingly.
3. Generate a password - Verifies that clicking "Generate" icon populates a non empty password.
4. Character Types - Validates that enabling/disabling checkboxes (uppercase, lowercase, numbers) affects the password output.
5. Copy the password to a textfile - Verify the copy password is copied and pasted to a text file.

Tech Stack
- Playwright Typescript
- Allure reporting

Setup Instructions
1. Clone the repository
- https://github.com/bimbimtined/password-generator.git

2. Install playwright (If playwright is not yet installed) - type the command on the terminal
- npm init playwright@latest

3. Install Allure reporting (optional)
- npm install -D @playwright/test allure-playwright
- npm install -g allure-commandline

4. To run the script, type the script in the terminal
- npx playwright test e2e.spec.ts  

5. To view report in Allure
- npx allure generate allure-results --clean -o allure-report && npx allure open allure-report

Notes:
- Page Onject Model (POM) - design used to separate page logic from test logic.
- Meaningful selectors for reliability.
- Clear naming convention and structure to make future test additions straightforward.

Author:
Kriselle Tined
https://github.com/bimbimtined
       


