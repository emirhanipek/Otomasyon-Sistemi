const { app, BrowserWindow, ipcMain } = require('electron');
const { exec } = require('child_process');
const path = require('path');

// Uygulama içi değişkenler
let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 800,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true
    },
    icon: path.join(__dirname, 'temp.svg')
  });

  mainWindow.loadFile('renderer.html');
  
  // Geliştirme aşamasında DevTools'u açmak için yorum satırını kaldırabilirsiniz
  // mainWindow.webContents.openDevTools();
}

app.whenReady().then(() => {
  createWindow();
  
  app.on('activate', function () {
    // macOS için: dock'a tıklandığında pencere yoksa yeniden oluştur
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Windows ve Linux için: tüm pencereler kapatıldığında uygulamadan çık
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});

ipcMain.handle('run-test', async (event, testType) => {
  let scriptFile;
  
  // Test tipine göre çalıştırılacak dosyayı belirle
  switch(testType) {
    case 'login':
      scriptFile = path.join(__dirname, 'test', 'login.js');
      break;
    case 'cv':
      scriptFile = path.join(__dirname, 'test', 'cv.js');
      break;
    case 'position':
      scriptFile = path.join(__dirname, 'test', 'position.js');
      break;
    case 'users':
      scriptFile = path.join(__dirname, 'test', 'users.js');
      break;
    case 'roles':
      scriptFile = path.join(__dirname, 'test', 'roles.js');
      break;
    case 'reporting':
      scriptFile = path.join(__dirname, 'test', 'genelreporting.js');
      break;
    case 'position-recommended':
      scriptFile = path.join(__dirname, 'test', 'position-recommended.js');
      break;
    case 'altposition':
      scriptFile = path.join(__dirname, 'test', 'altposition.js');
      break;
    default:
      return { success: false, message: `Geçersiz test tipi: ${testType}` };
  }
  
  console.log(`${scriptFile} dosyası çalıştırılıyor...`);
  
  return new Promise((resolve) => {
    exec(`node "${scriptFile}"`, { cwd: __dirname }, (error, stdout, stderr) => {
      if (error) {
        console.error(`Hata: ${error.message}`);
        resolve({ success: false, message: stderr || stdout });
      } else {
        console.log(`${scriptFile} başarıyla çalıştırıldı.`);
        resolve({ success: true, message: stdout });
      }
    });
  });
});
