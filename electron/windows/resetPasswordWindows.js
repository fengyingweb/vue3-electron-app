const { LOAD_URL }= require('../config.js')
const path = require('node:path')
const isDev = require('electron-is-dev')
const resetPasswordWinURL =  isDev? `http://localhost:3002/#/resetPassword` : `${LOAD_URL}#resetPassword`;

const createResetPasswordWindow=(BrowserWindow)=>{
    const win = new BrowserWindow({
        width: 490,
        height: 492,
        transparent: true,
        backgroundColor: '#000000',
        focusable: true,
        show: false,
        frame: false,
        resizable: false,
        icon: path.join(process.cwd(), '/src/assets/logo.png'),
        webPreferences: {
            preload: path.resolve(__dirname, '../preload/resetPassword.js')
        }
    })
    // 加载页面地址 线上内网可切换地址
    win.loadURL(resetPasswordWinURL)
    //开发者工具
    isDev && win.webContents.openDevTools()
    // 优雅打开界面
    win.on('ready-to-show',()=>{
        win.show()
    })

}

module.exports={
    createResetPasswordWindow
}
