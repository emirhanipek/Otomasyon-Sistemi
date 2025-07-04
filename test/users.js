const { login } = require('./login');

(async () => {
    const { browser, page } = await login();
    try {
       
        // Kullanıclar
        await page.click('xpath=//*[@id="app"]/div[1]/div[2]/div[5]/a/div/button')
        await page.waitForTimeout(3000);

        // Kullanıcı arama
        const input = await page.waitForSelector('xpath=//*[@id="app-container"]/div[2]/div[2]/div/div/div[1]/div[1]/div/div[2]/input');
        
        await input.click();
        await input.fill('Berk Dorukan Güller');
        await input.press('Enter');
        await page.waitForTimeout(5000);

        await input.fill('');
        await input.press('Enter');
        await page.waitForTimeout(5000);

        // Kullanıcı ekle
        await page.waitForSelector('xpath=//*[@id="app-container"]/div[2]/div[2]/div/div/div[1]/div[1]/div/div[1]/div/button', { timeout: 10000 });
        await page.click('xpath=//*[@id="app-container"]/div[2]/div[2]/div/div/div[1]/div[1]/div/div[1]/div/button');
        await page.waitForTimeout(3000); 

        const names = [
       'Ali', 'Ayşe', 'Mehmet', 'Zeynep', 'Doruk', 'Elif', 'Mert', 'Selin', 'Berk', 'Derya',
       'Can', 'Tuğba', 'Kerem', 'Yasemin', 'Eren', 'Melis', 'Onur', 'Hazal', 'Arda', 'Deniz',
       'Burak', 'İrem', 'Emre', 'Ceren', 'Kaan', 'Gizem', 'Tuna', 'Buse', 'Batuhan', 'Damla'
       ];

        const surnames = [
        'Yılmaz', 'Demir', 'Kaya', 'Aydın', 'Çelik', 'Güller', 'Koç', 'Arslan', 'Öztürk', 'Aksoy',
        'Şahin', 'Bozkurt', 'Kılıç', 'Yıldız', 'Türkmen', 'Polat', 'Güneş', 'Erdoğan', 'Alp', 'Kurt',
        'Avcı', 'Aslan', 'Çetin', 'Eren', 'Taş', 'Sezer', 'Ay', 'Baran', 'Dinç', 'Özdemir'
        ];
        
        const randomName = names[Math.floor(Math.random() * names.length)];
        const randomSurname = surnames[Math.floor(Math.random() * surnames.length)];

        await page.click('xpath=/html/body/div[3]/div[2]/div[2]/form/div/div[1]/div[1]/div[2]/input');
        await page.fill('xpath=/html/body/div[3]/div[2]/div[2]/form/div/div[1]/div[1]/div[2]/input', randomName);
        await page.waitForTimeout(1000);

        await page.click('xpath=/html/body/div[3]/div[2]/div[2]/form/div/div[1]/div[2]/div[2]/input');
        await page.fill('xpath=/html/body/div[3]/div[2]/div[2]/form/div/div[1]/div[2]/div[2]/input', randomSurname);
        await page.waitForTimeout(1000);

        // Rastgele e-posta üret
        function generateRandomEmail() {
        const names = ['ali', 'ayse', 'mehmet', 'zeynep', 'berk', 'melis', 'mert', 'gizem', 'onur', 'irem'];
        const domains = ['gmail.com'];

        const name = names[Math.floor(Math.random() * names.length)];
        const number = Math.floor(Math.random() * 10000);
        const domain = domains[Math.floor(Math.random() * domains.length)];

        return `${name}${number}@${domain}`;
        }

        const randomEmail = generateRandomEmail();


        await page.click('xpath=/html/body/div[3]/div[2]/div[2]/form/div/div[2]/div[2]/input');
        await page.fill('xpath=/html/body/div[3]/div[2]/div[2]/form/div/div[2]/div[2]/input', randomEmail);
        await page.waitForTimeout(3000);

        await page.getByText('Select a company', { exact: false }).click();
        await page.waitForTimeout(3000);

        await page.click('xpath=/html/body/div[5]/div[2]');
        await page.waitForTimeout(3000);

        await page.getByText('Select a role', { exact: false }).click();
        await page.waitForTimeout(3000);

        await page.click('xpath=/html/body/div[5]/div[6]');
        await page.waitForTimeout(3000);

        await page.click('xpath=/html/body/div[3]/div[2]/div[2]/form/div/div[5]/button/div');
        await page.waitForTimeout(3000);

        await page.screenshot({ path: 'users.png', fullPage: true });

        await page.mouse.click(1000, 10);
        await page.waitForTimeout(2000);

        // Firmalar
      //   await page.click('xpath=//*[@id="app-container"]/div[2]/div[1]/div/div/div[1]/button[3]')
      //   await page.waitForTimeout(3000);

        
       // await page.click('xpath=//*[@id="app-container"]/div[2]/div[2]/div/div/div[1]/div[1]/div/div/div/button')
       // await page.waitForTimeout(3000);
        
       // await page.click('xpath=/html/body/div[3]/div[2]/div[2]/form/div/div[1]/div[2]/input')
       // await page.waitForTimeout(3000);

       // await page.fill('xpath=/html/body/div[3]/div[2]/div[2]/form/div/div[1]/div[2]/input', 'Sirius Ai Tech Test Deneme');
       // await page.waitForTimeout(3000);

       // await page.click('xpath=/html/body/div[3]/div[2]/div[2]/form/div/div[2]/button/div')
       // await page.waitForTimeout(3000);
            

        } catch (error) {
   console.error('Bir hata oluştu:', error);
   } finally {
   await browser.close();
   }

})();
    
