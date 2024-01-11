const { LOAD_URL } = require('../config.js')
const path = require('node:path')
const isDev = require('electron-is-dev')
//客户端尺寸位置记忆插件
const windowStateKeeper = require('electron-window-state')
const mainWinURL = isDev ? `http://localhost:3002/#/` : `${LOAD_URL}#`;

const createMainWindow=(BrowserWindow, nativeTheme)=>{
    // 默认窗口尺寸
    let mainWindowState = windowStateKeeper({
        defaultWidth: 1000,
        defaultHeight: 800
    });
    const win = new BrowserWindow({
        x: mainWindowState.x,
        y: mainWindowState.y,
        width: mainWindowState.width,
        height: mainWindowState.height,
        focusable: true,
        show: false,
        frame: false,
        icon: path.join(process.cwd(), '/src/assets/logo.png'),
        webPreferences: {
            preload: path.resolve(__dirname, '../preload/index.js')
        }
    })
    // 加载页面地址 线上内网可切换地址
    win.loadURL(mainWinURL)
    // 管理客户端尺寸位置记忆插件
    mainWindowState.manage(win);
    // 开发者工具
    if (isDev) {
      win.webContents.openDevTools()
    }
    // 优雅打开界面
    win.on('ready-to-show',()=>{
        win.show()
        win.webContents.send('on-get-theme', nativeTheme.shouldUseDarkColors)
    })
    global.mainWindow = win
}

module.exports={
    createMainWindow
}
