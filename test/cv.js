const { login } = require('./login');
const path = require('path');

(async () => {
  const { browser, page } = await login();

  // CV yükleme sayfasına git
  await page.click('xpath=//*[@id="app"]/div[1]/div[2]/div[2]/a/div/button');
  await page.waitForTimeout(5000);

  // Dosyayı yükle
  const filePath = path.resolve(__dirname, 'CV.pdf');
  const fileInput = await page.waitForSelector('xpath=//input[@type="file"]', { state: 'attached' });
  await fileInput.setInputFiles(filePath);

  await page.waitForTimeout(4000);

  // İstersen ekran görüntüsü al
  await page.screenshot({ path: 'cv_upload_success.png', fullPage: true });

  // 4 saniye bekle
  await page.waitForTimeout(4000);

  await browser.close();
})();
