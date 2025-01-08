//const { test, expect } = require('@playwright/test');
//const LoginPage = require('../../pageobjects/LoginPage'); 
import LoginPage from '../../pageobjects/LoginPage';
import { test, expect } from '@playwright/test';

test('@loginreg Log In Existing Account', async ({ page }) => {
  try {
    const loginPage = new LoginPage(page);

    // Step 1: Navigate to the login page and validate title and URL
    await loginPage.navigateToLoginPage();
    await loginPage.validateLoginPage();

    // Step 2: Validate and fill login credentials
    await loginPage.validateUsernameField();
    await loginPage.fillUsername();
    await loginPage.validatePasswordField();
    await loginPage.fillPassword();

    // Step 3: Validate login button and perform login
    await loginPage.validateLoginButton();
    await loginPage.clickLoginButton();

    await page.waitForLoadState('networkidle');
    // Step 6: Validate the home page after login
    await loginPage.validateHomePage();

    // Step 7: Validate the logged-in user
    await loginPage.validateLoggedInUser('Erza  Scarlette');

    // Step 8: Close the page
    await page.close();

  } catch (error) {
    console.error('Test failed due to:', error);
    throw error;  // Rethrow error to ensure the test fails properly
  }
});
