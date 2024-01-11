const { LOAD_URL } = require('../config.js')
const path = require('path')
const isDev = require('electron-is-dev')
const registerWinURL = isDev? `http://localhost:3002/#/register` : `${LOAD_URL}#register`;

const createRegisterWindow=(BrowserWindow)=>{
    const win = new BrowserWindow({
        width: 600,
        height: 740,
        transparent: true,
        backgroundColor: '#000000',
        focusable: true,
        show: false,
        frame: false,
        resizable: false,
        icon: path.join(process.cwd(), '/src/assets/logo.png'),
        webPreferences: {
          preload: path.resolve(__dirname, '../preload/register.js')
        }
    })
    // 加载页面地址 线上内网可切换地址
    win.loadURL(registerWinURL)
    //开发者工具
    if (isDev) {
      win.webContents.openDevTools()
    }
    // 优雅打开界面
    win.on('ready-to-show',()=>{
        win.show()
    })

}

module.exports={
    createRegisterWindow
}
