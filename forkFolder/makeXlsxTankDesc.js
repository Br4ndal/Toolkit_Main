"use strict";
const XLSX = require("xlsx")
const fs = require("fs")






self.addEventListener("message",function(e){
  console.log("program started1 ",process.pid)
  let data = e.data
  console.log(data);
  //tankdescMaking()
  this.self.postMessage(tankdescMaking())
})

function tankdescMaking(){
  // basic arrays needed to create file
  let tankgrpName = ["GroupName",]
  let tankFcolumn =["-"];

  let tankSidePS = ["TankSide",];
  let tankSideSB = [];
  let tankNrPS = ["TankNr"];
  let tankNrSB = [];

  for(let i = 1; i <=100;i++){
      tankNrPS.push(i);
      tankNrSB.push(i);
      tankSidePS.push("PS")
      tankSideSB.push("SB")
  }

  let tankGrp = [];
  let tankGrpnr= [];
  let tankGrpSystems = ["Ballast", "Bilge", "Fresh Water", "Sludge", "UREA", "Lub Oil", "Fuel Oil", "Dirty Oil", "Misc"];
  for(let j = 1; j <=20;j++){
      tankGrp.push("GRP");
      tankGrpnr.push(j);

  }
  let content= readingFile("C:/Work/- AutoScript/IASProject/Json_files/Tank300SetupS.json")
  let data = JSON.parse(content);
  let shipTankNrArraySB = [];
  let TagRefSB = [];
  for (const addres1 of data){
      let shipTankNr = addres1["ShipTankNr"];
      let tagRef = addres1["TagRef"];
      if (tagRef !== undefined && shipTankNr < 1000){
          shipTankNrArraySB.push(shipTankNr);
          TagRefSB.push(`${tagRef}_LI1`)
        } 
  }

  let content2 = readingFile("C:/Work/- AutoScript/IASProject/Json_files/Tank300SetupP.json")
  const data2 = JSON.parse(content2);
  let shipTankNrArrayPS = ["ShipTankNr",];
  let TagRefPS = []
  for (const addres1 of data2 ){
      let shipTankNr = addres1["ShipTankNr"];
      let tagRef = addres1["TagRef"];
      if (tagRef !== undefined && shipTankNr < 1000 && shipTankNr !== 0 ){
        shipTankNrArrayPS.push(shipTankNr);
        TagRefPS.push(`${tagRef}_LI1`)
      } 
  }

  for (let i = shipTankNrArrayPS.length;i <=100;i++ ){
      shipTankNrArrayPS.push(0)
  }

  for (let i = shipTankNrArraySB.length;i <=99;i++ ){
      shipTankNrArraySB.push(0)
  }

  


  let workbook3; 
  try {
      workbook3 = XLSX.readFile(`C:/Work/- AutoScript/IASProject/IAS_CTRL_Common_Files/IO Liste.xlsx`);
  }catch(err) {
    console.log(err);
  }

  let worksheet3 = workbook3.Sheets[`IO List`];
  const dataAI3 =XLSX.utils.sheet_to_json(worksheet3);

  let tankIoListPS = ["TankDescription"];
  let tankIoListSB = [];


  for (const addres1 of dataAI3){
    
      let isaTag = addres1[`ISA`];
      let systemName = addres1[`System Name`];
      let signalDesc = addres1[`Signal Description`];
      let node = addres1[`Node`];
      let tagName = addres1[`Tag Name`]
      //console.log(tagName);
      for (let i =0; i <= TagRefPS.length ;i++){
        if(node === "Contr01Port" && systemName === "Sounding" && TagRefPS[i] ===tagName) { //isaTag === "LI1" &&
          
          let newStringPS =signalDesc.split(" ")
          
          let combinedStringPS = `${newStringPS[2] ? newStringPS[2] : ""} ${newStringPS[3]? newStringPS[3] : ""} ${newStringPS[4]? newStringPS[4] : ""} ${newStringPS[5]? newStringPS[5] : ""} ${newStringPS[6]? newStringPS[6] : ""} ${newStringPS[7]? newStringPS[7] : ""} ${newStringPS[8] ? newStringPS[8] : ""} ${newStringPS[9] ? newStringPS[9] : ""} ${newStringPS[10] ? newStringPS[10] : "" } ${newStringPS[11] ? newStringPS[11] : ""}`
            
          // console.log(combinedStringPS);
          tankIoListPS.push(combinedStringPS);
        }
      }
      for (let j =0; j<= TagRefSB.length;j++){
        if(node == "Contr02Stbd" && systemName === "Sounding"&& TagRefSB[j] === tagName) { //  isaTag == "LI1" && systemName == "Sounding" &&    // systemName == "SOUND" &&
          let newStringSB =signalDesc.split(" ")
          
          let combinedStringSB = `${newStringSB[2] ? newStringSB[2] : ""} ${newStringSB[3]? newStringSB[3] : ""} ${newStringSB[4]? newStringSB[4] : ""} ${newStringSB[5]? newStringSB[5] : ""} ${newStringSB[6]? newStringSB[6] : ""} ${newStringSB[7] ? newStringSB[7] : ""} ${newStringSB[8] ? newStringSB[8] : ""} ${newStringSB[9] ? newStringSB[9] : ""} ${newStringSB[10] ? newStringSB[10] : "" } ${newStringSB[11] ? newStringSB[11] : ""}`
          //console.log(combinedStringSB);
          tankIoListSB.push(combinedStringSB);
        }
      }

  }

    // chi.pro.fork("makeXlsxTankDesc.js", [tankSidePS,tankSideSB,tankGrp,tankNrPS,tankNrSB,tankGrpnr,shipTankNrArrayPS,shipTankNrArraySB,tankIoListPS,tankIoListSB,tankgrpName,tankGrpSystems], {cwd: "forkFolder/"})
  let ws = XLSX.utils.aoa_to_sheet(arrayFliperRowtoColumn(tankSidePS), {origin: "A1" });
  XLSX.utils.sheet_add_aoa(ws,arrayFliperRowtoColumn(tankSideSB), {origin: "A102" });
  XLSX.utils.sheet_add_aoa(ws,arrayFliperRowtoColumn(tankGrp), {origin: "A202" });
  XLSX.utils.sheet_add_aoa(ws,arrayFliperRowtoColumn(tankNrPS), {origin: "B1" });
  XLSX.utils.sheet_add_aoa(ws,arrayFliperRowtoColumn(tankNrSB), {origin: "B102" });
  XLSX.utils.sheet_add_aoa(ws,arrayFliperRowtoColumn(tankGrpnr), {origin: "B202" })
  XLSX.utils.sheet_add_aoa(ws,arrayFliperRowtoColumn(shipTankNrArrayPS), {origin: "C1" });
  XLSX.utils.sheet_add_aoa(ws,arrayFliperRowtoColumn(shipTankNrArraySB), {origin: "C102" });
  XLSX.utils.sheet_add_aoa(ws,arrayFliperRowtoColumn(tankIoListPS), {origin: "D1" });
  XLSX.utils.sheet_add_aoa(ws,arrayFliperRowtoColumn(tankIoListSB), {origin: "D102" });
  
  XLSX.utils.sheet_add_aoa(ws,arrayFliperRowtoColumn(tankgrpName), {origin: "E1" });
  XLSX.utils.sheet_add_aoa(ws,arrayFliperRowtoColumn(tankGrpSystems), {origin: "E202" });
  //XLSX.utils.sheet_add_aoa(ws,arrayFliperRowtoColumn(data[12].split(",")), {origin: "F1" }); 
  
  
  const newWB = XLSX.utils.book_new();
  
  XLSX.utils.book_append_sheet(newWB, ws, "TankDesc");
  XLSX.writeFile(newWB, "C:/Work/- AutoScript/- Files AutoGen/TankDesc.csv");
  console.log(`Completed`);
  return "File has been created"

  


}


function readingFile(filePath){
  try {
    return fs.readFileSync(filePath, 'utf-8');
      
  }catch(err) {
    //let errorMessage = `${err} file is missing from folder`
    return ""
    
      
  }
}

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