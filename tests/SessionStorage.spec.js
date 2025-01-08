const { test, expect } = require('@playwright/test');
let webContext;

test.beforeAll(async({browser}) =>


{
  
const context = await browser.newContext();
const page = await context.newPage();
await page.goto('http://localhost:83//app/index/index.html#/login');
await page.locator('#username').fill('nursecervantes');
await page.locator('#password').fill('abcdE@123');
await page.locator("[type='submit']").click();
await page.waitForLoadState('networkidle');
await context.storageState({path: 'state.json'});
webContext = await browser.newContext({storageState: 'state.json'});

});


test('@Smoke Filtering of Date ', async () => 
  {
 const page = await webContext.newPage();
 await page.goto('http://localhost:84/app/user/user.html#/visits');
  //Step 4:Verify user profile then click 
 

  await page.selectOption('#standard', 'Last 2 weeks');
 
  const selectedOption = await page.locator('#standard').inputValue();
  expect(selectedOption).toBe('7');




  // await page.waitForLoadState('networkidle');
  // const isuserpic = await page.locator('#userPic');
  // expect(isuserpic).toBeVisible();
  // isuserpic.click();

  // //Notifications 
 
  // const isnotification = page.locator('#notification-sidebar')
  // await expect(isnotification).toBeVisible();
  // await isnotification.click();

  // //Assert Notifications Page 
  // await expect(page).toHaveURL('http://localhost:83/app/main/main.html#/notification');
  // await expect(page.locator('h2')).toHaveText('Notifications');

  // //Assert undread Status 
  // const isunread = page.locator('#unread')
  // await expect(isunread).toBeVisible();
  // await expect(isunread).toBeEnabled();
  
  // //Assert All Status 
  // const isall = page.locator('#all')
  // await expect(isall).toBeVisible();
  // await expect(isunread).toBeEnabled();

  // //Assert Mark as all read button 
  // const ismarkallasread = page.locator('#markallasread-0')
  // await expect(ismarkallasread).toBeVisible();
  // await expect(isunread).toBeEnabled();

  


  
  


  



});
