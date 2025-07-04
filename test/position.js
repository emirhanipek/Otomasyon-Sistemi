const { login } = require('./login');

(async () => {
  const { browser, page } = await login();

  try {

    // 1. Pozisyonlar sayfasına git
    await page.click('xpath=//*[@id="app"]/div[1]/div[2]/div[1]/a/div/button');
    await page.waitForTimeout(5000);

    // 2. İlk pozisyona tıkla
    await page.click('xpath=//*[@id="app-container"]/div[2]/div/div[1]/div[1]/div/div[1]/button');
    await page.waitForTimeout(5000);

    // Rastgele başlıklar listesi
    const jobTitles = [
   'SOFTWARE ENGINEER TEST E2E',
   'FRONTEND DEVELOPER TEST',
   'BACKEND ENGINEER E2E',
   'QA TESTER AUTOMATION',
   'FULL STACK DEVELOPER TEST'
    ];

    // Rastgele başlık seç
    const randomTitle = jobTitles[Math.floor(Math.random() * jobTitles.length)];

    // Input alanına rastgele başlığı yaz
    await page.getByRole('textbox', { name: 'Job Posting Title' }).fill(randomTitle);
    await page.waitForTimeout(500);

    // 4. Açılır menüye tıkla
    await page.click('xpath=/html/body/div[3]/div[2]/div[2]/div/div[2]/div/div/div/div/div/div[3]/div/div/div/span');
    await page.waitForTimeout(3000);

    // 5. Menuden seçenek seç
    await page.click('xpath=/html/body/div[5]/div[2]');
    await page.waitForTimeout(3000);

    // 6. Tarih seçici inputa tıkla
    await page.click('[data-test-id="dp-input"]');
    await page.waitForTimeout(3000);

    // 7. İleri tarih butonunu bekle ve tıkla
    await page.waitForSelector('xpath=/html/body/div[4]/div/div[2]/div/div/div/div[1]/div/button[2]');
    await page.click('xpath=/html/body/div[4]/div/div[2]/div/div/div/div[1]/div/button[2]');
    await page.waitForTimeout(3000);

    // 8. İstenen tarihi bekle ve seç
    await page.waitForSelector('xpath=/html/body/div[4]/div/div[2]/div/div/div/div[2]/div/div[3]/div[2]/div[7]/div');
    await page.click('xpath=/html/body/div[4]/div/div[2]/div/div/div/div[2]/div/div[3]/div[2]/div[7]/div');
    await page.waitForTimeout(3000);

     // 9. "Bir seçenek seçin" alanına tıkla
    await page.waitForSelector('xpath=/html/body/div[3]/div[2]/div[2]/div/div[2]/div/div/div/div/div/div[5]/div/div/span', { timeout: 10000 });
    await page.click('xpath=/html/body/div[3]/div[2]/div[2]/div/div[2]/div/div/div/div/div/div[5]/div/div/span');
    await page.waitForTimeout(3000);

    // 10. Açılan menüden ilk öğeyi seç
    await page.waitForSelector('xpath=/html/body/div[5]/div[2]', { timeout: 10000 });
    await page.click('xpath=/html/body/div[5]/div[2]');
    await page.waitForTimeout(3000);

    // 11. İlan türün alanına tıkla
    await page.waitForSelector('xpath=/html/body/div[3]/div[2]/div[2]/div/div[2]/div/div/div/div/div/div[6]/div/div/span', { timeout: 10000 });
    await page.click('xpath=/html/body/div[3]/div[2]/div[2]/div/div[2]/div/div/div/div/div/div[6]/div/div/span');
    await page.waitForTimeout(3000);

    // 12. Açılan menüden öğeyi seç
    await page.waitForSelector('xpath=/html/body/div[5]/div[2]', { timeout: 10000 });
    await page.click('xpath=/html/body/div[5]/div[2]');
    await page.waitForTimeout(3000);

    // 13. Pozisyon açıklaması alanına tıkla
    await page.click('xpath=/html/body/div[3]/div[2]/div[2]/div/div[2]/div/div/div/div/div/div[7]/div/div[2]/input');
    await page.waitForTimeout(1000);
    await page.fill('xpath=/html/body/div[3]/div[2]/div[2]/div/div[2]/div/div/div/div/div/div[7]/div/div[2]/input', '2');
    await page.waitForTimeout(3000);

   // 14. Pozisyon sorumluları
    await page.waitForSelector('xpath=/html/body/div[3]/div[2]/div[2]/div/div[2]/div/div/div/div/div/div[8]/div/div/span', { timeout: 10000 });
    await page.click('xpath=/html/body/div[3]/div[2]/div[2]/div/div[2]/div/div/div/div/div/div[8]/div/div/span');
    await page.waitForTimeout(3000);

    // Açılır menüden öğeyi seç (örnek: Uzaktan)
    await page.waitForSelector('xpath=/html/body/div[5]/div[4]/span', { timeout: 10000 });
    await page.click('xpath=/html/body/div[5]/div[4]/span');
    await page.waitForTimeout(3000);

    // Dropdown kapansın diye boş bir alana tıkla (örneğin sağ üst köşe)
    await page.mouse.click(1000, 10);  // 
    await page.waitForTimeout(2000);


    // 15. Çalışma modeli alanına tıkla 
    await page.waitForSelector('xpath=/html/body/div[3]/div[2]/div[2]/div/div[2]/div/div/div/div/div/div[9]/div/div/span', { timeout: 10000 });
    await page.click('xpath=/html/body/div[3]/div[2]/div[2]/div/div[2]/div/div/div/div/div/div[9]/div/div/span');
    await page.waitForTimeout(3000);

    // Açılan seçeneklerden biri tıklanır 
    await page.waitForSelector('xpath=/html/body/div[5]/div[4]/span', { timeout: 10000 });
    await page.click('xpath=/html/body/div[5]/div[4]/span');
    await page.waitForTimeout(3000);


    await page.waitForSelector('xpath=/html/body/div[3]/div[2]/div[3]/div/div[2]/div/div[1]/button/div', { timeout: 10000 });
    await page.click('xpath=/html/body/div[3]/div[2]/div[3]/div/div[2]/div/div[1]/button/div');
    await page.waitForTimeout(3000);

    // 16. Eğitim seviyesi
    await page.waitForSelector('xpath=/html/body/div[3]/div[2]/div[2]/div/div[2]/div/div/div/div/div/div[1]/div/div/span', { timeout: 10000 });
    await page.click('xpath=/html/body/div[3]/div[2]/div[2]/div/div[2]/div/div/div/div/div/div[1]/div/div/span');
    await page.waitForTimeout(3000);

    await page.waitForSelector('xpath=/html/body/div[5]/div[5]', { timeout: 10000 });
    await page.click('xpath=/html/body/div[5]/div[5]');
    await page.waitForTimeout(3000);

    await page.mouse.click(1000, 10);  
    await page.waitForTimeout(2000);

     // 16. Okul
    await page.waitForSelector('xpath=/html/body/div[3]/div[2]/div[2]/div/div[2]/div/div/div/div/div/div[2]/div/div/span', { timeout: 10000 });
    await page.click('xpath=/html/body/div[3]/div[2]/div[2]/div/div[2]/div/div/div/div/div/div[2]/div/div/span');
    await page.waitForTimeout(3000);

    await page.click('xpath=/html/body/div[5]/div[1]/div/input');
    await page.waitForTimeout(1000);
    await page.fill('xpath=/html/body/div[5]/div[1]/div/input', 'Beykent University');
    await page.waitForTimeout(3000);

    // Açılan önerilerden Beykent University yazan elemana tıkla
    await page.click('text="Beykent University"');
    await page.waitForTimeout(3000);

    await page.mouse.click(1000, 10);  
    await page.waitForTimeout(2000);

    await page.waitForSelector('xpath=/html/body/div[3]/div[2]/div[2]/div/div[2]/div/div/div/div/div/div[3]/div/div/span');
    await page.click('xpath=/html/body/div[3]/div[2]/div[2]/div/div[2]/div/div/div/div/div/div[3]/div/div/span');
    await page.waitForTimeout(3000);

    await page.click('xpath=/html/body/div[5]/div[1]/div/input');
    await page.waitForTimeout(1000);
    await page.fill('xpath=/html/body/div[5]/div[1]/div/input', 'Computer Engineering');
    await page.waitForTimeout(3000);

    await page.click('text="Computer Engineering"');
    await page.waitForTimeout(3000);

    await page.mouse.click(1000, 10);  
    await page.waitForTimeout(2000);


    const box = await page.$('xpath=/html/body/div[3]/div[2]/div[2]/div/div[2]/div/div/div/div/div/div[6]/div/div/div[1]/div[2]/div/div/div[3]/div[1]');

    if (box) {
    const boxBounding = await box.boundingBox();

    if (boxBounding) {
    const { x, y, width, height } = boxBounding;

    // Orta noktaya tıklayıp sağa sürükle
    await page.mouse.move(x + width / 2, y + height / 2);
    await page.mouse.down(); // basılı tut
    await page.mouse.move(x + width / 2 + 20, y + height / 2, { steps: 20 }); // sağa doğru 20px sürükle
    await page.mouse.up(); // bırak
    } else {
    console.log("Elementin konumu alınamadı.");
    }
    } else {
    console.log("Element bulunamadı.");
    }

   await page.waitForTimeout(5000);

   await page.waitForSelector('xpath=/html/body/div[3]/div[2]/div[3]/div/div[2]/div/div[1]/button/div', { timeout: 10000 });
   await page.click('xpath=/html/body/div[3]/div[2]/div[3]/div/div[2]/div/div[1]/button/div');
   await page.waitForTimeout(5000);


   await page.getByRole('textbox', { name: 'Add keyword (Press enter to add)' }).click();
   await page.waitForTimeout(5000)

   await page.getByRole('textbox', { name: 'Add keyword (Press enter to add)' }).fill('php');
   await page.waitForTimeout(5000)

   await page.getByRole('textbox', { name: 'Add keyword (Press enter to add)' }).press('Enter');
   await page.waitForTimeout(500)

   await page.getByRole('textbox', { name: 'Add keyword (Press enter to add)' }).click();
   await page.waitForTimeout(5000)

   await page.getByRole('textbox', { name: 'Add keyword (Press enter to add)' }).fill('JavaScript');
   await page.waitForTimeout(5000)

   await page.getByRole('textbox', { name: 'Add keyword (Press enter to add)' }).press('Enter');
   await page.waitForTimeout(500)

   await page.getByRole('textbox', { name: 'Add keyword (Press enter to add)' }).click();
   await page.waitForTimeout(5000)

   await page.getByRole('textbox', { name: 'Add keyword (Press enter to add)' }).fill('sql');
   await page.waitForTimeout(5000)

   await page.getByRole('textbox', { name: 'Add keyword (Press enter to add)' }).press('Enter');
   await page.waitForTimeout(1000)

   await page.getByRole('textbox', { name: 'Add skill (Press enter to add)' }).fill('liderlik');
   await page.waitForTimeout(1000)

   await page.getByRole('textbox', { name: 'Add skill (Press enter to add)' }).press('Enter');
   await page.waitForTimeout(1000)

   await page.getByRole('textbox', { name: 'Add skill (Press enter to add)' }).fill('yonetim');
   await page.waitForTimeout(1000)

   await page.getByRole('textbox', { name: 'Add skill (Press enter to add)' }).press('Enter');
   await page.waitForTimeout(1000)

   await page.getByRole('textbox', { name: 'Add skill (Press enter to add)' }).fill('iş gücü');
   await page.waitForTimeout(1000)
 
   await page.getByRole('textbox', { name: 'Add skill (Press enter to add)' }).press('Enter');
   await page.waitForTimeout(3000)

   
   await page.locator('div').filter({ hasText: /^Select an option$/ }).click();
   await page.waitForTimeout(3000)

   await page.waitForSelector('xpath=/html/body/div[5]/div[3]/span', { timeout: 10000 });
   await page.click('xpath=/html/body/div[5]/div[3]/span');
   await page.waitForTimeout(3000)


   await page.waitForSelector('text="Save"', { timeout: 10000 });
   await page.click('text="Save"');
   await page.waitForTimeout(2000)
    
   // Ekran görüntüsünü al ve kaydet
   await page.screenshot({ path: 'postion.png' });



  
 


   } catch (error) {
   console.error('Bir hata oluştu:', error);
   } finally {
   await browser.close();
   }
})();
