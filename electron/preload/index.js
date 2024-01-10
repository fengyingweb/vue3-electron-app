const { contextBridge, ipcRenderer } = require('electron/renderer')

contextBridge.exposeInMainWorld('electronAPI', {
  versions: {
    chrome: process.versions.chrome,
    electron: process.versions.electron,
    node: process.versions.node,
  },
  setTitle: (title)=> ipcRenderer.send('set-title', title), // 渲染进程发送消息给主进程
  openFile: ()=> ipcRenderer.invoke('dialog:openFile'), // 双向通信
  toggleTheme: ()=> ipcRenderer.invoke('dark-mode:toggle'),
  systemTheme: ()=> ipcRenderer.invoke('dark-mode:system')
})
