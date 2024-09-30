"use strict";
const XLSX = require("xlsx")
const fs = require("fs");
const { unsubscribe } = require("diagnostics_channel");
const { config, exit, exitCode } = require("process");


checkPageAlarms ()

function checkPageAlarms (){
    // getting data from pageconfig.json file to make an array of all the pages
    let pageConfig = fs.readFileSync("C:/Work/- AutoScript/IASProject/Json_files/PageConfig.json", 'utf-8');
    const pageConfigConst1 = JSON.parse(pageConfig);
    let pageNamesCitect = [] // empty array to add pageNames from file to.
    let resultMapOwner = Object.values(pageConfigConst1).map(o =>o["Ship Owner:"]) // maping the object "Ship Owner:" from pageconfig
    let resultMap3 = Object.values(pageConfigConst1).map(o =>o["3"]) //Maping the object "3" from pageconfig
    for(let i=0; i< pageConfigConst1.length;i++){ // looping through all the rows the pageconfig file to get out information i need.
        let parsePageNrNull, tagCombiP // tags to be used in for loop
        let pageOwner = resultMapOwner[i] //variable for system name of page
        let pageNr = resultMap3[i] // Variable for page number of page
        let parsePageNr = parseInt(pageNr) // converting page Number from string to INT

        parsePageNr >=10 ? parsePageNrNull = parsePageNr : parsePageNrNull = `0${parsePageNr}`; // if pageNumber is under 10, then adding a zero to the start of the string to match how we write page names in citect
        tagCombiP = `M_MNU_${pageOwner}_${parsePageNrNull}` // combing the tags and make a new string
        pageNamesCitect.push(tagCombiP) // pushing new name to an array
    }
    let newPageNamesCitect = pageConfigClean(pageNamesCitect) // cleaning the pageconfig file to take away page that dont exist or undefined

    let tankDescFile = fs.readFileSync("C:/Work/- AutoScript/IASProject/Json_files/TankDesc.json", 'utf-8') // reading JSON file
    const tankDescFileParse = JSON.parse(tankDescFile); // converting  JSON object text file and formating it so it can be used her
    let nameOfTanks = []; // empty are where i can push the name of the tanks
    for(let j = 0;j< tankDescFileParse.length;j++){
      let tankNRParse = parseInt(tankDescFileParse[j].TankNr)
      tankNRParse >= 10 ? tankNRParse = `0${tankNRParse}` : tankNRParse= `00${tankNRParse}` // check if tank is bigger then 10 if not i will add two 0's
      let nameTank = `${tankDescFileParse[j].TankSide}_TANK${tankNRParse}` //combing and making tank tag.
      if (tankDescFileParse[j].TankDescription != ""){ // filtering away empty tank description 
        nameOfTanks.push({ // pushing an object to an array.
          citectName: nameTank,
          name: tankDescFileParse[j].TankDescription} )
      }

    }
    
    let pumpFile = fs.readFileSync("C:/Work/- AutoScript/IASProject/Json_files/PumpSetup.json", 'utf-8')
    const pumpFileParse = JSON.parse(pumpFile)
    let nameOfPump = []

    for(let k =0; k < pumpFileParse.length;k++){
      let pumpNRParse = parseInt(pumpFileParse[k].PumpNr)
      pumpNRParse >= 10 && pumpNRParse < 100 ? pumpNRParse = `0${pumpNRParse}` : pumpNRParse= `00${pumpNRParse}` // check if tank is bigger then 10 if not i will add two 0's
      pumpNRParse >= 100 ? pumpNRParse = `${pumpNRParse}` : null
      let namePump = `Pump${pumpNRParse}` //combing and making tank tag.
      
        nameOfPump.push({ // pushing an object to an array.
          citectName: namePump,
          name: pumpFileParse[k].TagRef
        })
    }
    
    let combiTankPumpFile = nameOfTanks.concat(nameOfPump)

    //getting all alarms to compare againt pgdobj file.
    const workbook1 = XLSX.readFile(`C:/Work/- AutoScript/IASProject/Citect_Project/argdig.DBF`); // reading file from file location
    let worksheet1 = workbook1.Sheets["Sheet1"]; // defing what sheet i want to read from
    const dataAI1 = XLSX.utils.sheet_to_json(worksheet1); // converting from sheet to json.
    let allAlarms = []; // Empty array that is made to an object for all the alarms in ardige file.
    for (const address2 of dataAI1) { // looping through all data from the ardig file
        const alarmTagCitect = address2[`TAG`];
        const tagsToBeChecked = address2[`CUSTOM7`];
        const nameOfAlarmCitect = address2[`CUSTOM8`]

        //making an object from array file so i can use in code later for comparing alarm numbers.
        allAlarms.push({
            alarmNr: alarmTagCitect,
            alarmSfi: tagsToBeChecked,
            alarmName: nameOfAlarmCitect
        })


    }



    // TODO:   come back and fix so i use all the pgdynobject files!!!!!!!!!!!!!!! -------------------------------
    let pdgFile1 = pgdynobjFile1("C:/Work/- AutoScript/IASProject/Citect_Project/pgdynobj.dbf",)
    console.log("Gathering files.... Please wait")
    // her i check the include folders for which files are there any file the path for the pgdynobj file. This for loop is for all under projects like PMS, Tank , valves etc.
    const filepathStart = "C:/Work/- AutoScript/IASProject/Citect_Project/_IncludeProjects"
    var markers = [];
    let checkingPath = fs.readdirSync(filepathStart)
    for (let i = 0; i < checkingPath.length; ++i) {
      markers[i] = filepathStart + "/" + checkingPath[i] + "/pgdynobj.dbf";
      console.log(markers[i])
    }
    console.log("Working.....")
  
    let complettArray = comparePageToPGDFile(newPageNamesCitect,pdgFile1,allAlarms,combiTankPumpFile) // sending array and object to function to compare to pgd file
    //console.log(complettArray);
    //TODO: FIX the char for each excel cell this is just for testing
    let ws = XLSX.utils.aoa_to_sheet(arrayFliperRowtoColumn(complettArray[0]), { origin: "A1" });
    for (let i =1; i <= newPageNamesCitect.length -1 ;i++){  //newPageNamesCitect.length
        let char = String.fromCharCode(65+i);
        //console.log(char,i);
        if(i <=25){
            char = String.fromCharCode(65+i);
            //console.log("IF 1",char,i);
            XLSX.utils.sheet_add_aoa(ws, arrayFliperRowtoColumn(complettArray[i]), { origin: `${char}1` });
        } else if(i>=27 && i <= 52){
            char = String.fromCharCode(65+i-27);
            //console.log("IF 2",char,i);
            XLSX.utils.sheet_add_aoa(ws, arrayFliperRowtoColumn(complettArray[i]), { origin: `A${char}1` });
        } else if(i>=52 && i <= 76){
            char = String.fromCharCode(65+i-53);
            //console.log("IF 3",char,i);
            XLSX.utils.sheet_add_aoa(ws, arrayFliperRowtoColumn(complettArray[i]), { origin: `B${char}1` });
        }else if(i >=77 && i <= newPageNamesCitect.length -1){
            char = String.fromCharCode(65+i-77);
            //console.log("IF 4",char,i);
            XLSX.utils.sheet_add_aoa(ws, arrayFliperRowtoColumn(complettArray[i]), { origin: `C${char}1` }); //newPageNamesCitect
        } else {
            null
        }
    }

    const newWB = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(newWB, ws, "pageCheckAlarms");
    XLSX.writeFile(newWB, "C:/Work/- AutoScript/- Files AutoGen/pageCheckAlarms.xlsx");
}



function arrayFliperRowtoColumn(array, value) {

    if(array !== undefined){
      const addressObjecToArray = Object.values(array);
      const result = Object.keys(addressObjecToArray).map((key) => [
        addressObjecToArray[key],
      ]);
    
      // returns value of hardwired to an object and i convert to column
      if (value === "1") {
        let worksheet =
          result.map(function (v) {
            return [JSON.stringify(v)];
          });
        return worksheet;
      } else {
        let worksheet =
          result.map(function (v) {
            return [v];
          });
        return worksheet;
      }
    }else{
      null
    }

  }


function pgdynobjFile1(filepathPgd) {
    let newpgdObj = []

    const workbook = XLSX.readFile(filepathPgd);
    let worksheet = workbook.Sheets["Sheet1"];
    const dataAI = XLSX.utils.sheet_to_json(worksheet);

    for (const address3 of dataAI) {
      const getingColumnInfo = address3[`COL_A`];
    //   const getingColumnInfo1 = address3[`TXT_A`]; // dont need for now no values for MNU6_01
      const getingColumnInfo2 = address3[`VISIBLE`];
    //   const getingColumnInfo3 = address3[`COL_ARR`]; // dont need for now no values for MNU6_01
      const getingColumnInfo4 = address3[`TXT_STR`];
      const getingColumnInfo5 = address3[`COL_B`];
    //   const getingColumnInfo6 = address3[`TXT_B`];// dont need for now no values for MNU6_01
    //   const getingColumnInfo7 = address3[`SET_ARR`];// dont need for now no values for MNU6_01
    //   const getingColumnInfo8 = address3[`TXT_C`]; // dont need for now no values for MNU6_01
      const getingColumnInfo9 = address3[`PAGE`];
      const getingColumnInfo10 = address3[`COMMENT`]
      const getingColumnInfo11 = address3[`DESC`]
        // console.log(address3);
        if (getingColumnInfo != undefined || getingColumnInfo2 != undefined || getingColumnInfo4 != undefined 
            ||getingColumnInfo5 != undefined|| getingColumnInfo9 != undefined || getingColumnInfo10 != undefined 
            || getingColumnInfo11 != undefined){
            newpgdObj.push({ 
                Page: getingColumnInfo9, 
                COL_A: getingColumnInfo, 
                VISIBLE: getingColumnInfo2, 
                TXT_STR: getingColumnInfo4, 
                COL_B:getingColumnInfo5, 
                COMMENT :getingColumnInfo10, 
                DESC:getingColumnInfo11  })
        }
    }
    return  newpgdObj

}


function cleanArray(arrayToClean){
  let newCleanedArray = [];
  let rowsDeleted = [];
  arrayToClean.forEach((arrayIndex) =>{
    
    let upperCaseArray = arrayIndex
    //console.log(upperCaseArray);
    upperCaseArray == undefined ? upperCaseArray="tempVar" : null

    let strinifyAlarmTagCitext = JSON.stringify(upperCaseArray.toUpperCase());
    //console.log(strinifyAlarmTagCitext);
    let testThisForsticker = "sticker".toUpperCase()
    let testForSubStrsticker = strinifyAlarmTagCitext.indexOf(testThisForsticker);

    let testThisForPageinfo = "Pageinfo".toUpperCase()
    let testForSubStrPageinfo = strinifyAlarmTagCitext.indexOf(testThisForPageinfo);

    let testThisForDeadMan= "DeadMan".toUpperCase()
    let testForSubStrDeadMan = strinifyAlarmTagCitext.indexOf(testThisForDeadMan);

    
    let testThisForGetGrpNameInfo= "GetGrpNameInfo".toUpperCase()
    let testForSubStrGetGrpNameInfo = strinifyAlarmTagCitext.indexOf(testThisForGetGrpNameInfo);
    
    let testThisForGetAlarmGetDsp= "AlarmGetDsp".toUpperCase()
    let testForSubStrAlarmGetDsp = strinifyAlarmTagCitext.indexOf(testThisForGetAlarmGetDsp);

    let testThisForGetDspAnInfo= "DspAnInfo".toUpperCase()
    let testForSubStrDspAnInfo = strinifyAlarmTagCitext.indexOf(testThisForGetDspAnInfo);
    let testThisForGet_INH= "_INH".toUpperCase()
    let testForSubStr_INH = strinifyAlarmTagCitext.indexOf(testThisForGet_INH);
    
    let testThisForGetPC999_9999= "PC999_9999".toUpperCase()
    let testForSubStrPC999_9999 = strinifyAlarmTagCitext.indexOf(testThisForGetPC999_9999);

    let testThisForGetCallEngineer = "CallEngineer".toUpperCase()
    let testForSubStrCallEngineer  = strinifyAlarmTagCitext.indexOf(testThisForGetCallEngineer);
    
    let testThisForGetIntToReal = "IntToReal".toUpperCase()
    let testForSubStrIntToReal  = strinifyAlarmTagCitext.indexOf(testThisForGetIntToReal);

    let testThisForTankSlider = "TankSlider".toUpperCase()
    let testForSubStrTankSlider  = strinifyAlarmTagCitext.indexOf(testThisForTankSlider);
    
    let testThisForTankA = "Actual Tank".toUpperCase()
    let testForSubStrTankA  = strinifyAlarmTagCitext.indexOf(testThisForTankA);
    
    let testThisForgetNN = "getNN".toUpperCase()
    let testForSubStrgetNN  = strinifyAlarmTagCitext.indexOf(testThisForgetNN);
   
    if (testForSubStrsticker >=0 || testForSubStrPageinfo >=0 ||testForSubStrDeadMan >= 0
      ||testForSubStrGetGrpNameInfo >=0 || testForSubStrAlarmGetDsp >= 0 ||testForSubStrDspAnInfo >= 0
      || testForSubStr_INH >= 0 || testForSubStrPC999_9999 >=0 || testForSubStrCallEngineer >= 0
      || testForSubStrIntToReal >= 0 || testForSubStrTankSlider >=0 || testForSubStrTankA >= 0 || testForSubStrgetNN >=0 ){
        rowsDeleted.push(arrayIndex);
    } else{
      newCleanedArray.push(arrayIndex)
    }
  })
  //console.log(rowsDeleted.length);
  return newCleanedArray

}

function pageConfigClean (array){
    let newCleanArray = []
    
    array.forEach((arrayIndex =>{
        let upperCaseArray = arrayIndex
        upperCaseArray == undefined ? upperCaseArray="tempVar" : null

        let strinifyAlarmTagCitext = JSON.stringify(upperCaseArray.toUpperCase());
        //console.log(strinifyAlarmTagCitext);
        let testThisForNan = "NaN".toUpperCase()
        let testForSubStrsticker = strinifyAlarmTagCitext.indexOf(testThisForNan);
    
        if (testForSubStrsticker >=0  ){
              null
          } else{
            newCleanArray.push([arrayIndex])
        }

    }))

    //console.log(rowsDeleted.length);
    return newCleanArray
}


function comparePageToPGDFile (arrayPageConfig,arrayPGD,allAlarms,commonFile){

    let pdgFile1 = arrayPGD;
    let newComplettArray = [];
    console.log("STARTED!!!!");
    arrayPageConfig.forEach((arrayIndex,indexA) => {
        let pageOne = arrayIndex[0]
        //console.log("Page being checked",pageOne,indexA);
        let newPageOneArray = arrayIndex
        pdgFile1.forEach(e => {
            if (pageOne === e.Page && (e.COL_A !== undefined || e.VISIBLE !== undefined
                 || e.TXT_STR !== undefined || e.COL_B !== undefined 
                 || e.COMMENT !== undefined|| e.DESC !== undefined )){
                newPageOneArray.push(e.COL_A)
                newPageOneArray.push(e.VISIBLE)
                newPageOneArray.push(e.TXT_STR)
                newPageOneArray.push(e.COL_B)
                newPageOneArray.push(e.COMMENT)
                newPageOneArray.push(e.DESC)
            } 
        });
        let newPageOneArray1 = [...new Set(newPageOneArray)];
        //console.log(newPageOneArray1[0]);
        // console.log(newPageOneArray.length);
        // console.log(newPageOneArray1.length);
        newPageOneArray1.forEach((e,index) => {
          
          let newIndexE = index
          let newVar = e;
          let eArray = [];
          let testForSubStrOR 
          let tempVarUarray=[];
          if (newVar == undefined || newVar ==" " ){
            null
          }else {
            
            let stringifyArray = JSON.stringify(newVar.toUpperCase())
            let testForOR = "OR"
            testForSubStrOR = stringifyArray.indexOf(testForOR)
    
            if (testForSubStrOR >= 0) {
              eArray = stringifyArray.split(" OR");
            }else {
              stringifyArray !== undefined ? eArray = stringifyArray : eArray="test";
            }
          }

          allAlarms.forEach((u,index1) =>{
            if (testForSubStrOR < 0 ){
              let strinifyAlarmTagCitext = JSON.stringify(eArray.toUpperCase());
              let testThisForAlm = u.alarmNr
              let testThisForAlmUpper = testThisForAlm.toUpperCase()
              let testForSubStrAlm = strinifyAlarmTagCitext.indexOf(testThisForAlmUpper);
      
              if (testForSubStrAlm >= 0) {
                newPageOneArray1[newIndexE] = `${u.alarmNr} ${u.alarmSfi} ${u.alarmName} `;// u.alarmName//${e}
                return
              }
            }else if(testForSubStrOR >=0){
              let eArrayIndex = eArray[0]
              let eArrayIndex1 = eArray[1]
              
              eArrayIndex1 == undefined ? eArrayIndex1="empty" : null;
              eArrayIndex == undefined ? eArrayIndex1="empty" : null;
              let strinifyAlarmTagCitext = JSON.stringify(eArrayIndex.toUpperCase());
              let strinifyAlarmTagCitext2 = JSON.stringify(eArrayIndex1.toUpperCase());
              let testThisForAlm = u.alarmNr
              let testThisForAlmUpper = testThisForAlm.toUpperCase()
    
              let testForSubStrAlm = strinifyAlarmTagCitext.indexOf(testThisForAlmUpper);
              let testForSubStrAlm2 = strinifyAlarmTagCitext2.indexOf(testThisForAlmUpper);
              if (testForSubStrAlm >= 0) {
                tempVarUarray =tempVarUarray.concat(`${u.alarmNr} ${u.alarmSfi} ${u.alarmName}`);// u.alarmName//  ${e}
              }
              if (testForSubStrAlm2 >= 0){
                newPageOneArray1[newIndexE] = `${u.alarmNr} ${u.alarmSfi} ${u.alarmName} OR ${tempVarUarray[0]} `;// u.alarmName//${e}
              }
            }
          })
        
          commonFile.forEach((arrayIndex)=>{
              //console.log(eArray,typeof(eArray));
              if (typeof(eArray) == "object"){return}
              eArray == undefined ? eArray ="EMPTY": null
              let strinifyAlarmTagCitext = JSON.stringify(eArray.toUpperCase());
              let testThisForAlm = (arrayIndex.citectName).toUpperCase()
              let testThisForAlmUpper = testThisForAlm.toUpperCase()
              let testForSubStrAlm = strinifyAlarmTagCitext.indexOf(testThisForAlmUpper);
              let testForSubStrPump = strinifyAlarmTagCitext.indexOf(`(${testThisForAlm}`);
              if (testForSubStrAlm >= 0) {
                newPageOneArray1[newIndexE] = `NAME OF TANK: ${arrayIndex.name} `;// u.alarmName//${e}
                return
              } else if (testForSubStrPump >= 0){
              console.log("pump found",strinifyAlarmTagCitext,testThisForAlm );
                newPageOneArray1[newIndexE] = `NAME OF PUMP:  ${arrayIndex.name} `;// u.alarmName//${e}
              }
          })

        });
        
        
        let newPageOneArray1test = [...new Set(newPageOneArray1)]
        let cleanArrayUp = cleanArray(newPageOneArray1test)
        newComplettArray.push(cleanArrayUp)
        
    })
    //console.log(newComplettArray);
    return newComplettArray
}