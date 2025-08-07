const { TLSSocket } = require('tls');
const { login } = require('./login');
const { fork } = require('child_process');

(async () => {
  const { browser, page } = await login();

  try {

    await page.waitForSelector('xpath=//*[@id="app-container"]/div[2]/div/div[2]/div[2]/div/button[2]', { timeout: 10000 });
    await page.click('xpath=//*[@id="app-container"]/div[2]/div/div[2]/div[2]/div/button[2]');
    await page.waitForTimeout(3000);

    await page.waitForSelector('xpath=//*[@id="app-container"]/div[2]/div/div[1]/div[2]/div/table/div/tbody/tr[11]/div/div/td[2]', { timeout: 10000 });
    await page.click('xpath=//*[@id="app-container"]/div[2]/div/div[1]/div[2]/div/table/div/tbody/tr[11]/div/div/td[2]');
    await page.waitForTimeout(3000);

    await page.waitForSelector('xpath=//*[@id="app-container"]/div[2]/div[2]/button[1]', { timeout: 10000 });
    await page.click('xpath=//*[@id="app-container"]/div[2]/div[2]/button[1]');
    await page.waitForTimeout(13000);

    await page.waitForSelector('xpath=/html/body/div[3]/div[2]/div[2]/div[1]/div[2]/div/div/div[2]/div/table/div/tbody/tr[1]/div/div/div/div/div/button[1]', { timeout: 10000 });
    await page.click('xpath=/html/body/div[3]/div[2]/div[2]/div[1]/div[2]/div/div/div[2]/div/table/div/tbody/tr[1]/div/div/div/div/div/button[1]');
    await page.waitForTimeout(3000);

    await page.mouse.click(100, 100); 
    await page.waitForTimeout(3000);

    await page.waitForSelector('xpath=/html/body/div[3]/div[2]/div[2]/div[1]/div[2]/div/div/div[2]/div/table/div/tbody/tr[1]/div/div/td[2]', { timeout: 10000 });
    await page.click('xpath=/html/body/div[3]/div[2]/div[2]/div[1]/div[2]/div/div/div[2]/div/table/div/tbody/tr[1]/div/div/td[2]');
    await page.waitForTimeout(5000);

    await page.waitForSelector('xpath=//*[@id="app-container"]/div[2]/div[3]/div/div[1]/div[2]/button', { timeout: 10000 });
    await page.click('xpath=//*[@id="app-container"]/div[2]/div[3]/div/div[1]/div[2]/button');
    await page.waitForTimeout(5000);

    





    
    
    
    





   
    } catch (error) {
   console.error('Bir hata oluştu:', error);
   } finally {
   await browser.close();
   }
})();