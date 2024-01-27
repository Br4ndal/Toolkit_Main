"use strict";
const XLSX = require("xlsx")

let data = process.argv.slice(2);

let ws = XLSX.utils.aoa_to_sheet(arrayFliperRowtoColumn(data[0].split(",")), {origin: "A1" });
XLSX.utils.sheet_add_aoa(ws,arrayFliperRowtoColumn(data[1].split(",")), {origin: "A102" });
XLSX.utils.sheet_add_aoa(ws,arrayFliperRowtoColumn(data[2].split(",")), {origin: "A202" });
XLSX.utils.sheet_add_aoa(ws,arrayFliperRowtoColumn(data[3].split(",")), {origin: "B1" });
XLSX.utils.sheet_add_aoa(ws,arrayFliperRowtoColumn(data[4].split(",")), {origin: "B102" });
XLSX.utils.sheet_add_aoa(ws,arrayFliperRowtoColumn(data[5].split(",")), {origin: "B202" })
XLSX.utils.sheet_add_aoa(ws,arrayFliperRowtoColumn(data[6].split(",")), {origin: "C1" });
XLSX.utils.sheet_add_aoa(ws,arrayFliperRowtoColumn(data[7].split(",")), {origin: "C102" });
XLSX.utils.sheet_add_aoa(ws,arrayFliperRowtoColumn(data[8].split(",")), {origin: "D1" });
XLSX.utils.sheet_add_aoa(ws,arrayFliperRowtoColumn(data[9].split(",")), {origin: "D102" });

XLSX.utils.sheet_add_aoa(ws,arrayFliperRowtoColumn(data[10].split(",")), {origin: "E1" });
XLSX.utils.sheet_add_aoa(ws,arrayFliperRowtoColumn(data[11].split(",")), {origin: "E202" });
//XLSX.utils.sheet_add_aoa(ws,arrayFliperRowtoColumn(data[12].split(",")), {origin: "F1" }); 


const newWB = XLSX.utils.book_new();

XLSX.utils.book_append_sheet(newWB, ws, "TankDesc");
XLSX.writeFile(newWB, "C:/Work/- AutoScript/- Files AutoGen/TankDesc.csv");
console.log(`Completed`);



function arrayFliperRowtoColumn(array, value) {
    const addressObjecToArray = Object.values(array);
    const result = Object.keys(addressObjecToArray).map((key) => [
      addressObjecToArray[key],
    ]);
    
    // returns value of hardwired to an object and i convert to column
    if (value === "1"){
    let worksheet = 
      result.map(function (v) {
        return [JSON.stringify(v)];
    });
    return worksheet;
    }else {
        let worksheet = 
        result.map(function (v) {
          return [v];
      });
      return worksheet;
    }
}