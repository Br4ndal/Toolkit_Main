
"use strict";

const btnSendFileMaker1 = document.querySelector(".btn--fileMaker");
btnSendFileMaker1.addEventListener("click", function () {
    mapMaker()
  });
  

function mapMaker(){
    let dir = "C:/Work/- AutoScript"
    if(!fs1.readFile1.existsSync(dir)){
        fs1.readFile1.mkdirSync(dir)
        document.getElementById("firstFileWork").innerHTML = "C:/Work/- AutoScript/ created";
    }else if(dir === dir){
        document.getElementById("firstFileWork").innerHTML = "File exist";
    }else{
        document.getElementById("firstFileWork").innerHTML = "ERROR - file not created";
    }

    let dir6 = "C:/Work/- AutoScript/IASProject"
    if(!fs1.readFile1.existsSync(dir6)){
        fs1.readFile1.mkdirSync(dir6)
    } 
    

    let dir2 = "C:/Work/- AutoScript/IASProject/IAS_CTRL_Common_Files"
    let dir3 = "C:/Work/- AutoScript/IASProject/Citect_Project" // unzipped version
    let dir4 = "C:/Work/- AutoScript/IASProject/Json_files"
    if(!fs1.readFile1.existsSync(dir2)){
        fs1.readFile1.mkdirSync(dir2)
        fs1.readFile1.mkdirSync(dir3)
        fs1.readFile1.mkdirSync(dir4)
        document.getElementById("secondFileWork").innerHTML = "C:/Work/- AutoScript/ created";
    }else if(dir2 == dir2 && dir3 == dir3 && dir4 == dir4 ){
        document.getElementById("secondFileWork").innerHTML = "File exist";
    }else{
        document.getElementById("secondFileWork").innerHTML = "ERROR - file not created";
    }

    let dir5 = "C:/Work/- AutoScript/- Files AutoGen"
    if(!fs1.readFile1.existsSync(dir5)){
        fs1.readFile1.mkdirSync(dir5)
        document.getElementById("thridFileWork").innerHTML = "C:/Work/- AutoScript/ created";
    }else if(dir5 === dir5){
        document.getElementById("thridFileWork").innerHTML = "File exist";
    }else{
        document.getElementById("thridFileWork").innerHTML = "ERROR - file not created ";
    }
}