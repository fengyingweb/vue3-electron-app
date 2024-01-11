const { contextBridge, ipcRenderer } = require('electron/renderer')

contextBridge.exposeInMainWorld('electronAPI', {
  setBackLogin: ()=> ipcRenderer.invoke('on-backLogin-event')
})
