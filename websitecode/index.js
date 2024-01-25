"use strict";



// document.addEventListener("DOMContentLoaded",function(){
//     window.bridge.updateMessage(updateMessage);
// })

// function updateMessage (event, message){
//     console.log("message logged in view ");
//     let elemE = document.getElementById("message")
//     elemE.innerHTML = message
// }
let files = dialog1.showOpenDialog1({

    properties: ["openFile","openDirectory", "multiSelections"]
 
   }
 );

//let test2 = ["test123"]
let test123 = [
    ["Name", "Index"],
    ["Bill Clinton", 42],
    ["GeorgeW Bush", 43],
    ["Barack Obama", 44],
    ["Donald Trump", 45],
    ["Joseph Biden", 46]
]

let ws = excel.link.utils.aoa_to_sheet(test123, {origin: "A1" });  
const newWB = excel.link.utils.book_new();
excel.link.utils.book_append_sheet(newWB, ws, "Citet_AlarmLink");
console.log(ws);
excel.link.writeFile(newWB, "C:/Work/- AutoScript/- Files AutoGen/Citect_Alarm_Link.xlsx");

//console.log(dialog1.showOpenDialog1(excel.link.writeFile(newWB, "C:/Work/- AutoScript/- Files AutoGen/Citect_Alarm_Link.xlsx")));



// // console.log(fs1.readFile1.readFileSync("C:/Work/- AutoScript/IASProject/Json_files/PumpSetup.json", 'utf-8')); 
// // let content = fs1.readFile1.readFileSync("C:/Work/- AutoScript/IASProject/Json_files/PumpSetup.json", 'utf-8');
// fs1.readFile1.writeFile("./file.csv", test2, "utf-8", (error, data) => {
//     if (error){
//         console.error("error: " + error);
//     }
// });
