const { contextBridge, ipcRenderer } = require('electron/renderer')

contextBridge.exposeInMainWorld('electronAPI', {
  setLogin: (value)=> ipcRenderer.invoke('on-setlogin-event', value),
  openRegister: ()=> ipcRenderer.invoke('on-openRegister-event'),
  openRestPassword: ()=> ipcRenderer.invoke('on-openRestPassword-event')
})
