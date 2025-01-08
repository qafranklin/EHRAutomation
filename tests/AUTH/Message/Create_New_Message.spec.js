const { test, expect } = require('@playwright/test');
const LoginPage = require('../../pageobjects/LoginPage'); 




test('@authregression Create New Message', async ({ page }) => {
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
  await page.waitForTimeout(3000)
  const isnotification = page.locator('#notification-sidebar')
  await expect(isnotification).toBeVisible();
  await isnotification.click();

  //Assert Notifications Page 
  await expect(page).toHaveURL('https://bizboxw22s:8083/app/main/main.html#/notification');
  await expect(page.locator('h2')).toHaveText('Notifications');
  
  //Assert Message then click 
  const ismsgmodule = page.locator('#message-sidebar')
  await expect(ismsgmodule).toBeVisible();
  await ismsgmodule.click();

  //verify message page 
  await expect(page).toHaveURL('https://bizboxw22s:8083/app/main/main.html#/message')
  await expect(page.locator('div h2')).toHaveText('Messages')
  
  const newmsgbtn = page.locator('#btnNewMessage')
  await  expect(newmsgbtn).toBeVisible();
  await  expect(newmsgbtn).toBeEnabled();
  newmsgbtn.click();
  
  //Verify New Message Modal 
  await expect(page.locator('#new-message-modal')).toBeVisible();
  //Verify Send button must disable when fields is empty 
  const sndmesgbtn = page.locator('#btnSendMessage')
  await expect(sndmesgbtn).toBeDisabled();
  
  const isrecipientdrop = page.locator('#txtSelectItem')
  await expect(isrecipientdrop).toBeVisible();
  await expect(isrecipientdrop).toBeEnabled();
  await isrecipientdrop.click();

  
  await isrecipientdrop.pressSequentially('wong', { delay: 100 });
  await isrecipientdrop.click();
  await page.waitForTimeout(1000);
  await page.locator('#user-1').click();

  //Verify if user is added 
  const isrecptselect = page.locator('#lblParticipantName')
  await expect(isrecptselect).toBeVisible();
  await expect(isrecptselect).toHaveText('Luna  Wong (Docluna)')
  //Verify and fill subject 
  const isubject = page.locator('#txtMessageSubject')
  await expect(isubject).toBeVisible();
  await expect(isubject).toBeEnabled();
  await expect(isubject).toBeEmpty();
  isubject.fill('Automate Message');
  //Verify Message and fill 
  const ismsgbody  = page.locator('#txtMessageContent')
  await expect(ismsgbody).toBeVisible();
  await expect(ismsgbody).toBeEnabled();
  await expect(ismsgbody).toBeEmpty();
  ismsgbody.fill('Good morning Mam Sir');
   //Verify Send button must enable when fields have a data 
   await expect(sndmesgbtn).toBeEnabled();
   await sndmesgbtn.click();
   //verify Alert Message
   const msgalert = page.locator('.toast-message')
   await expect(msgalert).toBeVisible();
   await expect(msgalert).toContainText('Message Sent')
   //Verify if Message is exist 
   await expect(page.locator('#no-more-tables')).toHaveText('Automate Message')
  



  





  




});