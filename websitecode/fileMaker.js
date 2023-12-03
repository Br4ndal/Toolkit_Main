
"use strict";

const btnSendFileMaker = document.querySelector(".btn--send2");
btnSendFileMaker.addEventListener("click", function () {
    mapMaker()
  });
  

function mapMaker(){
    let dir = "C:/Work/- AutoScript"
    if(!fs1.readFile1.existsSync(dir)){
        fs1.readFile1.mkdirSync(dir)
    }

    let dir6 = "C:/Work/- AutoScript/IAS_proj"
    if(!fs1.readFile1.existsSync(dir6)){
        fs1.readFile1.mkdirSync(dir6)
    }

    let dir2 = "C:/Work/- AutoScript/IAS_proj/IAS_CTRL_Common_Files"
    let dir3 = "C:/Work/- AutoScript/IAS_proj/Citect_Project" // unzipped version
    let dir4 = "C:/Work/- AutoScript/IAS_proj/Json_files"
    if(!fs1.readFile1.existsSync(dir2)){
        fs1.readFile1.mkdirSync(dir2)
        fs1.readFile1.mkdirSync(dir3)
        fs1.readFile1.mkdirSync(dir4)
    }

    let dir5 = "C:/Work/- AutoScript/- Files AutoGen"
    if(!fs1.readFile1.existsSync(dir5)){
        fs1.readFile1.mkdirSync(dir5)

    }
}