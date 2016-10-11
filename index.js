const electron = require('electron')
const { app, BrowserWindow } = electron

const isDevelopment = process.env.NODE_ENV === 'development'

// live reload w/hard reset
if (isDevelopment) {
  require('electron-reload')(__dirname, {
    electron: require('electron-prebuilt')
  })
}

// menubar
const menubar = require('menubar')

// init menubar
const mb = menubar({ icon: `${__dirname}/static/img/icon.png` })

mb.on('ready', function ready () {
  console.log('app is ready')
  // your app code here
})

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win

function createWindow() {

  // only for debugging
  if (!isDevelopment) return

  // Create the browser window.
  win = new BrowserWindow({width: 400, height: 300, icon: `${__dirname}/static/img/icon.png` })

  // and load the index.html of the app.
  win.loadURL(`file://${__dirname}/index.html`)

  // Open the DevTools.
  win.webContents.openDevTools()

  // init React DevTools
  // BrowserWindow.addDevToolsExtension('~/Library/Application\ Support/Google/Chrome/Default/Extensions/fmkadmapgofadopljbjfkapdkoienihi/0.14.11_0')

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})
