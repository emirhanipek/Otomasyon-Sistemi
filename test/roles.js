const { login } = require('./login');

(async () => {
    const { browser, page } = await login();
    try {

        await page.click('xpath=//*[@id="app"]/div[1]/div[2]/div[5]/a/div/button')
        await page.waitForTimeout(3000);
          
        await page.click('xpath=//*[@id="app-container"]/div[2]/div[1]/div/div/div[1]/button[2]')
        await page.waitForTimeout(3000);

        await page.click('xpath=//*[@id="app-container"]/div[2]/div[1]/div/div/div[1]/button[2]')
        await page.waitForTimeout(3000);

        await page.click('xpath=//*[@id="app-container"]/div[2]/div[2]/div/div/div/div[1]/div/div/div/button')
        await page.waitForTimeout(3000);
        
        await page.click('xpath=/html/body/div[3]/div[2]/div[2]/form/div/div[1]/div[2]/input')
        await page.waitForTimeout(3000);

        await page.fill('xpath=/html/body/div[3]/div[2]/div[2]/form/div/div[1]/div[2]/input', 'Test Deneme 1');
        await page.waitForTimeout(3000);  
        
        await page.waitForSelector('xpath=/html/body/div[3]/div[2]/div[2]/form/div/div[2]/div/div[2]/div/div[2]/div/div[1]/div/div[1]', { timeout: 10000 });
        await page.click('xpath=/html/body/div[3]/div[2]/div[2]/form/div/div[2]/div/div[2]/div/div[2]/div/div[1]/div/div[1]');
        await page.waitForTimeout(3000);

        await page.getByText('View CV').click();
        await page.waitForTimeout(3000);

        await page.getByText('Change CV Status').click();
        await page.waitForTimeout(3000);

        await page.click('xpath=/html/body/div[3]/div[2]/div[2]/form/div/div[2]/div/div[2]/div/div[1]/div/div[1]/div/div[1]/div/div/div')
        await page.waitForTimeout(3000);

        
        await page.click('xpath=/html/body/div[3]/div[2]/div[2]/form/div/div[3]/button/div');
        await page.waitForTimeout(3000);


        await page.screenshot({ path: 'rol.png', fullPage: true });

        await page.mouse.click(1000, 10);
        await page.waitForTimeout(2000);

        

       

        



         } catch (error) {
   console.error('Bir hata oluştu:', error);
   } finally {
   await browser.close();
   }

})();