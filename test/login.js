const { chromium } = require('playwright');

async function login() {
  try {
    console.log('Tarayıcı başlatılıyor...');
    const browser = await chromium.launch({ headless: false });
    const page = await browser.newPage();

    await page.goto('https://portal.softwareoptimize.com/');
    await page.waitForTimeout(2000);

    await page.fill('xpath=//*[@id="app-container"]/div/div[2]/div[1]/form/div[1]/div[2]/input', 'melih.demir@gmail.com');
    await page.waitForTimeout(1000);

    await page.fill('xpath=//*[@id="app-container"]/div/div[2]/div[1]/form/div[2]/div[2]/input', 'Melih.demir@12');
    await page.waitForTimeout(1000);

    await page.click('xpath=//*[@id="app-container"]/div/div[2]/div[1]/form/div[4]/button');
    await page.waitForTimeout(5000);


    console.log('✅ Giriş başarılı');
    // Tarayıcıyı kapatma, kullanacak kişi kapatsın
    return { browser, page };


  } catch (error) {
    console.error('Login fonksiyonunda hata oluştu:', error);
  }
}

module.exports = { login };


if (require.main === module) {
  (async () => {
    const { browser, page } = await login();
    await page.waitForTimeout(5000);
    await browser.close();
  })();
}
