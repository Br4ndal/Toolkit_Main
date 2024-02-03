
"use strict";

const XLSX = require("xlsx")
let data = process.argv.slice(2);
console.log(data);


let ws = XLSX.utils.aoa_to_sheet(arrayFliperRowtoColumn(data[0].split(",")), {origin: "A1" });  //data[0].split(",")
// XLSX.utils.sheet_add_aoa(ws,arrayFliperRowtoColumn(data[1].split(",")), {origin: "B1" });
// XLSX.utils.sheet_add_aoa(ws,arrayFliperRowtoColumn(data[2].split(",")), {origin: "D1" });
// XLSX.utils.sheet_add_aoa(ws,arrayFliperRowtoColumn(data[3].split(",")), {origin: "C1" });
// XLSX.utils.sheet_add_aoa(ws,arrayFliperRowtoColumn(data[4].split(",")), {origin: "J1" });
// XLSX.utils.sheet_add_aoa(ws,arrayFliperRowtoColumn(data[5].split(",")), {origin: "K1" });
// XLSX.utils.sheet_add_aoa(ws,arrayFliperRowtoColumn(data[6].split(",")), {origin: "L1" });
// XLSX.utils.sheet_add_aoa(ws,arrayFliperRowtoColumn(data[7].split(",")), {origin: "N1" });
// XLSX.utils.sheet_add_aoa(ws,arrayFliperRowtoColumn(data[8].split(",")), {origin: "O1" });
// XLSX.utils.sheet_add_aoa(ws,arrayFliperRowtoColumn(data[9].split(",")), {origin: "P1" });
// XLSX.utils.sheet_add_aoa(ws,arrayFliperRowtoColumn(data[10].split(",")), {origin: "G1" });
// XLSX.utils.sheet_add_aoa(ws,arrayFliperRowtoColumn(data[11].split(",")), {origin: "H1" });
// XLSX.utils.sheet_add_aoa(ws,arrayFliperRowtoColumn(data[12].split(",")), {origin: "I1" });
// XLSX.utils.sheet_add_aoa(ws,arrayFliperRowtoColumn(data[13].split(",")), {origin: "R1" });
// XLSX.utils.sheet_add_aoa(ws,arrayFliperRowtoColumn(data[14].split(",")), {origin: "S1" });
// XLSX.utils.sheet_add_aoa(ws,arrayFliperRowtoColumn(data[15].split(",")), {origin: "T1" });
// XLSX.utils.sheet_add_aoa(ws,arrayFliperRowtoColumn(data[16].split(",")), {origin: "W1" });
// XLSX.utils.sheet_add_aoa(ws,arrayFliperRowtoColumn(data[17].split(",")), {origin: "X1" });
// XLSX.utils.sheet_add_aoa(ws,arrayFliperRowtoColumn(data[18].split(",")), {origin: "Y1" });
// XLSX.utils.sheet_add_aoa(ws,arrayFliperRowtoColumn(data[19].split(",")), {origin: "AC1" });
// XLSX.utils.sheet_add_aoa(ws,arrayFliperRowtoColumn(data[20].split(",")), {origin: "AD1" });
//XLSX.utils.sheet_add_aoa(ws,arrayFliperRowtoColumn(data[21].split(",")), {origin: "AE1" });

const newWB = XLSX.utils.book_new();
XLSX.utils.book_append_sheet(newWB, ws, "Citet_AlarmLink");


XLSX.writeFile(newWB, "C:/Work/- AutoScript/- Files AutoGen/Citect_Alarm_Link.xlsx");







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