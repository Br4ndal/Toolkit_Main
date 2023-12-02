
"use strict";

const fs = require("fs")

console.log(fs)
let dir = "C:/Work/- AutoScript/IAS_proj"
if(!fs.existsSync(dir)){
    fs.mkdirSync(dir)
}


let dir2 = "C:/Work/- AutoScript/IAS_proj/IAS_CTRL_Common_Files"
let dir3 = "C:/Work/- AutoScript/IAS_proj/Citect_Project" // unzipped version
let dir4 = "C:/Work/- AutoScript/IAS_proj/Json_files"
if(!fs.existsSync(dir2)){
    fs.mkdirSync(dir2)
    fs.mkdirSync(dir3)
    fs.mkdirSync(dir4)
}

let dir5 = "C:/Work/- AutoScript/- Files AutoGen"
if(!fs.existsSync(dir5)){
    fs.mkdirSync(dir5)

}