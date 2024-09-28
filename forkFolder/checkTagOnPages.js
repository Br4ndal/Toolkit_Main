"use strict";
const XLSX = require("xlsx")
const fs = require("fs");
const { unsubscribe } = require("diagnostics_channel");
const { config, exit, exitCode } = require("process");


checkPageAlarms ()

function checkPageAlarms (){
    
    let pageOne = "M_MNU_6_01"
    
    
    //getting all alarms to compare againt pgdobj file.
    const workbook1 = XLSX.readFile(`C:/Work/- AutoScript/IASProject/Citect_Project/argdig.DBF`); // reading file from file location
    let worksheet1 = workbook1.Sheets["Sheet1"]; // defing what sheet i want to read from
    const dataAI1 = XLSX.utils.sheet_to_json(worksheet1); // converting from sheet to json.
    let allAlarms = [];
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
  

    // for (let i = 0; i <= markers.length - 1; i++) {
    //     Object.assign(pgdynobjFile1(markers[i])[0])
    //     Object.assign(pgdynobjFile1(markers[i])[1])
    // }
  
    let newPageOneArray = ["MNU_6_01"]
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
    let newPageOneArray2 = [...new Set(newPageOneArray)];
    console.log(newPageOneArray.length);
    console.log(newPageOneArray1.length);
    console.log("finsied");

    let newTest = newPageOneArray2;

    newPageOneArray1.forEach((e,index) => {
      let newVar = e;
      let newIndexE = index
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
            newPageOneArray1[newIndexE] = `${u.alarmSfi} ${u.alarmName} `;// u.alarmName//${e}
            return
          }
        }else if(testForSubStrOR >=0){
          let eArrayIndex = eArray[0]
          let eArrayIndex1 = eArray[1]
          
          eArrayIndex1 == undefined ? eArrayIndex1="empty" : null
          eArrayIndex == undefined ? eArrayIndex1="empty" : null
          let strinifyAlarmTagCitext = JSON.stringify(eArrayIndex.toUpperCase());
          let strinifyAlarmTagCitext2 = JSON.stringify(eArrayIndex1.toUpperCase());
          let testThisForAlm = u.alarmNr
          let testThisForAlmUpper = testThisForAlm.toUpperCase()

          let testForSubStrAlm = strinifyAlarmTagCitext.indexOf(testThisForAlmUpper);
          let testForSubStrAlm2 = strinifyAlarmTagCitext2.indexOf(testThisForAlmUpper);
          if (testForSubStrAlm >= 0) {
            tempVarUarray =tempVarUarray.concat(` ${u.alarmSfi} ${u.alarmName}`);// u.alarmName//  ${e}
          }
          if (testForSubStrAlm2 >= 0){
            newPageOneArray1[newIndexE] = `${u.alarmSfi} ${u.alarmName} OR ${tempVarUarray[0]} `;// u.alarmName//${e}
          }
        }
      })
   
    });

    
    let newPageOneArray1test = [...new Set(newPageOneArray1)]
    let testNewClean= cleanArray(newPageOneArray1test)

    let ws = XLSX.utils.aoa_to_sheet(arrayFliperRowtoColumn(newPageOneArray), { origin: "A1" });
    XLSX.utils.sheet_add_aoa(ws, arrayFliperRowtoColumn(testNewClean), { origin: "B1" });
    XLSX.utils.sheet_add_aoa(ws, arrayFliperRowtoColumn(newPageOneArray1test), { origin: "C1" });
    XLSX.utils.sheet_add_aoa(ws, arrayFliperRowtoColumn(newTest), { origin: "D1" });
    const newWB = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(newWB, ws, "pageCheckAlarms");
    XLSX.writeFile(newWB, "C:/Work/- AutoScript/- Files AutoGen/pageCheckAlarms.xlsx");
}



function arrayFliperRowtoColumn(array, value) {
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

    let testThisForGetDspAnInfo= "GetDspAnInfo".toUpperCase()
    let testForSubStrDspAnInfo = strinifyAlarmTagCitext.indexOf(testThisForGetDspAnInfo);

    let testThisForGet_INH= "_INH".toUpperCase()
    let testForSubStr_INH = strinifyAlarmTagCitext.indexOf(testThisForGet_INH);
    
    let testThisForGetPC999_9999= "PC999_9999".toUpperCase()
    let testForSubStrPC999_9999 = strinifyAlarmTagCitext.indexOf(testThisForGetPC999_9999);

    let testThisForGetCallEngineer = "CallEngineer".toUpperCase()
    let testForSubStrCallEngineer  = strinifyAlarmTagCitext.indexOf(testThisForGetCallEngineer);

    if (testForSubStrsticker >=0 || testForSubStrPageinfo >=0 ||testForSubStrDeadMan >= 0
      ||testForSubStrGetGrpNameInfo >=0 || testForSubStrAlarmGetDsp >= 0 ||testForSubStrDspAnInfo >= 0
    || testForSubStr_INH >= 0 || testForSubStrPC999_9999 >=0 || testForSubStrCallEngineer >= 0   ){
        rowsDeleted.push(arrayIndex);
    } else{
      newCleanedArray.push(arrayIndex)
    }
  })
  //console.log(rowsDeleted.length);
  return newCleanedArray

}