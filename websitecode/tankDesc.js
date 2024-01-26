'use strict';
/*
Descrption of Program: 

Making csv for tank description from IO list and TankSetupFileS and P. 
Uses its to get it early in the project and making it easier to tag the tanks. 

Files needed:
- Tank300SetupP
- Tank300SetupS
- IO list


*/


const btnTankDesc = document.querySelector(".btn--tankDescMaking");
btnTankDesc.addEventListener("click", function () {
    tankdescMaking()
  });


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


    let content = fs1.readFile1.readFileSync("C:/Work/- AutoScript/IASProject/Json_files/Tank300SetupS.json", 'utf-8');
    let data = JSON.parse(content);
    let test1 = [1,2,3,4,5]
    
    console.log(data.length);
    let shipTankNrArraySB = [];
    for (let addres1 of data ){
        let shipTankNr = addres1["ShipTankNr"];
        let tagRef = addres1["TagRef"];
        if (tagRef !== undefined && shipTankNr < 1000) shipTankNrArraySB.push(shipTankNr);
    }



    let content2 = fs1.readFile1.readFileSync("C:/Work/- AutoScript/IASProject/Json_files/Tank300SetupP.json", 'utf-8');
    const data2 = JSON.parse(content2);
    let shipTankNrArrayPS = ["ShipTankNr",];

    for (const addres1 of test1 ){
        let shipTankNr = addres1["ShipTankNr"];
        let tagRef = addres1["TagRef"];
        if (tagRef !== undefined && shipTankNr < 1000 && shipTankNr !== 0 ) shipTankNrArrayPS.push(shipTankNr);
    }

    for (let i = shipTankNrArrayPS.length;i <=100;i++ ){
        shipTankNrArrayPS.push(0)
    }

    for (let i = shipTankNrArraySB.length;i <=99;i++ ){
        shipTankNrArraySB.push(0)
    }

    const workbook3 = excel.link.readFile(`C:/Work/- AutoScript/IASProject/IAS_CTRL_Common_Files/IO Liste.xlsx`);
    let worksheet3 = workbook3.Sheets[`IO List`];
    const dataAI3 =excel.link.utils.sheet_to_json(worksheet3);
    console.log(typeof(dataAI3));
    let tankIoListPS = ["TankDescription"];
    let tankIoListSB = [];
    for (const addres1 of dataAI3){
        let isaTag = addres1[`ISA`];
        let systemName = addres1[`System Name`];
        let signalDesc = addres1[`Signal Description`];
        let node = addres1[`Node`];
        

        
        if(isaTag === "LI1" && node === "Contr01Port" && systemName === "Sounding") { 
            let newStringPS =signalDesc.split(" ")
            
            let combinedStringPS = `${newStringPS[2] ? newStringPS[2] : ""} ${newStringPS[3]} ${newStringPS[4]} ${newStringPS[5]} ${newStringPS[6]} ${newStringPS[7]? newStringPS[7] : ""} ${newStringPS[8] ? newStringPS[8] : ""} ${newStringPS[9] ? newStringPS[9] : ""} ${newStringPS[10] ? newStringPS[10] : "" } ${newStringPS[11] ? newStringPS[11] : ""}`
            
            tankIoListPS.push(combinedStringPS);
        } else if( isaTag == "LI1" && node == "Contr02Stbd" && systemName === "Sounding") { // systemName == "Sounding" &&    // systemName == "SOUND" &&
            let newStringSB =signalDesc.split(" ")
            
            let combinedStringSB = `${newStringSB[2]} ${newStringSB[3]} ${newStringSB[4]} ${newStringSB[5]} ${newStringSB[6]} ${newStringSB[7] ? newStringSB[7] : ""} ${newStringSB[8] ? newStringSB[8] : ""} ${newStringSB[9] ? newStringSB[9] : ""} ${newStringSB[10] ? newStringSB[10] : "" } ${newStringSB[11] ? newStringSB[11] : ""}`
            //console.log(combinedStringSB);
            tankIoListSB.push(combinedStringSB);
        }
    }

    console.log(tankIoListPS,tankIoListSB);

    let childPros1 = chi.pro.fork("makeXlsxTankDesc.js", [tankSidePS,tankSideSB,tankGrp,tankNrPS,tankNrSB,tankGrpnr,shipTankNrArrayPS,shipTankNrArraySB,tankIoListPS,tankIoListSB,tankgrpName,tankGrpSystems,], {cwd: "forkFolder/"})


}


//-------- FUNCTION----------------------------

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