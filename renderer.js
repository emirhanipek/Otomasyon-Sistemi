let testStartTime;
let currentTestType = '';

// Login Test Event Listener - login.js dosyasını çalıştırır
document.getElementById('loginTestBtn').addEventListener('click', async () => {
  console.log('Login test butonu tıklandı, login.js çalıştırılacak');
  await runTest('login');
});

// CV Test Event Listener - cv.js dosyasını çalıştırır
document.getElementById('cvTestBtn').addEventListener('click', async () => {
  console.log('CV test butonu tıklandı, cv.js çalıştırılacak');
  await runTest('cv');
});

// Position Test Event Listener - position.js dosyasını çalıştırır
document.getElementById('positionTestBtn').addEventListener('click', async () => {
  console.log('Pozisyon test butonu tıklandı, position.js çalıştırılacak');
  await runTest('position');
});

// Users Test Event Listener - users.js dosyasını çalıştırır
document.getElementById('usersTestBtn').addEventListener('click', async () => {
  console.log('Kullanıcı test butonu tıklandı, users.js çalıştırılacak');
  await runTest('users');
});

// Roles Test Event Listener - roles.js dosyasını çalıştırır
document.getElementById('rolesTestBtn').addEventListener('click', async () => {
  console.log('Rol test butonu tıklandı, roles.js çalıştırılacak');
  await runTest('roles');
});

// Reporting Test Event Listener - genelreporting.js dosyasını çalıştırır
document.getElementById('reportingTestBtn').addEventListener('click', async () => {
  console.log('Raporlama test butonu tıklandı, genelreporting.js çalıştırılacak');
  await runTest('reporting');
});

async function runTest(testType) {
  currentTestType = testType;
  const runBtn = document.getElementById(testType + 'TestBtn');
  const loading = document.getElementById('loading');
  const resultContainer = document.getElementById('resultContainer');
  const resultIcon = document.getElementById('resultIcon');
  const resultTitle = document.getElementById('resultTitle');
  const resultContent = document.getElementById('resultContent');
  const resultBadge = document.getElementById('resultBadge');
  const durationElement = document.getElementById('duration');
  const statusElement = document.getElementById('status');
  const loginScreenshotSection = document.getElementById('loginScreenshotSection');
  const cvScreenshotSection = document.getElementById('cvScreenshotSection');

  // Test başlatma
  testStartTime = Date.now();
  runBtn.disabled = true;
  
  // Buton metnini güncelle
  if (testType === 'login') {
    runBtn.innerHTML = '<i class="fas fa-spinner fa-spin icon"></i>Login Test Çalışıyor...';
    console.log('Login testi başlatılıyor...');
  } else {
    runBtn.innerHTML = '<i class="fas fa-spinner fa-spin icon"></i>CV Test Çalışıyor...';
    console.log('CV testi başlatılıyor...');
  }
  
  loading.classList.add('active');
  resultContainer.classList.remove('active');
  loginScreenshotSection.style.display = 'none';
  cvScreenshotSection.style.display = 'none';
  
  resultBadge.textContent = 'İşleniyor';
  resultBadge.className = 'result-badge';

  try {
    console.log(`window.electronAPI.runTest('${testType}') çağrılıyor`);
    const result = await window.electronAPI.runTest(testType);
    const duration = ((Date.now() - testStartTime) / 1000).toFixed(1);
    
    console.log(`Test sonucu: ${JSON.stringify(result)}`);
    
    // Loading'i gizle
    loading.classList.remove('active');
    
    // Sonuç konteynerini göster
    resultContainer.classList.remove('result-success', 'result-error');
    resultContainer.classList.add('active');
    
    if (result.success) {
      // Başarılı sonuç
      resultContainer.classList.add('result-success');
      resultIcon.className = 'fas fa-check-circle';
      resultTitle.textContent = testType === 'login' ? 'Login Testi Başarılı' : 'CV Testi Başarılı';
      resultBadge.textContent = 'Başarılı';
      resultBadge.className = 'result-badge success';
      statusElement.textContent = 'Başarılı';
      statusElement.style.color = '#00b894';
      
      // Screenshot'ı göster
      showScreenshot(testType);
    } else {
      // Hatalı sonuç
      resultContainer.classList.add('result-error');
      resultIcon.className = 'fas fa-exclamation-circle';
      resultTitle.textContent = testType === 'login' ? 'Login Testi Başarısız' : 'CV Testi Başarısız';
      resultBadge.textContent = 'Başarısız';
      resultBadge.className = 'result-badge error';
      statusElement.textContent = 'Başarısız';
      statusElement.style.color = '#ff6b6b';
    }
    
    // Sonuç içeriği ve istatistikleri
    resultContent.textContent = result.message;
    durationElement.textContent = `${duration}s`;
    
    // Buton durumunu sıfırla
    runBtn.disabled = false;
    if (testType === 'login') {
      runBtn.innerHTML = '<i class="fas fa-sign-in-alt icon"></i>Login Testi';
    } else {
      runBtn.innerHTML = '<i class="fas fa-file-upload icon"></i>CV Yükleme Testi';
    }
    
  } catch (error) {
    // Hata durumu
    console.error(`Test hatası: ${error.message || error}`);
    
    loading.classList.remove('active');
    resultContainer.classList.remove('result-success');
    resultContainer.classList.add('active', 'result-error');
    
    resultIcon.className = 'fas fa-exclamation-triangle';
    resultTitle.textContent = 'Beklenmeyen Hata';
    resultContent.textContent = `Hata: ${error.message || 'Bilinmeyen hata'}`;
    resultBadge.textContent = 'Hata';
    resultBadge.className = 'result-badge error';
    
    const duration = ((Date.now() - testStartTime) / 1000).toFixed(1);
    durationElement.textContent = `${duration}s`;
    statusElement.textContent = 'Hata';
    statusElement.style.color = '#ff6b6b';
    
    // Buton durumunu sıfırla
    runBtn.disabled = false;
    if (testType === 'login') {
      runBtn.innerHTML = '<i class="fas fa-sign-in-alt icon"></i>Login Testi';
    } else {
      runBtn.innerHTML = '<i class="fas fa-file-upload icon"></i>CV Yükleme Testi';
    }
  }
}

// Screenshot gösterme fonksiyonu
function showScreenshot(testType) {
  let screenshotSection, screenshotImg, imagePath;
  
  console.log(`${testType} testi için ekran görüntüsü gösteriliyor`);
  
  if (testType === 'login') {
    screenshotSection = document.getElementById('loginScreenshotSection');
    screenshotImg = document.getElementById('loginScreenshotImg');
    imagePath = 'logincv.png'; // Login testi ekran görüntüsü
  } else if (testType === 'cv') {
    screenshotSection = document.getElementById('cvScreenshotSection');
    screenshotImg = document.getElementById('cvScreenshotImg');
    imagePath = 'cv_upload_success.png'; // CV testi ekran görüntüsü
  }
  
  if (!screenshotSection || !screenshotImg) {
    console.error('Screenshot elemanları bulunamadı');
    return;
  }
  
  // Timestamp ekleyerek cache'i bypass et
  const timestamp = new Date().getTime();
  screenshotImg.src = `${imagePath}?t=${timestamp}`;
  
  screenshotImg.onload = () => {
    screenshotSection.style.display = 'block';
    screenshotSection.style.animation = 'fadeIn 0.5s ease-out';
    console.log(`${testType} ekran görüntüsü yüklendi`);
  };
  
  screenshotImg.onerror = (e) => {
    console.error(`${testType} screenshot yüklenemedi: ${e}`);
  };
}

// Modal açma fonksiyonu
function openImageModal(testType) {
  const modal = document.getElementById('imageModal');
  const modalImg = document.getElementById('modalImg');
  const modalIcon = document.getElementById('modalIcon');
  const modalTitle = document.getElementById('modalTitle');
  const modalSubtitle = document.getElementById('modalSubtitle');
  
  let screenshotImg;
  
  if (testType === 'login') {
    screenshotImg = document.getElementById('loginScreenshotImg');
    modalIcon.className = 'fas fa-sign-in-alt';
    modalTitle.textContent = 'Login Test Ekran Görüntüsü';
    modalSubtitle.textContent = 'CVUS Portal Login Test';
  } else if (testType === 'cv') {
    screenshotImg = document.getElementById('cvScreenshotImg');
    modalIcon.className = 'fas fa-file-upload';
    modalTitle.textContent = 'CV Test Ekran Görüntüsü';
    modalSubtitle.textContent = 'CV Upload Test';
  }
  
  if (screenshotImg && screenshotImg.src) {
    modalImg.src = screenshotImg.src;
    modal.classList.add('active');
    modal.style.display = 'block';
    
    // Escape tuşu ile kapatma
    document.addEventListener('keydown', handleModalKeydown);
  }
}

// Modal kapatma fonksiyonu
function closeImageModal() {
  const modal = document.getElementById('imageModal');
  modal.classList.remove('active');
  
  setTimeout(() => {
    modal.style.display = 'none';
  }, 300);
  
  document.removeEventListener('keydown', handleModalKeydown);
}

// Modal klavye event handler
function handleModalKeydown(event) {
  if (event.key === 'Escape') {
    closeImageModal();
  }
}

// Sayfa yüklendiğinde butonların varsayılan durumunu ayarla
document.addEventListener('DOMContentLoaded', () => {
  const loginBtn = document.getElementById('loginTestBtn');
  const cvBtn = document.getElementById('cvTestBtn');
  
  [loginBtn, cvBtn].forEach(btn => {
    btn.addEventListener('mouseover', () => {
      if (!btn.disabled) {
        btn.style.transform = 'translateY(-2px)';
      }
    });
    
    btn.addEventListener('mouseout', () => {
      if (!btn.disabled) {
        btn.style.transform = 'translateY(0)';
      }
    });
  });
});
