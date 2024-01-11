const { app, BrowserWindow, ipcMain, dialog, nativeTheme } = require('electron')
const path = require('node:path')
const { initController } =require('./controller/index.js')
const { initTray }=require('./tray/index.js')
const  { createMainWindow }=require( './windows/mainWindows.js')
const { createLoadWindow } = require('./windows/loadWindows.js')
const { createLoginWindow } = require( './windows/loginWindows.js')

// const createWindow = ()=> {
//   const mainWindow = new BrowserWindow({
//     width: 800,
//     height: 600,
//     icon: path.join(__dirname, '../src/assets/logo.png'),
//     webPreferences: {
//       preload: path.join(__dirname, '/preload/index.js')
//     }
//   })

//   // 主进程接收渲染进程消息
//   ipcMain.on('set-title', (ev, title)=> {
//     const webContents = ev.sender
//     const win = BrowserWindow.fromWebContents(webContents)
//     win.setTitle(title)
//   })

//   ipcMain.handle('dialog:openFile', async ()=> {
//     const {canceled, filePaths} = await dialog.showOpenDialog({title: '选择文件'})
//     if (!canceled) {
//       return filePaths[0]
//     }
//   })

//   ipcMain.handle('dark-mode:toggle', ()=> {
//     if (nativeTheme.shouldUseDarkColors) {
//       nativeTheme.themeSource = 'light'
//     } else {
//       nativeTheme.themeSource = 'dark'
//     }
//     return nativeTheme.shouldUseDarkColors
//   })
//   ipcMain.handle('dark-mode:system', ()=> {
//     nativeTheme.themeSource = 'system'
//   })
//   const url = process.env['VITE_DEV_SERVER_URL']
//   if (process.env.NODE_ENV !== 'development') {
//     mainWindow.loadFile(path.join(__dirname, '../dist/index.html'))
//   } else {
//     if (url) {
//       mainWindow.loadURL(`${url}#/load`)
//     } else {
//       mainWindow.loadFile(path.join(__dirname, '../index.html'))
//     }
//   }

//   // 打开开发者工具
//   if (process.env.NODE_ENV === 'development') {
//     mainWindow.webContents.openDevTools()
//   }
//   // console.log(path.dirname(__dirname))
// }

// 这段程序将会在 Electron 结束初始化
// 和创建浏览器窗口的时候调用
// 部分 API 在 ready 事件触发后才能使用。
app.whenReady().then(()=> {
  // 初始化监听事件
  initController(app)
  // 初始化托盘
  initTray()

  // createMainWindow(BrowserWindow)
  createLoadWindow(BrowserWindow)

  app.on('activate', ()=> {
    // 在 macOS 系统内, 如果没有已开启的应用窗口
    // 点击托盘图标时通常会重新创建一个新窗口
    if (BrowserWindow.getAllWindows().length === 0) createLoginWindow(BrowserWindow)
  })
})

// 除了 macOS 外，当所有窗口都被关闭的时候退出程序。 因此, 通常
// 对应用程序和它们的菜单栏来说应该时刻保持激活状态, 
// 直到用户使用 Cmd + Q 明确退出
app.on('window-all-closed', ()=> {
  if (process.platform !== 'darwin') app.quit()
})
