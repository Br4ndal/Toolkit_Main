"use strict";

//const valueOfJSonFile = document.getElementById("valueOfJSonFile")
const btnSendCsvToJson = document.querySelector(".btn--converCsvToJson");
const btnclearOldJsonFiles = document.querySelector(".btn--clearOldJsonFiles");
const fileLocation = "C:/Work/- AutoScript/IASProject/Json_files"
let amounteOfFiles = fs1.readFile1.readdirSync(fileLocation)


btnclearOldJsonFiles.addEventListener("click", ()=>{
  for(let i = 0; i <=  amounteOfFiles.length -1; i++){
    fs1.readFile1.unlinkSync(`C:/Work/- AutoScript/IASProject/Json_files/${amounteOfFiles[i]}`)
    amounteOfFiles.length < 1 ?  valueOfJSonFile.innerHTML = `Files not deleted` : valueOfJSonFile.innerHTML = `Files deleted` 
  }
})


btnSendCsvToJson.addEventListener("click", function () {
    //csvtoJSONFile("C:/Work/- AutoScript/IASProject/IAS_CTRL_Common_Files")

    chi.pro.fork("makeCSVfileToJson.js", {cwd: "forkFolder/"})
    amounteOfFiles.length > 0 ?  valueOfJSonFile.innerHTML = `Completed` : valueOfJSonFile.innerHTML = `Problem creating files` 
    //
});

