"use strict";



// document.addEventListener("DOMContentLoaded",function(){
//     window.bridge.updateMessage(updateMessage);
// })

// function updateMessage (event, message){
//     console.log("message logged in view ");
//     let elemE = document.getElementById("message")
//     elemE.innerHTML = message
// }

//console.log(dial.sod.showOpenDialog({ properties: ['openFile', 'multiSelections'] }))
//console.log(dial.sod);
// let files = dial.sod({

//     properties: ["openFile","openDirectory", "multiSelections"]
 
//    }
//  );

// let test1 = ["test123","test"]
let test123 = [
    ["Name"],
    ["Bill Clinton"],
    ["GeorgeW Bush"],
    ["Barack Obama"],
    ["Donald Trump"],
    ["Joseph Biden"]
]
let test1234 = [
    ["Name"],
    ["Bill Clinton"],
    ["GeorgeW Bush"],
    ["Barack Obama"],
    ["Donald Trump"],
    ["Joseph Biden"]
]
let ws = excel.link.utils.aoa_to_sheet(test123, {origin: "A1" });  
const newWB = excel.link.utils.book_new();
excel.link.utils.book_append_sheet(newWB, ws, "Citet_AlarmLink");

let childPros1 = chi.pro.fork("makeXlsxFile.js", [test123,test1234], {cwd: "forkFolder/"})






// // // console.log(fs1.readFile1.readFileSync("C:/Work/- AutoScript/IASProject/Json_files/PumpSetup.json", 'utf-8')); 
// // // let content = fs1.readFile1.readFileSync("C:/Work/- AutoScript/IASProject/Json_files/PumpSetup.json", 'utf-8');
// // fs1.readFile1.writeFile("./file.csv", test2, "utf-8", (error, data) => {
// //     if (error){
// //         console.error("error: " + error);
// //     }
// // });
