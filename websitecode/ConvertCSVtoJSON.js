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


// btnSendCsvToJson.addEventListener("click", function () {
//     //csvtoJSONFile("C:/Work/- AutoScript/IASProject/IAS_CTRL_Common_Files")

//     chi.pro.fork("makeCSVfileToJson.js", {cwd: "forkFolder/"})
//     amounteOfFiles.length > 0 ?  valueOfJSonFile.innerHTML = `Completed` : valueOfJSonFile.innerHTML = `Problem creating files` 
//     //
// });


const completionCsvToJson = document.getElementById("valueOfJSonFile");
const btnCsvToJson = document.querySelector(".btn--converCsvToJson");



startingNewWorker(btnCsvToJson,"Please waiting converting files to JSON",completionCsvToJson,"makeCSVfileToJson.js");


function writeToDom(text, domVariable) {
    requestAnimationFrame( () => {
        domVariable.innerHTML = text
    })
}

function startingNewWorker (btnName,domText,domTag,programToStart){
    console.log(`This program is ready : ${programToStart}`);
    btnName.addEventListener("click", function () {
        writeToDom(domText,domTag)
        let worker = new Worker(`../forkFolder/${programToStart}`)
        //let sendDataToChild = 
        worker.postMessage("Confirm connection with child process")
        worker.onmessage = function(e){
            console.log(e.data);
            writeToDom(e.data,domTag)
        }
        worker.onerror = (error) =>{
            console.log(`Error : ${error}`);
            console.log(error);
            writeToDom(error.message,domTag)
        }

    });
    

}