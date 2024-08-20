'use strict';
/*
TODO: Check variable tags of the trends
Check of the dags variable on trend. 
*/
const XLSX = require("xlsx")
const fs = require(`fs`);


self.addEventListener("message",function(e){
    console.log("program started1 ",process.pid)
    let data = e.data
    console.log(data);
    this.self.postMessage(trendGen())
  })
  

function trendGen(){




    // -Variables
    let projectPlace = []


    // ----- Start-------
    let input = "xxx"

    const workbook1 = XLSX.readFile(`C:/Work/- AutoScript/IASProject/Citect_Project/argdig.DBF`); // ${input}
    let worksheet1= workbook1.Sheets["Sheet1"];
    const dataAI1 = XLSX.utils.sheet_to_json(worksheet1);


    const combiSfiName = []
    const almNrVal =[]
    const almNr = []

    let bilgeAlmSfi = []
    let bilgeAlmName = []
    for(let i=0; i <dataAI1.length; i++){
        // const alarmTagCitect = dataAI1[i][`TAG`];
        // const categoryCitect = dataAI1[i][`CATEGORY`];

        const tagsToBeChecked =  dataAI1[i][`CUSTOM7`];
        const nameOfAlarmCitect = dataAI1[i][`CUSTOM8`];
        const unitCitect = dataAI1[i][`CUSTOM6`]
        const alarmTagCitect = dataAI1[i][`TAG`];


        let strinigyTagsTobeCheck = tagsToBeChecked.toUpperCase()
        let testThisForLAH = "LAH"
        let testForLAH =strinigyTagsTobeCheck.indexOf(testThisForLAH)
        //using the variable of nameOfAlarmCitect to check if it contains spesific words
        let strinifynameOfAlarmCitect = nameOfAlarmCitect.toUpperCase();
        let testThisForAlm = "_DESC";
        let testForSubStrAlm = strinifynameOfAlarmCitect.indexOf(testThisForAlm);

        let testThisForDele = "DELE";
        let testForDele = strinifynameOfAlarmCitect.indexOf(testThisForDele);

        let testThisForBilge = "BILGE";
        let testForBilge = strinifynameOfAlarmCitect.indexOf(testThisForBilge)

        if(testForSubStrAlm < 1 && unitCitect != "-" && testForDele < 0){
        combiSfiName.push(`${tagsToBeChecked} ${nameOfAlarmCitect}`)
        almNr.push(`${alarmTagCitect}_VAL`)
        almNrVal.push(`${alarmTagCitect}_VAL`)
        } 


        if(testForBilge >= 0 && testForLAH > 0 ){
          bilgeAlmName.push(`${tagsToBeChecked} ${nameOfAlarmCitect}`)
          bilgeAlmSfi.push(`${alarmTagCitect}_VAL`)
        }
    }

    const workbook2 = XLSX.readFile(`C:/Work/- AutoScript/IASProject/Citect_Project/variable.DBF`); // ${input}
    let worksheet2= workbook2.Sheets["Sheet1"];
    const dataAI2 = XLSX.utils.sheet_to_json(worksheet2);

    let mainVariable = []
    for(let i=0; i <dataAI2.length -1 ; i++){
    const placeController=  dataAI2[i][`UNIT`];
    const variableType = dataAI2[i][`TYPE`];
    const variablName = dataAI2[i][`NAME`]
    const variablName2 = dataAI2[i][`NAME`]
    
    let strinifyController = placeController.toUpperCase();
    let testThisForPort = "PORT";
    let testForSubStrPort = strinifyController.indexOf(testThisForPort);

    let strinifyController1 = placeController.toUpperCase();
    let testThisForSTBD = "STBD";
    let testForSubStrSTBD = strinifyController1.indexOf(testThisForSTBD);
    let testForSubStrXC =variablName.toUpperCase().indexOf("_XC")
    let testForSubStrRUN =variablName2.toUpperCase().indexOf("RUN")
    if( ( (testForSubStrPort > 1 && testForSubStrXC <1) || (testForSubStrSTBD >1 && testForSubStrXC <1) && (variableType !="STRING" ||variableType !="DIGITAL" )) ){
        if ((testForSubStrRUN < 1) && variablName[0] == "t" ){
            mainVariable.push(variablName)
            projectPlace.push(`${input.toUpperCase()}`)
        }
    } 
  }

//------ Getting tanks name and tag from the tankdesc.csv file
    const workbook3 = XLSX.readFile(`C:/Work/- AutoScript/IASProject/IAS_CTRL_Common_Files/TankDesc.CSV`)
    let worksheet3= workbook3.Sheets["Sheet1"];
    const dataAI3 = XLSX.utils.sheet_to_json(worksheet3);

    let tankNames = [];
    let tankTagName = [];
    for(let i=0; i <dataAI3.length-1 ; i++){
      const TankDescription=  dataAI3[i][`TankDescription`];
      const TankSide = dataAI3[i][`TankSide`];
      if (TankDescription !=  undefined && dataAI3.length > 100 && TankSide =="PS"){
        tankNames.push(TankDescription)
        i < 9 ?  tankTagName.push(`PS_TANK00${i+1}_VOL1`)  : tankTagName.push(`PS_TANK0${i+1}_VOL1`) ;
      }else if(TankDescription !=  undefined && dataAI3.length >= 100&& TankSide =="SB" ){
        tankNames.push(TankDescription)
        i < 109 ?  tankTagName.push(`SB_TANK00${i-99}_VOL1`) : tankTagName.push(`SB_TANK0${i-99}_VOL1`) ;
      
      }
    }


    //------ Getting tanks name and tag from the tankdesc.csv file
    const workbook4 = XLSX.readFile(`C:/Work/- AutoScript/IASProject/IAS_CTRL_Common_Files/Pumpsetup.CSV`)
    let worksheet4= workbook4.Sheets["Sheet1"];
    const dataAI4 = XLSX.utils.sheet_to_json(worksheet4);
    let pumpNames = [];
    let pumpTagName = [];

    for(let i=0; i <dataAI4.length-1 ; i++){
      const TagRef=  dataAI4[i][`TagRef`];
      const PumpNr = dataAI4[i][`PumpNr`];
      if (PumpNr !=  undefined){
        pumpNames.push(TagRef)
        i < 9 ?  pumpTagName.push(`Pump00${i+1}_FBK1`)  : pumpTagName.push(`Pump0${i+1}_FBK1`) ;
      }
    }


    const filepathStart = "C:/Work/- AutoScript/IASProject/Citect_Project/_IncludeProjects"
    var markers = [];
    let checkingPath = fs.readdirSync(filepathStart)
    for (let i = 0; i < checkingPath.length; ++i) {
        markers[i] = filepathStart +"/"+checkingPath[i] + "/variable.DBF";
        console.log(markers[i])
    }
    console.log("Working.....")

    let newArrayOfFilesNot = []

    for(let i = 0;i < markers.length;i++){
    let tempVal = (markers[i].toUpperCase()).split("/",7)
    
    let testForSubStrAlarms = tempVal[6].indexOf("ALARMS");
    let testForSubStrAlarms3 = tempVal[6].indexOf("NETWORK");
    let testForSubStrAlarms4 = tempVal[6].indexOf("LIBRARY");
    let testForSubStrAlarms2 = tempVal[6].indexOf("VALVE");
    let testForSubStrAlarms1 = tempVal[6].indexOf("TANKS");
    let testForSubStrAlarms5 = tempVal[6].indexOf("INCLUDE");
    let testForSubStrAlarms6 = tempVal[6].indexOf("FIRE");
    if(testForSubStrAlarms5 >1|| testForSubStrAlarms >1|| testForSubStrAlarms1 >1|| testForSubStrAlarms3 >1|| testForSubStrAlarms2 > 1|| testForSubStrAlarms4>1|| testForSubStrAlarms6 >1 ){ // 
        newArrayOfFilesNot.push(i)
    }
    }

    for(let i = 0;i < newArrayOfFilesNot.length;i++){
    delete markers[newArrayOfFilesNot[i]]
    console.log(markers[i]);
    }

    let tempStorageA= []
    for(let i = 0; i <= markers.length -1;i++){
        if(markers[i]!= undefined ){
        tempStorageA=tempStorageA.concat(pgdynobjFile1(markers[i]))
        //tempStorageA.push(pgdynobjFile1(markers[i]))
        console.log(`File ${markers[i]} completed , array size is ${tempStorageA.length}`)
        }
    }
    let tempStorageB= [] //mainVariable.concat(tempStorageA)
    let tempStorageC =[] // taking away the t for the SFI and name
    for (let i =0; i<=tempStorageB.length -1 ;i++){
    // console.log(tempStorageB[i])
    // console.log(tempStorageC[i+1])
    tempStorageB[i] != undefined ? tempStorageC.push(tempStorageB[i].substring(1))  : false;
    //tempStorageB.push(tempStorageA[i].substring(1))
    
    }

    //console.log(tempStorageB);

    //columA1 = [almNr,mainVariable,tempStorageA]
    let columA1= ["Tag Name"].concat( almNr,tempStorageB,tankTagName,pumpTagName,bilgeAlmSfi)

    let columB1 = ["Cluster",]
    let columC1 = ["Type",]
    let columD1 = ["Expression"].concat(almNrVal,tempStorageC,tankTagName,pumpTagName,bilgeAlmSfi)
    let columE1 = ["Sample Time",] // Need to make better
    let columF1 = ["Comment"].concat(combiSfiName,tempStorageC,tankNames,pumpNames,bilgeAlmName)
    let columG1 = ["",]
    let columH1 = ["No. Files",]
    let columI1 = ["Periode",]
    let columJ1 = ["Time",]
    let columL1 = ["Storage Method",]
    let columM1 = ["Project",] // NEED TO FIX 


    for(let i =0; i < columA1.length - tankTagName.length - pumpNames.length - bilgeAlmName.length ;i++){
    columB1.push("IAS")
    columC1.push("TRN_PERIODIC")
    columL1.push("Floating Point (8-byte samples)")
    columI1.push("1st")
    columH1.push("2")
    columE1.push("00:00:01")
    columM1.push(`NB${input.toUpperCase()}`)

    }
    for(let i =0; i < tankTagName.length ;i++){
      columB1.push("IAS")
      columC1.push("TRN_PERIODIC")
      columL1.push("Floating Point (8-byte samples)")
      columI1.push("1st")
      columH1.push("2")
      columE1.push("00:00:10")
      columM1.push(`NB${input.toUpperCase()}`)
    }
    for(let i =0; i < pumpNames.length + bilgeAlmName.length ;i++){
      columB1.push("IAS")
      columC1.push("TRN_PERIODIC")
      columL1.push("Scaled (2-byte samples)") // this can be changed......
      columI1.push("1st")
      columH1.push("2")
      columE1.push("00:00:10")
      columM1.push(`NB${input.toUpperCase()}`)
    }
    let ws = XLSX.utils.aoa_to_sheet(arrayFliperRowtoColumn(columA1), {origin: "A1" }); // Name of tag 
    XLSX.utils.sheet_add_aoa(ws,arrayFliperRowtoColumn(columB1), {origin: "B1" }); // IAS
    XLSX.utils.sheet_add_aoa(ws,arrayFliperRowtoColumn(columC1), {origin: "C1" }); // TRN_PERIODIC
    XLSX.utils.sheet_add_aoa(ws,arrayFliperRowtoColumn(columD1), {origin: "D1" }); //  TAG of variable that should be trended.
    XLSX.utils.sheet_add_aoa(ws,arrayFliperRowtoColumn(columE1), {origin: "E1" }); // TIME each of each trend 
    XLSX.utils.sheet_add_aoa(ws,arrayFliperRowtoColumn(columF1), {origin: "F1" }); //Name of trend
    XLSX.utils.sheet_add_aoa(ws,arrayFliperRowtoColumn(columG1), {origin: "G1" }); //Empty colum 
    XLSX.utils.sheet_add_aoa(ws,arrayFliperRowtoColumn(columH1), {origin: "H1" }); // How long should trends be saved 
    XLSX.utils.sheet_add_aoa(ws,arrayFliperRowtoColumn(columI1), {origin: "I1" }); //FROM THE DATE THAT IT START LOGG 
    XLSX.utils.sheet_add_aoa(ws,arrayFliperRowtoColumn(columJ1), {origin: "J1" }); //low scale 
    //XLSX.utils.sheet_add_aoa(ws,arrayFliperRowtoColumn(columJ1), {origin: "K1" }); //High Scale 
    XLSX.utils.sheet_add_aoa(ws,arrayFliperRowtoColumn(columL1), {origin: "L1" }); // size og the trend
    XLSX.utils.sheet_add_aoa(ws,arrayFliperRowtoColumn(columM1), {origin: "M1" }); // PROJECT NAME 

    
    // XLSX.utils.sheet_add_aoa(ws,arrayFliperRowtoColumn(bilgeAlmSfi), {origin: "O1" }); // PROJECT NAME 
    // XLSX.utils.sheet_add_aoa(ws,arrayFliperRowtoColumn(bilgeAlmName), {origin: "P1" }); // PROJECT NAME 

    const newWB = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(newWB, ws, "Citet_AlarmLink");
    XLSX.writeFile(newWB, "C:/Work/- AutoScript/- Files AutoGen/AutoGen_Trends.xlsx");

    
    console.log(`Completed`);
    console.log("Systems alarms needs to be double checked because of cant be compared correctly....")
    return "File completed find file her : C:/Work/- AutoScript/- Files AutoGen"
}

//----------------------FUNCTIONs-----------------------------------
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


function pgdynobjFile1(filepathPgd){
  let variableName1 = [];
  let citectPageFromPgd = []

  const workbook = XLSX.readFile(filepathPgd);
  let worksheet = workbook.Sheets["Sheet1"];
  const dataAI = XLSX.utils.sheet_to_json(worksheet);

  for (let i=0; i <dataAI.length -1 ; i++){

    const placeController=  dataAI[i][`UNIT`];
    const variableType = dataAI[i][`TYPE`];
    const variablName = dataAI[i][`NAME`]
    const variablName1 = dataAI[i][`NAME`]
    const variablName3 = dataAI[i][`NAME`]
    const variablName4 = dataAI[i][`NAME`]
    
    let testForSubStrPort = placeController.toUpperCase().indexOf("PORT");
    let testForSubStrSTBD = placeController.toUpperCase().indexOf("STBD");

    let testForSubStrXC = variablName3.toUpperCase().indexOf("XC")
    let testForSubStrRUN =variablName4.toUpperCase().indexOf("RUN")
    let testForSubStrCMD =variablName.toUpperCase().indexOf("CMD")
    let testForSubStrREM =variablName.toUpperCase().indexOf("REM")
    let testforSubPMS = filepathPgd.toUpperCase().indexOf("PMS")

    let conditionArrayPS1 = [
      testForSubStrPort > 1 ? true : false,
      variablName1[0] == "t" ? true : false,
      testForSubStrRUN < 1 ? true : false,
      testForSubStrXC < 1 ? true : false,
      testForSubStrCMD < 1 ? true : false,
      testForSubStrREM < 1 ? true: false,
      variableType !="STRING" ? true : false,
      variableType !="DIGITAL" ? true : false,
      
    ]
    let conditionArraySB1 = [
      testForSubStrSTBD > 1 ? true :false,
      variablName1[0] == "t" ? true : false,
      testForSubStrRUN < 1 ? true : false,
      testForSubStrXC < 1 ? true : false,
      testForSubStrCMD < 1 ? true : false,
      testForSubStrREM < 1 ? true: false,
      variableType !="STRING" ? true : false,
      variableType !="DIGITAL" ? true : false,
    ]
    //console.log(conditionArray1)

    // if(testforSubPMS > 1){ // goes into PMS variables probly need to look at this because of our internal PMS probly uses different variable names.
    //   if( ( (testForSubStrPort > 1 && testForSubStrXC <= 0) || (testForSubStrSTBD > 1 && testForSubStrXC <= 0) && (variableType !="STRING" ||variableType !="DIGITAL" )) ){
    //     if ((testForSubStrRUN < 1 ) && variablName1[0] == "t" ){
    //       //variableName1.push(variablName)
    //   }
    // } 
    //}else 
    if (!conditionArrayPS1.includes(false) ) { //(testForSubStrPort > 1  || testForSubStrSTBD >1 ) && (variableType !="STRING" || variableType !="DIGITAL" ) 
        variableName1.push(`${variablName}`)
    }  else if(!conditionArraySB1.includes(false) ) {
        variableName1.push(`${variablName}`)
    }
    
  }
  return variableName1
}