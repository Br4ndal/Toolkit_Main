
const { dialog } = require('electron');
const { autoUpdater } = require('electron-updater');

autoUpdater.logger = require("electron-log")
autoUpdater.logger.transports.file.level = "info"

autoUpdater.disableWebInstaller = true
autoUpdater.autoDownload = false
module.exports = () => {
    
    console.log("checking for updates");
    autoUpdater.checkForUpdates()

    autoUpdater.on("update-available", () =>{

        dialog.showMessageBox({
            type: "info",
            title: "Update available",
            message: "a new version is now available. Do you want to update now ?",
            buttons: ["Update Now", "Update Later"]
        }).then(result => {
            let buttonIndex = result.response
            if(buttonIndex ===0 ) autoUpdater.downloadUpdate()

        })
    })
    autoUpdater.on("update-downloaded",()=>{
        dialog.showMessageBox({
            type: "info",
            title: "Update available",
            message: "Install and restart now",
            buttons: ["Yes", "Later"]
        }).then(result => {
            let buttonIndex = result.response
            if(buttonIndex ===0 ) autoUpdater.quitAndInstall(false,true)

        })
    })

}

