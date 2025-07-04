const { chromium } = require('playwright');

async function login() {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  await page.goto('https://portal.cvus.app/');
  await page.waitForTimeout(5000);

  await page.fill('xpath=//*[@id="app-container"]/div/div[2]/div[1]/form/div[1]/div[2]/input', 'melih.demir@gmail.com');
  await page.waitForTimeout(5000);

  await page.fill('xpath=//*[@id="app-container"]/div/div[2]/div[1]/form/div[2]/div[2]/input', 'Melih.demir@12');
  await page.waitForTimeout(5000);

  await page.click('xpath=//*[@id="app-container"]/div/div[2]/div[1]/form/div[4]/button');
  await page.waitForTimeout(5000);

  return { browser, page };
}

module.exports = { login };
