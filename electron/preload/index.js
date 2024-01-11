const { contextBridge, ipcRenderer } = require('electron/renderer')

contextBridge.exposeInMainWorld('electronAPI', {
  versions: {
    chrome: process.versions.chrome,
    electron: process.versions.electron,
    node: process.versions.node,
  },
  setTitle: (title)=> ipcRenderer.send('set-title', title), // 渲染进程发送消息给主进程
  openFile: ()=> ipcRenderer.invoke('dialog:openFile'),
  openByBrowser: (url)=> ipcRenderer.invoke('on-useOpenByBrowser-event', url), // 双向通信 浏览器打开页面
  toggleTheme: ()=> ipcRenderer.invoke('dark-mode:toggle'), // 切换界面主题
  systemTheme: ()=> ipcRenderer.invoke('dark-mode:system'),
  getTheme: (callback)=> ipcRenderer.on('on-get-theme', (_event, value)=> callback(value)), // 获取系统主题
  setScreen: (value)=> ipcRenderer.invoke('on-setScreen-event', value), // 页面全屏 缩小 关闭
  shortcut: (callback)=> ipcRenderer.on('on-shortcut-event', (_event, value)=> callback(value))
})
