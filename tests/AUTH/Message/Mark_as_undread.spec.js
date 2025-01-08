const { test, expect } = require('@playwright/test');
const LoginPage = require('../../pageobjects/LoginPage'); 




test('@authregression Mark as all Unread', async ({ page }) => {
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

  //Assert Message Module then click 
  const ismsgmodule = page.locator('#message-sidebar')
  await expect(ismsgmodule).toBeVisible();
  await ismsgmodule.click();
  console.log('Message Module Click')

  //verify message page 
  await expect(page).toHaveURL('https://bizboxw22s:8083/app/main/main.html#/message')
  await expect(page.locator('div h2')).toHaveText('Messages')
  
  //verify Select All then checked 
  const isselectall = page.locator('#chkSelectAll')
  await expect(isselectall).toBeVisible();
  await isselectall.check();
  await expect(isselectall).toBeChecked()
  console.log('Select All button check')
  
  //Verify if Message Content is To be check
  await expect(page.locator('#chkSubject_0')).toBeChecked();

  //verify mark as already undread and Click 
  const ismarkmsgunread =  page.locator('#btnMarkAsUnread')
  await expect(ismarkmsgunread).toBeVisible();
  await expect(ismarkmsgunread).toBeEnabled();
  ismarkmsgunread.click();
  console.log('Mark as all Unread Clicked')

  //verify if message content is Unread 
  const ismsgcontentrowfirst = page.locator('#divSubject_0')
  await expect(ismsgcontentrowfirst).toBeVisible();
  await expect(ismsgcontentrowfirst).toHaveClass('unread-conversation')
  
  

});