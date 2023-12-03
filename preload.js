'use strict';

const os = require("os")
const path = require("path")
const fs = require('fs')
// const csvToJson = require('csvtojson');
const papa = require("papaparse")
const XLSX = require("xlsx") //const {readFile,utils} = require("xlsx")
const {cpus, totalmem} = require("os")
const { contextBridge } = require('electron')

contextBridge.exposeInMainWorld('os', {
    homedir: () => os.homedir(),
})

contextBridge.exposeInMainWorld('path', {
    join: (...args) => path.join(...args),
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

contextBridge.exposeInMainWorld("CPU", {
    cpu: cpus(),
    getMemory : () => totalmem(),
})
