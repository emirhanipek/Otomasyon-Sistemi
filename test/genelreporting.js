const { login } = require('./login');

(async () => {
    const { browser, page } = await login();
    try {

        await page.click('xpath=//*[@id="app"]/div[1]/div[2]/div[3]/a/div/button');
        await page.waitForTimeout(3000); 

        await page.click('xpath=//*[@id="app-container"]/div[2]/div[1]/div/a[1]/div');
        await page.waitForTimeout(3000);    

        // Scrollbar'ı aşağı kaydır
        await page.mouse.wheel(0, 1000); // X:0 Y:1000 kadar kaydırır
        await page.waitForTimeout(3000);

        await page.click('xpath=//*[@id="app"]/div[1]/div[2]/div[3]/a/div/button');
        await page.waitForTimeout(3000); 

        await page.click('xpath=//*[@id="app-container"]/div[2]/div[1]/div/a[2]/div');
        await page.waitTimeForTimeout(3000);

        await page.click('xpath=//*[@id="app"]/div[1]/div[2]/div[3]/a/div/button');
        await page.waitForTimeout(3000); 

        await page.click('xpath=//*[@id="app-container"]/div[2]/div[1]/div/a[3]/div');
        await page.waitForTimeout(3000);  
        
        await page.click('xpath=//*[@id="app"]/div[1]/div[2]/div[3]/a/div/button');
        await page.waitForTimeout(3000);
        
           } catch (error) {
   console.error('Bir hata oluştu:', error);
   } finally {
   await browser.close();
   }

})();
    