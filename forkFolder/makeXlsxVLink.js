
"use strict";

const XLSX = require("xlsx")
const fs = require("fs")


// self.addEventListener("message", function (e) {
//   console.log("program started1 ", process.pid)
//   let data = e.data
//   console.log(data);
//   //tankdescMaking()
//   this.self.postMessage(autoVariableLinkFunction())
// })
autoVariableLinkFunction()
function autoVariableLinkFunction() {
  /*------------------- VARIABLES USED IN PROGRAM TO STORE------------------*/


  let tagsInToBeChecked = [];
  let arrayOfAlarmTagCitect = [];
  let allAlarms = [];

  //-------------------------- Program---------------------------------------

  //---------------------------- Getting Valve sfi  from valve setup file----------------------------------
  let valveConst = fs.readFileSync("C:/Work/- AutoScript/IASProject/Json_files/ValveSetup.json", 'utf-8');
  const valveConst1 = JSON.parse(valveConst);
  let valveFile = []
  for(let i=0; i< valveConst1.length;i++){
    let valveName = valveConst1[i].TagRef
    let tagSplitValve = valveName.split("V")
    let tagCombiV = `${tagSplitValve[0]}${tagSplitValve[1]}`
    valveFile.push(tagCombiV)
  }

  //---------------------------- Getting Pump SFI from Pumpsetup file-----------------
  let pumpConst = fs.readFileSync("C:/Work/- AutoScript/IASProject/Json_files/PumpSetup.json", 'utf-8');
  const pumpConst1 = JSON.parse(pumpConst);
  let pumpFile = []
  for(let i=0; i< pumpConst1.length;i++){
    pumpFile.push(`${pumpConst1[i].TagRef}`)
  }
  console.log(pumpFile);

  //---------------------------- Getting tank sfi ----------------------------------
  let tankContPS = fs.readFileSync("C:/Work/- AutoScript/IASProject/Json_files/Tank300SetupP.json", 'utf-8');
  const tankContPS1 = JSON.parse(tankContPS);
  let tankFilePS1 = []
  for(let i = 0; i < tankContPS1.length; i++){
    tankFilePS1.push(`${tankContPS1[i].TagRef}`)
  }
  let tankContSB = fs.readFileSync("C:/Work/- AutoScript/IASProject/Json_files/Tank300SetupS.json", 'utf-8');
  const tankContSB1 = JSON.parse(tankContSB);
  let tankFileSB1 = []
  for(let i = 0; i < tankContSB1.length; i++){
    tankFileSB1.push(`${tankContSB1[i].TagRef}`)
  }


  let TagRefArrayCombined = []//= pumpTagPS.concat(pumpTagSB,tankFilePS1); //[]//
  let combinedArraypumpAlarm = []// = pumpAlarmsPS.concat(pumpAlarmsSB); //[]//,tankFileS1
  // console.log("PUMP SFI");
  // console.log(TagRefArrayCombined)

  // getting info from IO-list
  const workbook3 = XLSX.readFile(`C:/Work/- AutoScript/IASProject/IAS_CTRL_Common_Files/IO Liste.xlsx`); // ${input}
  let worksheet3 = workbook3.Sheets["IO List"];
  const dataAI3 = XLSX.utils.sheet_to_json(worksheet3);

  let tagSfi = [];

  for (let i = 0; i < dataAI3.length; i++) {
    const tagXI = dataAI3[i][`ISA`];
    const alarmInfo = dataAI3[i][`Alarm`];
    const tagName = dataAI3[i][`Tag Name`];
    const IASTagName = dataAI3[i][`IAS Tag Name`];
    const SystemName = dataAI3[i][`System Name`];
    
    let alarmInfoString =  new String(alarmInfo)
    let alarmInfoUpper = alarmInfoString.toString().toUpperCase()
    let checkForcheckTagForV
     

    let TagForV = "V";
    let stringifycheckTagForV 
    (tagName !== undefined) ? stringifycheckTagForV = tagName.toUpperCase()  : null ;
    (tagName !== undefined) ? checkForcheckTagForV = stringifycheckTagForV.indexOf(TagForV): null ;
    

    if (tagName !== undefined && SystemName !== undefined && alarmInfoUpper != "YES" && (tagXI !== "OPN" && tagXI !== "SRT")) { 
      allAlarms = allAlarms.concat(tagName)
    }
    
    //Replacing valve SFI with only digits and taking away _OPN since this is not in variable file
    if(tagXI === "OPN" && checkForcheckTagForV > 1){
      //console.log(tagName);
      let res = tagName.replace("_OPN","")
      let tagSplitV = res.split("V")
      let tagCombiV = `${tagSplitV[0]}${tagSplitV[1]}`
      tagSfi = tagSfi.concat(tagCombiV);
      allAlarms = allAlarms.concat(tagCombiV)
    } else if (tagXI === "SRT"){
      let resSRT = tagName.replace("_SRT","")
      tagSfi = tagSfi.concat(resSRT);
      allAlarms = allAlarms.concat(resSRT)
    } else if (tagXI === "LI1"){
      let resLI1 = tagName.replace("_LI1","")
      tagSfi = tagSfi.concat(resLI1);
      allAlarms = allAlarms.concat(resLI1)
      console.log(typeof(resLI1),tagName);
    }
     else if (tagName !== undefined && SystemName !== undefined && alarmInfoUpper != "YES"  && tagXI !== "OPN" && tagXI !== "SRT") {
      tagSfi = tagSfi.concat(tagName);
    }
    
  }

  arrayOfAlarmTagCitect = tagSfi.concat(tankFilePS1)//,tankFileS1


  //her is the link for the main project.
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


  const pgdynobjComplett = [pdgFile1[0]]
  const pgdynobjComplettPage = [pdgFile1[1]]


  for (let i = 0; i <= markers.length - 1; i++) {
    pgdynobjComplett.push(pgdynobjFile1(markers[i])[0])
    pgdynobjComplettPage.push(pgdynobjFile1(markers[i])[1])
  }

  // CHECK THHE PRINT OUT AT THE END; ADDED MORE VARIABLES THEN NEEDED.-----------------------------------------------------------------------------------------
  // Combining all the pgdynogj files to one big array.
  const pgdynobjComplettCombined = pgdynobjComplett[0].concat(pgdynobjComplett[1], pgdynobjComplett[2], pgdynobjComplett[3], pgdynobjComplett[4], pgdynobjComplett[5], pgdynobjComplett[6], pgdynobjComplett[7], pgdynobjComplett[8], pgdynobjComplett[9], pgdynobjComplett[10], pgdynobjComplett[11], pgdynobjComplett[12], pgdynobjComplett[13])
  const pgdynobjComplettPageCombied = pgdynobjComplettPage[0].concat(pgdynobjComplettPage[1], pgdynobjComplettPage[2], pgdynobjComplettPage[3], pgdynobjComplettPage[4], pgdynobjComplettPage[5], pgdynobjComplettPage[6], pgdynobjComplettPage[7], pgdynobjComplettPage[8], pgdynobjComplettPage[9], pgdynobjComplettPage[10], pgdynobjComplettPage[11], pgdynobjComplettPage[12], pgdynobjComplettPage[13])

  console.log("Comparing " + pgdynobjComplettCombined.length + " off excel cells")

  //--------------------------------Pump COMMON ALARMS------------------------------
  let arrayObj1Pump = [];
  let arrayObj2Pump = [];
  //tagsInToBeChecked,,,,arrayOfAlarmTagCitect
  for (let i = 0; i <= TagRefArrayCombined.length - 1; i++) {
    arrayObj1Pump.push({ ID: TagRefArrayCombined[i], citectPage: "" })
  }
  for (let i = 0; i <= tagsInToBeChecked.length - 1; i++) {
    arrayObj2Pump.push({ ID: tagsInToBeChecked[i], citectPage: arrayOfAlarmTagCitect[i] })
  }
  //https://stackoverflow.com/questions/61370909/how-to-compare-two-arrays-and-change-the-name-if-id-matches
  arrayObj1Pump.forEach(e => {
    let idx1 = arrayObj2Pump.findIndex(u => u.ID == e.ID);

    if (idx1 >= 0) {
      e.citectPage = arrayObj2Pump[idx1].citectPage;
    }
  });
  let newFinalArrayAlmNrPump = [];
  let newFianlArrayPagePump = [];
  for (let i = 0; i <= arrayObj1Pump.length; i++) {
    if (arrayObj1Pump[i] != undefined) {
      newFinalArrayAlmNrPump = newFinalArrayAlmNrPump.concat(arrayObj1Pump[i].ID);
      newFianlArrayPagePump = newFianlArrayPagePump.concat(arrayObj1Pump[i].citectPage);
    }
  }


  let difference1PumpAlarm = [];
  let pageCitectPumpAlarm = [];
  for (let i = 0; i <= combinedArraypumpAlarm.length; i++) {
    let tempVar1P = combinedArraypumpAlarm[i];
    for (let j = 0; j <= pgdynobjComplettCombined.length; j++) {
      let tempVar2P = JSON.stringify(pgdynobjComplettCombined[j]);
      //console.log(tempVar1P,tempVar2P);
      if (tempVar1P !== undefined && tempVar2P !== undefined) {
        let controllValueP = tempVar2P.indexOf(combinedArraypumpAlarm[i]);
        if (controllValueP >= 0) {
          difference1PumpAlarm = difference1PumpAlarm.concat(`${newFianlArrayPagePump[i]}`); // , ${tempVar1}
          pageCitectPumpAlarm = pageCitectPumpAlarm.concat(pgdynobjComplettPageCombied[j]);
        }
      }
    }
  }
  let combinedArrayPumpAlarm2 = [];
  for (let i = 0; i <= difference1PumpAlarm.length - 1; i++) {
    combinedArrayPumpAlarm2 = combinedArrayPumpAlarm2.concat(`${difference1PumpAlarm[i]} ${pageCitectPumpAlarm[i]}`);
  }
  let uniqueCharsPumpAlarm = [...new Set(combinedArrayPumpAlarm2)];


  //splitting uniqueChars to get alarms and pages from them self
  let uniqueCharsSplitt1PumpAlarm = [];
  let uniqueCharsSplitt2PumpAlarm = [];

  for (let i = 0; i <= uniqueCharsPumpAlarm.length; i++) {
    if (uniqueCharsPumpAlarm[i] != undefined) {
      let temp1Pump = uniqueCharsPumpAlarm[i].split(" ");
      uniqueCharsSplitt1PumpAlarm = uniqueCharsSplitt1PumpAlarm.concat(temp1Pump[0])
      uniqueCharsSplitt2PumpAlarm = uniqueCharsSplitt2PumpAlarm.concat(temp1Pump[1])
    } else {
      false;
    }
  }

 
  // --------------------------------------------- Alarm Numbers to be linked --------------------
  //Compares alarm number from alarm_variables to the big pgdynobj file and tries to match if it matches i make an new array difference1
  let difference1 = [];
  let pageCitect = [];
  for (let i = 0; i <= arrayOfAlarmTagCitect.length; i++) {
    let tempVar1 = arrayOfAlarmTagCitect[i];
    for (let j = 0; j <= pgdynobjComplettCombined.length; j++) {
      let tempVar2 = JSON.stringify(pgdynobjComplettCombined[j]);
      if (tempVar1 !== undefined && tempVar2 !== undefined) {
        let controllValue = tempVar2.indexOf(arrayOfAlarmTagCitect[i]);
        if (controllValue >= 0) {
          difference1 = difference1.concat(tempVar1);
          pageCitect = pageCitect.concat(pgdynobjComplettPageCombied[j]);
        }
      }
    }
  }

  let combinedArray = [];
  for (let i = 0; i <= difference1.length - 1; i++) {
    combinedArray = combinedArray.concat(`${difference1[i]} ${pageCitect[i]}`);
  }
  let uniqueChars = [...new Set(combinedArray)];

  //splitting uniqueChars to get alarms and pages from them self
  let uniqueCharsSplitt1 = [];
  let uniqueCharsSplitt2 = [];

  for (let i = 0; i <= uniqueChars.length; i++) {
    if (uniqueChars[i] != undefined) {
      let temp1 = uniqueChars[i].split(" ");
      uniqueCharsSplitt1 = uniqueCharsSplitt1.concat(temp1[0])
      uniqueCharsSplitt2 = uniqueCharsSplitt2.concat(temp1[1])
    } else {
      false;
    }
  }

  //adding all different array togther before i start comparing and sorting them
  let combineduniqueCharsSplitt1 = [];
  let combineduniqueCharsSplitt2 = [];
  combineduniqueCharsSplitt1 = uniqueCharsSplitt1.concat(uniqueCharsSplitt1PumpAlarm);
  combineduniqueCharsSplitt2 = uniqueCharsSplitt2.concat( uniqueCharsSplitt2PumpAlarm);


  // --------------------- Comparing alarm numbers and sorting-------------------------------------------------------
  //https://stackoverflow.com/questions/49215358/checking-for-duplicate-strings-in-javascript-array
  let findDuplicates = arr => arr.filter((item, index) => arr.indexOf(item) != index)
  let alarmSeveralPages = ["Alarms to be checked !", ...findDuplicates(combineduniqueCharsSplitt1)]

  //making dummy array for alarm
  let dummyArray1 = [];
  for (let i = 0; i <= allAlarms.length; i++) {
    dummyArray1.push("");
  }

  let arrayObj1 = [];
  let arrayObj2 = [];

  for (let i = 0; i <= allAlarms.length - 1; i++) {
    arrayObj1.push({ ID: allAlarms[i], citectPage: dummyArray1[i] })
  }

  for (let i = 0; i <= combineduniqueCharsSplitt1.length - 1; i++) {
    arrayObj2.push({ ID: combineduniqueCharsSplitt1[i], citectPage: combineduniqueCharsSplitt2[i] })
  }

  //https://stackoverflow.com/questions/61370909/how-to-compare-two-arrays-and-change-the-name-if-id-matches
  arrayObj1.forEach(e => {
    let idx1 = arrayObj2.findIndex(u => u.ID == e.ID);
    if (idx1 >= 0) {
      e.citectPage = arrayObj2[idx1].citectPage;
    }
  });

  //-------------------------- replacing valve info to citect tag------------------------------
  let valveObj = [];
  //making an object  with the valveFile array
  for (let i = 0; i <= valveFile.length - 1; i++) {
    valveObj.push({ ID: valveFile[i], citectPage: dummyArray1[i] })
  }
  //checking the arrayObj1 tp find if i have any valve matches and replace it with sfi +_CMD
  arrayObj1.forEach(e => {
    let idx1 = valveObj.findIndex(u => u.ID == e.ID);
    if (idx1 >= 0) {
      e.ID = `${valveObj[idx1].ID}_CMD`;
    }
  });

  let newFinalArrayAlmNr = [];
  let newFianlArrayPage = [];

  for (let i = 0; i <= arrayObj1.length; i++) {
    if (arrayObj1[i] != undefined) {
      newFinalArrayAlmNr = newFinalArrayAlmNr.concat(arrayObj1[i].ID);
      newFianlArrayPage = newFianlArrayPage.concat(arrayObj1[i].citectPage);
    }
  }

  //will check the length of page name if its over 10 caracters it will need to be checked. 
  let pageDifference = ["Alarms with not usable Alarm link"];
  for (let i = 0; i < newFianlArrayPage.length; i++) {
    let checkedForPageName = newFianlArrayPage[i].length
    if (checkedForPageName > 10 && newFianlArrayPage[i] !== "") {
      pageDifference.push(newFinalArrayAlmNr[i] + " " + newFianlArrayPage[i])
    }
  }


  let ws = XLSX.utils.aoa_to_sheet(arrayFliperRowtoColumn(newFinalArrayAlmNr), { origin: "A1" });
  XLSX.utils.sheet_add_aoa(ws, arrayFliperRowtoColumn(newFianlArrayPage), { origin: "B1" });
  XLSX.utils.sheet_add_aoa(ws, arrayFliperRowtoColumn(alarmSeveralPages), { origin: "D1" });
  XLSX.utils.sheet_add_aoa(ws, arrayFliperRowtoColumn(pageDifference), { origin: "C1" });

  const newWB = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(newWB, ws, "Citet_VariableLink");

  XLSX.writeFile(newWB, "C:/Work/- AutoScript/- Files AutoGen/Citect_Variable_Link.xlsx");
  return "File completed find file her : C:/Work/- AutoScript/- Files AutoGen"

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


 //her i am extracting all info of where tags and alarms are placed. from the pdgfile 
  // in the function i will take away empty undefined cells also the empty ones.
  function pgdynobjFile1(filepathPgd) {
    let checkingPath0 = [];
    let citectPageFromPgd = []

    const workbook = XLSX.readFile(filepathPgd);
    let worksheet = workbook.Sheets["Sheet1"];
    const dataAI = XLSX.utils.sheet_to_json(worksheet);

    for (const address3 of dataAI) {
      const getingColumnInfo = address3[`COL_A`];
      const getingColumnInfo1 = address3[`TXT_A`];
      const getingColumnInfo2 = address3[`VISIBLE`];
      const getingColumnInfo3 = address3[`COL_ARR`];
      const getingColumnInfo4 = address3[`TXT_STR`];
      const getingColumnInfo5 = address3[`COL_B`];
      const getingColumnInfo6 = address3[`TXT_B`];
      const getingColumnInfo7 = address3[`SET_ARR`];
      const getingColumnInfo8 = address3[`TXT_C`];
      const getingColumnInfo9 = address3[`PAGE`];
      const getingColumnInfo10 = address3[`COMMENT`]
      const getingColumnInfo11 = address3[`DESC`]
     
      if (getingColumnInfo != undefined) {
        checkingPath0 = checkingPath0.concat((getingColumnInfo.toUpperCase()));
        citectPageFromPgd = citectPageFromPgd.concat((getingColumnInfo9.toUpperCase()));
      }
      if (getingColumnInfo1 != undefined) {
        checkingPath0 = checkingPath0.concat((getingColumnInfo1.toUpperCase()));
        citectPageFromPgd = citectPageFromPgd.concat((getingColumnInfo9.toUpperCase()));
      }
      if (getingColumnInfo2 != undefined) {
        checkingPath0 = checkingPath0.concat((getingColumnInfo2.toUpperCase()));
        citectPageFromPgd = citectPageFromPgd.concat((getingColumnInfo9.toUpperCase()));
      }
      if (getingColumnInfo3 != undefined) {
        checkingPath0 = checkingPath0.concat((getingColumnInfo3.toUpperCase()));
        citectPageFromPgd = citectPageFromPgd.concat((getingColumnInfo9.toUpperCase()));
      }
      if (getingColumnInfo4 != undefined) {
        checkingPath0 = checkingPath0.concat((getingColumnInfo4.toUpperCase()));
        citectPageFromPgd = citectPageFromPgd.concat((getingColumnInfo9.toUpperCase()));
      }
      if (getingColumnInfo5 != undefined) {
        checkingPath0 = checkingPath0.concat((getingColumnInfo5.toUpperCase()));
        citectPageFromPgd = citectPageFromPgd.concat((getingColumnInfo9.toUpperCase()));
      }
      if (getingColumnInfo6 != undefined) {
        checkingPath0 = checkingPath0.concat((getingColumnInfo6.toUpperCase()));
        citectPageFromPgd = citectPageFromPgd.concat((getingColumnInfo9.toUpperCase()));
      }
      if (getingColumnInfo7 != undefined) {
        checkingPath0 = checkingPath0.concat((getingColumnInfo7.toUpperCase()));
        citectPageFromPgd = citectPageFromPgd.concat((getingColumnInfo9.toUpperCase()));
      }
      if (getingColumnInfo8 != undefined) {
        checkingPath0 = checkingPath0.concat((getingColumnInfo8.toUpperCase()));
        citectPageFromPgd = citectPageFromPgd.concat((getingColumnInfo9.toUpperCase()));
      }
      if (getingColumnInfo10 != undefined) {
        checkingPath0 = checkingPath0.concat((getingColumnInfo10.toUpperCase()));
        citectPageFromPgd = citectPageFromPgd.concat((getingColumnInfo9.toUpperCase()));
      }
      if (getingColumnInfo11 != undefined) {
        checkingPath0 = checkingPath0.concat((getingColumnInfo11.toUpperCase()));
        citectPageFromPgd = citectPageFromPgd.concat((getingColumnInfo9.toUpperCase()));
      }
    }
    return [checkingPath0, citectPageFromPgd]
  }