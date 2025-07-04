const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  runTest: (testType) => ipcRenderer.invoke('run-test', testType)
});
