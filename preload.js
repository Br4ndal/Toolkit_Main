'use strict';

const os = require("os")
const path = require("path")
const fs = require('fs')
const excel4node1 = require("excel4node")
// const csvToJson = require('csvtojson');
const papa = require("papaparse")
const XLSX = require("xlsx") //const {readFile,utils} = require("xlsx")
const {cpus, totalmem} = require("os")
const { contextBridge, ipcRenderer,dialog } = require('electron')
const cp = require("child_process")
const {fork} = require("child_process")
// const {autoUpdater, AppUpdater} = require("electron-updater")
let csvToJson = require('convert-csv-to-json');
const process =require("process")
const pathNode = require('node:path'); 
// contextBridge.exposeInMainWorld("autoS",{
//     autoS1: autoUpdater,
// })
contextBridge.exposeInMainWorld("pathNode",{
    node: pathNode,
})
contextBridge.exposeInMainWorld("process",{
    argv: process.argv,
    execPath : process.execPath,
    resourcesPath : process.resourcesPath,

})
contextBridge.exposeInMainWorld("Conv",{
    ctj :csvToJson,
})
contextBridge.exposeInMainWorld("chi",{
    pro: cp,
    test1 : fork,
})


contextBridge.exposeInMainWorld("dial",{
    sod : dialog,//(method, config) => ipcRenderer.invoke('dialog', method, config)
})
contextBridge.exposeInMainWorld('os', {
    homedir: () => os.homedir(),
})

contextBridge.exposeInMainWorld('path', {
    join: (...args) => path.join(...args),
    __dirname: path,
    delimiter: path.delimiter,
})

contextBridge.exposeInMainWorld("fs1",{
    readFile1 : fs,
})

contextBridge.exposeInMainWorld("pepe",{
    p:  papa,
})

// contextBridge.exposeInMainWorld("csv1",{
//     jsonConv : csvToJson,
// })

contextBridge.exposeInMainWorld('excel', {
    link : XLSX, 
    // pikk3 : XLSX.utils(),   
})

contextBridge.exposeInMainWorld("ex",{
    node: excel4node1,
})
contextBridge.exposeInMainWorld("CPU", {
    cpu: cpus(),
    getMemory : () => totalmem(),
})


// let bridge = {
//     UpdateMessage: (callback) => ipcRenderer.on("UpdateMessage", callback),
// }

// contextBridge.exposeInMainWorld("bridge",bridge)