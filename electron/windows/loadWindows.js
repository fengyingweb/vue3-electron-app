const { LOAD_URL } = require('../config.js')
const path = require('node:path')
const isDev = require('electron-is-dev')
// const loadWinURL = process.env.NODE_ENV !== 'development' ? `${process.env['VITE_DEV_SERVER_URL']}#/load`
//         : `${LOAD_URL}#load`;
const loadWinURL = isDev ? 'http://localhost:3002/#/load' : `${LOAD_URL}#load`
console.log(loadWinURL)
const createLoadWindow = (BrowserWindow)=>{
    const win = new BrowserWindow({
        width: 480,
        height: 310,
        focusable: true,
        transparent: true,
        backgroundColor: '#000000',
        show: false,
        frame: false,
        resizable: false,
        icon: path.join(process.cwd(), '/src/assets/logo.png'),
        webPreferences: {
            preload: path.resolve(__dirname, '../preload/load.js')
        }
    })
    console.log('中文')
    win.loadURL(`${loadWinURL}`)
    win.on('ready-to-show',()=>{
        win.show()
    })
}

module.exports = {
    createLoadWindow
}
