// Modules
'use strict';
const path = require("path");
const {app, BrowserWindow, Menu, dialog,ipcMain,Tray} = require('electron')
const {autoUpdater, AppUpdater} = require("electron-updater")

//Library's 
autoUpdater.setFeedURL('https://github.com/Br4ndal/App_release')


const { updateElectronApp, UpdateSourceType } = require('update-electron-app')
updateElectronApp()
autoUpdater.autoDownload = false
autoUpdater.autoInstallOnAppQuit = true

//process.env.NODE_ENV = "production"
const isMac =process.platform === "darwin"
const isDev = process.env.NODE_ENV  !== "production"  // this is to add console to the runable file

console.log(process.env.NODE_ENV )
setTimeout(() => {
  console.log("check if app ready:" + app.isReady());
}, 2000);

function createAboutWindow (){
  const aboutWindow = new BrowserWindow({
    width: isDev ? 100: 180,
    height: isDev ? 100: 100,
    title:"IAS Toolkit"
  })

  if(isDev){
    mainWindow.webContents.openDevTools();
  }

  aboutWindow.loadFile(path.join(__dirname,"./renderer/cabinetCalc.html"))
}

function createMainWindow(){
  const mainWindow = new BrowserWindow({
    width: isDev ? 1250: 1280,
    height: isDev ? 800: 800,
    title:"IAS Toolkit",
    icon: path.join(__dirname + '/images/Vard_Langsten_logo.JPG',),
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: true,  // was true 
      sandbox: false,
      preload: path.join(__dirname, 'preload.js')
    }
  })

  if(isDev){
    mainWindow.webContents.openDevTools();
  }

  mainWindow.loadFile(path.join(__dirname,"./renderer/index.html"))
}

Menu.setApplicationMenu(null)
//app.on("ready")


app.whenReady().then(()=>{
  createMainWindow()
  /*const mainMenu = Menu.buildFromTemplet(menu)
  Menu.setApplicationMenu(mainMenu)*/

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createMainWindow()
     
    }
  })
  console.log(autoUpdater.currentVersion);
  autoUpdater.checkForUpdates()
  //curWindow.showmessage(`Checking for updates. Current version ${app.getVersion()}`)
})
//console.log(autoUpdater.currentVersion);
autoUpdater.on('update-available', () => {
  // An update has been found, notify the user and download the update
  console.log("update-available");
  dialog.showMessageBox({
    type: 'info',
    title: 'Update Available',
    message: 'A new version of the app is available. Would you like to update now?'
  })
  autoUpdater.downloadUpdate()
})

autoUpdater.on('update-downloaded', () => {
  // The update has been downloaded, notify the user and quit the app to install the update
  console.log("update-downloaded");
  dialog.showMessageBox({
    type: 'info',
    title: 'Update Downloaded',
    message: 'A new version of the app has been downloaded. The app will now quit to install the update.'
  })
  app.quit()
})

setInterval(() => {
  console.log("checking for updates in main.js.....");
  autoUpdater.checkForUpdates()
  updateElectronApp()
}, 10000)

autoUpdater.on('error', (message) => {
  console.error('There was a problem updating the application')
  console.error(message)
})
/*New Update Available*/
// autoUpdater.on("update-available", (info) => {
//   curWindow.showMessage(`Update available. Current version ${app.getVersion()}`);
//   let pth = autoUpdater.downloadUpdate();
//   curWindow.showMessage(pth);
// });

// autoUpdater.on("update-not-available", (info) => {
//   curWindow.showMessage(`No update available. Current version ${app.getVersion()}`);
// });

// /*Download Completion Message*/
// autoUpdater.on("update-downloaded", (info) => {
//   curWindow.showMessage(`Update downloaded. Current version ${app.getVersion()}`);
// });

// autoUpdater.on("error", (info) => {
//   curWindow.showMessage(info);
// });
/*New Update Available  end*/




//menu template SJÅ PÅ DETTE SEINARE!!!!
const menu = [
  ...(isMac ? [{
    label: app.name,
    submenu:[{
      label:"About"
    }]
  }]:[

  ]),
  {
  label: "FilesS",
  submenu:[{
    label: "Quit",
    click: ()=> app.quit(),
    accelerator: "CTRL+W"
  },...(!isMac?[{
    label:"Help",
    submenu:[{
      label:"about",
      click: createAboutWindow,
    }]
  }]:[])
]
  
}
]

app.on("window-all-closed",()=>{
  if(!isMac){
    app.quit();
  }
})

/*New Update Available*/
