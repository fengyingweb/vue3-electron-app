const {ipcMain, dialog, shell, nativeTheme} = require('electron')
const  {createMainWindow} = require( '../windows/mainWindows')
const {createLoginWindow} = require('../windows/loginWindows')
const {createRegisterWindow} = require('../windows/registerWindows')
const {createResetPasswordWindow} = require('../windows/resetPasswordWindows')

const settitle = (BrowserWindow)=>{
  ipcMain.on('set-title', (ev, title)=> {
    const webContents = ev.sender
    const win = BrowserWindow.fromWebContents(webContents)
    win.setTitle(title)
  })
}
// 浏览器打开页面
const openByBrowser = ()=>{
    ipcMain.handle('on-useOpenByBrowser-event',(event, url)=>{
       return shell.openExternal(url)
    })
}
// 切换主题
const toggleTheme = ()=> {
  ipcMain.handle('dark-mode:toggle', ()=> {
    if (nativeTheme.shouldUseDarkColors) {
      nativeTheme.themeSource = 'light'
    } else {
      nativeTheme.themeSource = 'dark'
    }
    return nativeTheme.shouldUseDarkColors
  })
}
// 重置主题
const systemTheme = ()=> {
  ipcMain.handle('dark-mode:system', ()=> {
    nativeTheme.themeSource = 'system'
  })
}
// 设置主题
const setTheme = ()=>{
  ipcMain.on('on-set-theme', (ev, theme)=> {
    nativeTheme.themeSource = theme
  })
}

// 打开文件
const openFile = ()=> {
  ipcMain.handle('dialog:openFile', async ()=> {
    const {canceled, filePaths} = await dialog.showOpenDialog({title: '选择文件'})
    if (!canceled) {
      return filePaths[0]
    }
  })
}
// 登录 展示首页
const setlogin = (BrowserWindow)=>{
    ipcMain.handle('on-setlogin-event',(event, value)=>{
        console.log(value)
        const webContents = event.sender
        const win = BrowserWindow.fromWebContents(webContents)
        win.close()
        createMainWindow(BrowserWindow)
        return value
    })
}
// 加载页判断登录或者展示首页
const isShowLogin=(BrowserWindow)=>{
    ipcMain.handle('on-isshowlogin-event',(event, value)=>{
      const webContents = event.sender
      const win = BrowserWindow.fromWebContents(webContents)
      win.close()
      if(value){
        createLoginWindow(BrowserWindow)
      }else{
        createMainWindow(BrowserWindow)
      }
        return '加载完成'
    })
}
// 首页屏幕缩小 放大 关闭控制
const setScreen = (BrowserWindow)=>{
    ipcMain.handle('on-setScreen-event',(event, value)=>{
        const webContents = event.sender
        const win = BrowserWindow.fromWebContents(webContents)
        if(value === 'miniScreen'){
            win.minimize()
        }else if(value === 'fullScreen'){
            if(win.isMaximized()){
                win.restore()
            }else{
                win.maximize()
            }
        }else if(value==='closeScreen'){
          win.close()
        }
        return value
    })
}
// 打开注册页面
const openRegister = (BrowserWindow)=>{
    ipcMain.handle('on-openRegister-event',(event)=>{
        const webContents = event.sender
        const win = BrowserWindow.fromWebContents(webContents)
        win.close()
        createRegisterWindow(BrowserWindow)
        return '打开注册页面'
    })
}
// 注册成功
const setRegister = (BrowserWindow)=>{
    ipcMain.handle('on-register-event',(event)=>{
        const webContents = event.sender
        const win = BrowserWindow.fromWebContents(webContents)
        win.close()
        createLoginWindow(BrowserWindow)
        return '返回登录页面'
    })
}
// 重置密码后返回登录页面
const setBackLogin = (BrowserWindow)=>{
    ipcMain.handle('on-backLogin-event',(event)=>{
        const webContents = event.sender
        const win = BrowserWindow.fromWebContents(webContents)
        win.close()
        createLoginWindow(BrowserWindow)
        return '重置密码后返回登录页面'
    })
}
// 打开重置密码
const openRestPassword = (BrowserWindow)=>{
    ipcMain.handle('on-openRestPassword-event',(event)=>{
        const webContents = event.sender
        const win = BrowserWindow.fromWebContents(webContents)
        win.close()
        createResetPasswordWindow(BrowserWindow)
        return '重置密码后返回登录页面'
    })
}
const initController = (BrowserWindow) => {
    openRestPassword(BrowserWindow)
    setBackLogin(BrowserWindow)
    openRegister(BrowserWindow)
    setRegister(BrowserWindow)
    settitle(BrowserWindow)
    setlogin(BrowserWindow)
    isShowLogin(BrowserWindow)
    setScreen(BrowserWindow)
    toggleTheme()
    systemTheme()
    setTheme()
    openFile()
    openByBrowser()
}

module.exports={
  initController,
}
