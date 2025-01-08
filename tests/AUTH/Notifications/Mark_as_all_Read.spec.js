const { test, expect } = require('@playwright/test');
const LoginPage = require('../../pageobjects/LoginPage'); 




test('Mark as all read notifcations', async ({ page }) => {
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
const isunread = page.locator('#unread')
 await expect(isunread).toBeVisible();
 await expect(isunread).toBeEnabled();
 await isunread.click();
await expect(isunread).toHaveClass(/btn btn-default fastclickable active/);

//Assert Mark as all read button then click 
const ismarkallasreadbtn = page.locator('#markallasread-0')
await expect(ismarkallasreadbtn).toBeVisible();
await expect(ismarkallasreadbtn).toBeEnabled();
ismarkallasreadbtn.click();

//Assert Verification modal 
const isverifciation = page.locator("form[name='newForm']")
await expect(isverifciation).toBeVisible();
await expect(page.locator('div h4')).toContainText('Mark All as Read');

//Assert No Button 
const nobtn = page.locator('#no-btn');
await expect(nobtn).toBeVisible();
await expect(nobtn).toBeEnabled();

//Assert Yes Button 
const yesbtn = page.locator('#yes-btn');
await expect(yesbtn).toBeVisible();
await expect(yesbtn).toBeEnabled();
yesbtn.click();

//Assert Alert Toaster 
const markalert = page.locator('.toast-message')
expect(markalert).toBeVisible();
await expect(markalert).toHaveText('Mark all as read completed')

await page.close()

});