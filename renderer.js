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

// Test geçmişi array'i
const testHistory = [];

// Test geçmişi tabloya yazdırma fonksiyonu (orijinal)
function renderTestHistory() {
  const tbody = document.getElementById('testHistoryBody');
  tbody.innerHTML = '';
  testHistory.slice().reverse().forEach((item, idx) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${testHistory.length - idx}</td>
      <td>${item.name}</td>
      <td class="${item.success ? 'success' : 'error'}">${item.success ? 'Başarılı' : 'Başarısız'}</td>
      <td>${item.duration}s</td>
      <td>${item.time}</td>
      <td><button class="detail-btn" data-idx="${testHistory.length - idx - 1}">Detay</button></td>
    `;
    tbody.appendChild(tr);
  });
  // Detay butonlarına event ekle
  document.querySelectorAll('.detail-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const idx = parseInt(btn.getAttribute('data-idx'));
      showHistoryDetail(idx);
    });
  });
}

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
  let buttonText = '';
  let buttonIcon = '';
  switch (testType) {
    case 'login':
      buttonText = 'Login Testi';
      buttonIcon = '<i class="fas fa-sign-in-alt icon"></i>';
      break;
    case 'cv':
      buttonText = 'CV Yükleme Testi';
      buttonIcon = '<i class="fas fa-file-upload icon"></i>';
      break;
    case 'position':
      buttonText = 'Pozisyon Testi';
      buttonIcon = '<i class="fas fa-briefcase icon"></i>';
      break;
    case 'users':
      buttonText = 'Kullanıcı Testi';
      buttonIcon = '<i class="fas fa-users icon"></i>';
      break;
    case 'roles':
      buttonText = 'Rol Testi';
      buttonIcon = '<i class="fas fa-user-tag icon"></i>';
      break;
    case 'reporting':
      buttonText = 'Raporlama Testi';
      buttonIcon = '<i class="fas fa-chart-bar icon"></i>';
      break;
    default:
      buttonText = 'Test';
      buttonIcon = '<i class="fas fa-play icon"></i>';
  }

  runBtn.innerHTML = `<i class="fas fa-spinner fa-spin icon"></i>${buttonText} Çalışıyor...`;
  console.log(`${testType} testi başlatılıyor...`);
  
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
      
      // Test geçmişine ekle
      testHistory.push({
        name: testType.charAt(0).toUpperCase() + testType.slice(1),
        success: true,
        duration,
        time: new Date().toLocaleString('tr-TR'),
        message: result.message,
        screenshot: null // screenshots array kaldırıldı
      });
      renderTestHistory();
    } else {
      // Hatalı sonuç
      resultContainer.classList.add('result-error');
      resultIcon.className = 'fas fa-exclamation-circle';
      resultTitle.textContent = testType === 'login' ? 'Login Testi Başarısız' : 'CV Testi Başarısız';
      resultBadge.textContent = 'Başarısız';
      resultBadge.className = 'result-badge error';
      statusElement.textContent = 'Başarısız';
      statusElement.style.color = '#ff6b6b';
      // Test geçmişine ekle
      testHistory.push({
        name: testType.charAt(0).toUpperCase() + testType.slice(1),
        success: false,
        duration,
        time: new Date().toLocaleString('tr-TR'),
        message: result.message,
        screenshot: null // screenshots array kaldırıldı
      });
      renderTestHistory();
    }
    
    // Sonuç içeriği ve istatistikleri
    resultContent.textContent = result.message;
    durationElement.textContent = `${duration}s`;
    
    // Buton durumunu sıfırla
    runBtn.disabled = false;
    runBtn.innerHTML = `${buttonIcon}${buttonText}`;
    
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
    runBtn.innerHTML = `${buttonIcon}${buttonText}`;
    // Test geçmişine ekle (catch)
    testHistory.push({
      name: testType.charAt(0).toUpperCase() + testType.slice(1),
      success: false,
      duration: ((Date.now() - testStartTime) / 1000).toFixed(1),
      time: new Date().toLocaleString('tr-TR'),
      message: error.message || 'Bilinmeyen hata',
      screenshot: null // screenshots array kaldırıldı
    });
    renderTestHistory();
  }
}

// Detay modalı göster
function showHistoryDetail(idx) {
  const modal = document.getElementById('historyDetailModal');
  const title = document.getElementById('historyDetailTitle');
  const content = document.getElementById('historyDetailContent');
  const item = testHistory[idx];
  if (!item) return;
  title.textContent = `${item.name} (${item.success ? 'Başarılı' : 'Başarısız'})`;
  content.innerHTML = `
    <b>Test Adı:</b> ${item.name}<br>
    <b>Sonuç:</b> ${item.success ? 'Başarılı' : 'Başarısız'}<br>
    <b>Süre:</b> ${item.duration}s<br>
    <b>Zaman:</b> ${item.time}<br>
    <b>Mesaj:</b> <pre>${item.message}</pre>
    ${item.screenshot ? `<img src='${item.screenshot}' alt='Ekran Görüntüsü' style='max-width:320px;margin-top:12px;border-radius:12px;' />` : ''}
  `;
  modal.classList.add('active');
  modal.style.display = 'block';
}
// Modal kapama
const closeHistoryDetailBtn = document.getElementById('closeHistoryDetailBtn');
const historyDetailModal = document.getElementById('historyDetailModal');
if (closeHistoryDetailBtn && historyDetailModal) {
  function closeHistoryModal() {
    historyDetailModal.classList.remove('active');
    historyDetailModal.style.display = 'none';
  }
  closeHistoryDetailBtn.addEventListener('click', closeHistoryModal);
  closeHistoryDetailBtn.addEventListener('mousedown', closeHistoryModal);
  historyDetailModal.addEventListener('mousedown', (e) => {
    // Sadece modal arka planına tıklanınca kapansın, içeriğe tıklanınca kapanmasın
    if (e.target === historyDetailModal) {
      closeHistoryModal();
    }
  });
  // Modal içeriğine tıklanınca kapanmasın
  const modalContent = document.querySelector('.history-modal-content');
  if (modalContent) {
    modalContent.addEventListener('mousedown', (e) => {
      e.stopPropagation();
    });
  }
  // Escape tuşu ile kapama
  document.addEventListener('keydown', (e) => {
    if (historyDetailModal.classList.contains('active') && (e.key === 'Escape' || e.key === 'Esc')) {
      closeHistoryModal();
    }
  });
}

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

  // Sidebar toggle
  const sidebar = document.getElementById('sidebar');
  const sidebarToggleBtn = document.getElementById('sidebarToggleBtn');
  const sidebarToggleIcon = document.getElementById('sidebarToggleIcon');
  if (sidebar && sidebarToggleBtn && sidebarToggleIcon) {
    sidebarToggleBtn.addEventListener('click', () => {
      sidebar.classList.toggle('closed');
      if (sidebar.classList.contains('closed')) {
        sidebarToggleIcon.classList.remove('fa-chevron-left');
        sidebarToggleIcon.classList.add('fa-chevron-right');
      } else {
        sidebarToggleIcon.classList.remove('fa-chevron-right');
        sidebarToggleIcon.classList.add('fa-chevron-left');
      }
    });
  }
  const closeHistoryDetailBtn = document.getElementById('closeHistoryDetailBtn');
  const historyDetailModal = document.getElementById('historyDetailModal');
  if (closeHistoryDetailBtn && historyDetailModal) {
    closeHistoryDetailBtn.onclick = function() {
      historyDetailModal.classList.remove('active');
      historyDetailModal.style.display = 'none';
    };
  }

  // PDF ile ilgili kodlar kaldırıldı

  const openTestModalBtn = document.getElementById('openTestModalBtn');
  const testModal = document.getElementById('testModal');
  const closeTestModalBtn = document.getElementById('closeTestModalBtn');
  if (openTestModalBtn && testModal) {
    openTestModalBtn.addEventListener('click', () => {
      testModal.classList.add('active');
      testModal.style.display = 'flex';
    });
  }
  if (closeTestModalBtn && testModal) {
    closeTestModalBtn.addEventListener('click', () => {
      testModal.classList.remove('active');
      testModal.style.display = 'none';
    });
    
  }
      document.getElementById('position-recommendedTestBtn').addEventListener('click', async () => {
      console.log('Önerilen Pozisyon test butonu tıklandı, position-recommended.js çalıştırılacak');
      await runTest('position-recommended');
    });

    // renderer.js
document.getElementById('altpositionTestBtn').addEventListener('click', async () => {
  await runTest('altposition', 'Alt Pozisyon Testi');
});
    
    

});
