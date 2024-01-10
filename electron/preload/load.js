const { contextBridge, ipcRenderer } = require('electron/renderer')
contextBridge.exposeInMainWorld('electronAPI', {
    isShowLogin: (isShow)=> ipcRenderer.invoke('on-isshowlogin-event', isShow)
})
