const { test, expect } = require('@playwright/test');
const LoginPage = require('../../pageobjects/LoginPage'); 



test('@authregression Access All Notifications', async ({ page }) => {
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

 await page.waitForTimeout(6000)
  //Step 4:Verify user profile then click 
  const isuserpic = await page.locator('#userPic')
  expect(isuserpic).toBeVisible();
  isuserpic.click();

  //Notifications 
  await page.waitForTimeout(6000)
  const isnotification = page.locator('#notification-sidebar')
  await expect(isnotification).toBeVisible();
  await isnotification.click();

  //Assert Notifications Page 
  await expect(page).toHaveURL('https://bizboxw22s:8083/app/main/main.html#/notification');
  await expect(page.locator('h2')).toHaveText('Notifications');

  //Assert undread Status 
const isallnotif = page.locator('#all')
 await expect(isallnotif).toBeVisible();
 await expect(isallnotif).toBeEnabled();
 await isallnotif.click();
await expect(isallnotif).toHaveClass(/btn btn-default fastclickable active/);
await page.locator('#unread').click();
await expect(isallnotif).toHaveClass(/btn btn-default fastclickable/);

await page.close()

});
