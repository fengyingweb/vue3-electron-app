const { contextBridge, ipcRenderer } = require('electron/renderer')

contextBridge.exposeInMainWorld('electronAPI', {
  setRegister: ()=> ipcRenderer.invoke('on-register-event')
})
