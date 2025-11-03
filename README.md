Automated Tests for LassPass Password Generator

This project contains a set of e2e tests for the Password Generator (https://www.lastpass.com/features/password-generator#generatorTool). It uses Playwright Typescript to validate key functionalities of the password generator.

Project Overview

The goal is to demonstrate maintainable, extensible, and readable test automation code.
The tests validates different aspects of the password generator's functionality to ensure it behaves as expected.

Feature Tested

Following features are tested:
1. Verify headers, subheaders, buttons and checkboxes in Password Generator Section - Verified all the visible headers, buttons and checkboxes.
2. Set the password length - Verify changing password length slider updates password accordingly.
3. Generate a password - Verifies that clicking "Generate" icon populates a non empty password.
4. Character Types - Validates that enabling/disabling checkboxes (uppercase, lowercase, numbers) affects the password output.
5. Copy the password to a textfile - Verify the copy password is copied and pasted to a text file.

Tech Stack
- Playwright Typescript
- Allure reporting
<img width="1832" height="803" alt="image" src="https://github.com/user-attachments/assets/bb4714ff-6a23-46f2-a2f1-81817d10d1e3" />
<img width="1817" height="885" alt="image" src="https://github.com/user-attachments/assets/827be39a-42a7-4595-b6f0-be96486ecc84" />

Setup Instructions 
1. Clone the repository
- https://github.com/bimbimtined/password-generator.git

2. Install playwright (If playwright is not yet installed) - type the command on the terminal
- npm init playwright@latest

3. Install Allure reporting (optional)
- npm install -D @playwright/test allure-playwright
- npm install -g allure-commandline

For windows user, before generating report in windows, please follow below steps:
- Note: For windows users, you need to download the JDK https://www.oracle.com/java/technologies/downloads/?er=221886#jdk25-windows
- Under System Variables, click New:
- Set JAVA_HOME Environment Variable, path to your JDK (e.g., C:\Program Files\Java\jdk-17) >> Save it
- In the same Environment Variables window, find the Path variable under System Variables and click Edit. Add Java to PATH %JAVA_HOME%\bin and then Save it
- Open a new PowerShell or Command Prompt and run: java -version (You should see the installed Java version.)
- Retry Allure by typing allure open in the terminal

4. To run the script, type the script in the terminal
Mac User
- npx playwright test e2e.spec.ts
- or npx playwright test e2e.spec.ts --headed
<img width="1001" height="435" alt="image" src="https://github.com/user-attachments/assets/958fcf4e-5970-4a11-a607-7ff71f479601" />

For windows user: npx playwright test e2e.spec.ts --reporter=allure-playwright


5. To view report in HTML
- npx playwright show-report

6. To view report in Allure (Optional)
Mac and windows users: In the terminal type allure serve
<img width="247" height="23" alt="image" src="https://github.com/user-attachments/assets/dd0db621-3253-441c-84df-b03673e28ddc" />


Notes:
- Page Object Model (POM) - design used to separate page logic from test logic.
- Meaningful selectors for reliability.
- Clear naming convention and structure to make future test additions straightforward.

Author:
Kriselle Tined
https://github.com/bimbimtined <p>&copy; 2025 ktined</p>
       


