// Modules
'use strict';
const path = require("path");
const {app, BrowserWindow, Menu, dialog,ipcMain,Tray} = require('electron')
const {autoUpdater, AppUpdater} = require("electron-updater")
//Library's 

const XLSX = require("xlsx");
const fs = require(`fs`);
const csvToJson = require('csvtojson');

const folderOpen = require("child_process")
/*
autoUpdater.autoDownload = false
autoUpdater.autoInstallOnAppQuit = true
*/
//process.env.NODE_ENV = "production"
const isMac =process.platform === "darwin"
const isDev = process.env.NODE_ENV !== "production"

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
      nodeIntegration: true,
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
//autoUpdater.checkForUpdates()

})

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