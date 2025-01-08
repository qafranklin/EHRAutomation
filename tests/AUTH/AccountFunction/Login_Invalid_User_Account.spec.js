const { test, expect } = require('@playwright/test');

test('@loginreg Log In Invalid Account', async ({ page }) => {

  let url = "http://v9-dev.southeastasia.cloudapp.azure.com:8083";
  try {
    // Step 1: Navigate to Login Page
    await page.goto(url + '/app/index/index.html#/login');
    await expect(page).toHaveTitle('One Login');
    await expect(page).toHaveURL(url + '/app/index/index.html#/login');
    console.log('Page title and URL validated.');

    // Step 2: Validate Username Field
    const usernameField = await page.locator('#username');
    await expect(usernameField).toBeEnabled();
    await expect(usernameField).toBeVisible();
    await usernameField.fill('admintest');
    console.log('Username filled with invalid data.');

    // Step 3: Validate Password Field
    const passwordField = await page.locator('#password');
    await expect(passwordField).toBeEnabled();
    await expect(passwordField).toBeVisible();
    await passwordField.fill('admin1234');
    console.log('Password filled with invalid data.');

    // Step 4: Validate Login Button
    const loginBtn = await page.locator("button[type='submit']");
    await expect(loginBtn).toBeVisible();
    console.log('Login button is visible and ready to click.');

    // Step 5: Click Login Button and verify toaster message
    await loginBtn.click();
    console.log('Clicked the Login button.');

    // Step 6: Verify if verification toaster shows error message
    const toasterMessage = await page.locator('.toast-message');
    await expect(toasterMessage).toHaveText('Invalid Username or Password!');
    console.log('Toaster message validation passed: Invalid Username or Password!');

    // Step 7: Optionally log the toaster message content
    console.log('Toaster Message:', await toasterMessage.textContent());

    // Step 8: Close the page
    await page.close();
  } catch (error) {
    console.error('Test failed due to:', error);
    throw error; // Rethrow to ensure the test fails in Playwright
  }
});
