const { test, expect } = require('@playwright/test');

test(' Reset Password Account', async ({ page }) => {


  try {
    // Step 1: Navigate to the Login Page
    await page.goto('https://bizboxw22s:8083//app/index/index.html#/login');

    //Step 2: Validate Log In Page 
    await expect(page).toHaveTitle('One Login');
    await expect(page).toHaveURL('https://bizboxw22s:8083//app/index/index.html#/login');
    console.log('Page title and URL validation.');
    
    //Step 3: Validate Reset Password 
    const isResetPassword = await page.locator('#resetpassword-lnk')
    expect(isResetPassword).toBeVisible();
    await isResetPassword.click();
    console.log('Validate Reset Password Button must be Disable')

    //Step 4: Validate Resetpassword Page 
    await expect(page).toHaveURL('https://bizboxw22s:8083//app/index/index.html#/reset-password');
    await expect(page.locator('.loginHeader')).toHaveText('Password Reset');
    console.log('Validate Reset Password Page')
    
    //Validate Reset Password Must Disable
    const isresetbtn = await page.locator('#resetPasswordFormSubmitButton')
    await expect(isresetbtn).toBeVisible();
    await expect(isresetbtn).toBeDisabled();
    console.log('Validate Reset Password button must be Enable')

    //Validate and Select Secret Question 
    const secretq = await page.locator('#secretQuestion')
    
    expect(secretq).toBeVisible();
    secretq.selectOption('What high school did you attend?')
    console.log('Validate Secret Question')
    
     //Validate and Fill Up Answer Question 
     const isasnwer = await page.locator('#secretQuestionAnswer')
     expect(isasnwer).toBeVisible();
     expect(isasnwer).toBeEnabled();
     await isasnwer.fill('Test Highschool')
     console.log('Validate Answer Question')

      //Validate and Fill Up email Question 
      const isemail = await page.locator('#eMail')
      expect(isemail).toBeVisible();
      expect(isemail).toBeEnabled();
      await isemail.fill('david.thomas@mailinator.com')
      console.log('Validate Email')

     //Validate Reset Password Must Enable
     await expect(isresetbtn).toBeVisible();
     await expect(isresetbtn).toBeEnabled();
     isresetbtn.click();
     console.log('Validate Reset Password must be Enable')

    //verify Reset Passowrd Toaster Message 
     const toasterMessage = await page.locator('.toast-message');
     await expect(toasterMessage).toHaveText('New Password was sent to your email, please check within a few minutes.');
     console.log('Verify Toaster "New Password was sent to your email, please check within a few minutes."')
     

     await page.waitForTimeout(3000)
     await page.goto('https://www.mailinator.com/v4/public/inboxes.jsp?to=david.thomas')

     await page.waitForTimeout(3000)
  await page.locator("[class='table-striped jambo_table'] tr").first().click()
  
  const data = await page.locator('body').nth(1).textContent();  // Modify selector to your needs
  
  await page.goto('https://bizboxw22s:8083//app/index/index.html#/login');
  // Use the data on the main page (e.g., filling in a form field)

  await page.waitForTimeout(3000)
  await page.fill('#username', data);
  

  } catch (error) {
    console.error('Test failed due to:', error);
    throw error;  // Rethrow error to ensure the test fails properly
  }

});