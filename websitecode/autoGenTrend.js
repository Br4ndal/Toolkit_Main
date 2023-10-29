"use strict";
/*
https://www.youtube.com/watch?v=VShtPwEkDD0&ab_channel=WebDevSimplified


Descrption of Program: 


*/

//--------------------------------- Variables -------------------------------

// Arrays for alarms
let arrayForClusterNameAlm = [];
let arrayForTypeAlm = [];
let arrayForSamplePeriodeAlm = [];
let arrayForFileNameAlm = [];
let arrayForNoFilesAlm = [];
let arrayForPeriodeAlm = [];
let arrayForTimeAlm = [];
let arrayForStorrageMethodAlm = [];

let arrayForExperssionAlm = [];
let arrayForCommentAlm = [];
let arrayForTagNameAlm = [];
let arrayForProjectAlm = [];

// arrays for tags
let arrayForTagNameTag = [];
let arrayForClusterNameTag = [];
let arrayForTypeTag = [];
let arrayForExperssionTag = [];
let arrayForSamplePeriodeTag = [];
let arrayForCommentTag = [];
let arrayForFileNameTag = [];
let arrayForNoFilesTag = [];
let arrayForPeriodeTag = [];
let arrayForTimeTag = [];
let arrayForStorrageMethodTag = [];
let arrayForProjectTag = [];

// arrays for tank portside
let arrayForTagNameTkPs = [];
let arrayForClusterNameTkPs = [];
let arrayForTypeTkPs = [];
let arrayForExperssionTkPs = [];
let arrayForSamplePeriodeTkPs = [];
let arrayForCommentTkPs = [];
let arrayForFileNameTkPs = [];
let arrayForNoFilesTkPs = [];
let arrayForPeriodeTkPs = [];
let arrayForTimeTkPs = [];
let arrayForStorrageMethodTkPs = [];
let arrayForProjectTkPs = [];

// arrays for tank stbd
let arrayForTagNameTkSb = [];
let arrayForClusterNameTkSb = [];
let arrayForTypeTkSb = [];
let arrayForExperssionTkSb = [];
let arrayForSamplePeriodeTkSb = [];
let arrayForCommentTkSb = [];
let arrayForFileNameTkSb = [];
let arrayForNoFilesTkSb = [];
let arrayForPeriodeTkSb = [];
let arrayForTimeTkSb = [];
let arrayForStorrageMethodTkSb = [];
let arrayForProjectTkSb = [];

//arrays for Flowmeter Portside

let arrayForTagNameFmPs = [];
let arrayForClusterNameFmPs = [];
let arrayForTypeFmPs = [];
let arrayForExperssionFmPs = [];
let arrayForSamplePeriodeFmPs = [];
let arrayForCommentFmPs = [];
let arrayForFileNameFmPs = [];
let arrayForNoFilesFmPs = [];
let arrayForPeriodeFmPs = [];
let arrayForTimeFmPs = [];
let arrayForStorrageMethodFmPs = [];
let arrayForProjectFmPs = [];

//arrays for Flowmeter stbd

let arrayForTagNameFmSb = [];
let arrayForClusterNameFmSb = [];
let arrayForTypeFmSb = [];
let arrayForExperssionFmSb = [];
let arrayForSamplePeriodeFmSb = [];
let arrayForCommentFmSb = [];
let arrayForFileNameFmSb = [];
let arrayForNoFilesFmSb = [];
let arrayForPeriodeFmSb = [];
let arrayForTimeFmSb = [];
let arrayForStorrageMethodFmSb = [];
let arrayForProjectFmSb = [];

//------------------------------- Getting other Librarys ----------------------------
//const ExcelJS = require('exceljs');
const XLSX = require("xlsx");
const fs = require("fs");
const prompt = require("prompt-sync")();
const { Console } = require("console");
const { exit } = require("process");

//-------------------------- Program---------------------------------------
console.log("Example of proejct name should be :  NB910, NB887  NBXXX");
const input = prompt("Please enter name of Project(Look at example above) : ");
console.log(`you have entered ${input}`);
console.log("Creating file please wait");

console.log(
  "This script will auto generate trends file for citect 8.20 from IO list"
);
console.log("Rename IO-list file to this = IO_List");
const workbook = XLSX.readFile(`C:/Toolkit_script/IO_List.xlsx`); // ${input}
let worksheet = workbook.Sheets["IO List"];
const dataAI = XLSX.utils.sheet_to_json(worksheet);

//Getting information from IO-list and putting tag in a new array
for (const address of dataAI) {
  const tagXI = address[`ISA`]; // only used for flowmeters, and its only IO list for nb910 so has IAS
  const alarmInfo = address[`Alarm`];
  const tagName = address[`Tag Name`];
  const systemName = address[`System Name`];
  const tagInfo = address[`Signal Description`];
  //const supplierCode = address[`Supplier   Code`];  // not in use
  const signalType = address[`SensorSignalType`];
  const IASTagName = address[`IAS Tag Name`];

  const nodeCab = address[`Node`];
  //const stationNr = address[`Station No.`];
  // let newTagName = JSON.stringify(tagName);
  // let makingStringOfSupplierCode = JSON.stringify(tagInfo);
  // let substr = 'Pump';
  // let substr1 = 'alve';

  // Variables to test for flowmeter in IO list
  let testForSubstr;
  let testForSubstr2;
  let valueFromElseFlowMeter;
  let valuefromElseflowmeter;
  const tagInfoLowCase = address[`Signal Description`];
  if (tagInfoLowCase === undefined || tagInfoLowCase == "") {
    false;
  } else {
    //console.log(typeof(tagInfoLowCase) ,tagInfoLowCase);
    let substr = "flowmeter".toLowerCase();
    let substr2 = "flow meter".toLowerCase();
    testForSubstr = tagInfoLowCase.indexOf(substr);
    testForSubstr2 = tagInfoLowCase.indexOf(substr2);
    //valueFromElseFlowMeter = testForSubstr;
    //valuefromElseflowmeter = testForSubstr2;
  }

  // if (tagInfo === undefined || tagInfo == ""){
  //     false; // do nothing only want to take away error because of when cell is undfined it wont check cell.
  // } else{
  //     testForPumpInTagInfo = makingStringOfSupplierCode.indexOf(substr); // if it returns 0 it has found the word Loop if not its -1
  //     testForValveInTagInfo = makingStringOfSupplierCode.indexOf(substr1);
  // }

  if (
    (signalType == "AIC" || signalType == "AI") &&
    (alarmInfo == "Yes" ||
      alarmInfo == "YES" ||
      alarmInfo == "Mon" ||
      alarmInfo == "MON")
  ) {
    arrayForTagNameAlm = arrayForTagNameAlm.concat(IASTagName);
    arrayForClusterNameAlm = arrayForClusterNameAlm.concat("IAS");
    arrayForTypeAlm = arrayForTypeAlm.concat("TRN_PERIODIC");
    arrayForExperssionAlm = arrayForExperssionAlm.concat(IASTagName + "_VAL");
    arrayForSamplePeriodeAlm = arrayForSamplePeriodeAlm.concat("00:00:02");
    arrayForCommentAlm = arrayForCommentAlm.concat(tagInfo);
    arrayForFileNameAlm = arrayForFileNameAlm.concat("");
    arrayForNoFilesAlm = arrayForNoFilesAlm.concat("3");
    arrayForPeriodeAlm = arrayForPeriodeAlm.concat("1st");
    arrayForTimeAlm = arrayForTimeAlm.concat("");
    arrayForStorrageMethodAlm = arrayForStorrageMethodAlm.concat(
      "Floating Point (8-byte samples)"
    );
    if (systemName === "PMS") {
      arrayForProjectAlm = arrayForProjectAlm.concat(`${input}_PMS`);
    } else if (systemName === "HVAC") {
      arrayForProjectAlm = arrayForProjectAlm.concat(`${input}_HVAC`);
    } else if (
      systemName === "DG 1" ||
      systemName === "DG 2" ||
      systemName === "DG 3" ||
      systemName === "DG 4"
    ) {
      arrayForProjectAlm = arrayForProjectAlm.concat(`${input}_Engines`);
    } else {
      arrayForProjectAlm = arrayForProjectAlm.concat(`${input}_Systems`);
    }
  } else if (
    (signalType == "AIC" ||
      (signalType == "AI" && systemName !== "Sounding")) &&
    ((tagXI !== "FI1" && signalType == "AI") ||
      alarmInfo !== "Yes" ||
      alarmInfo !== "YES" ||
      alarmInfo !== "Mon" ||
      alarmInfo !== "MON")
  ) {
    //   && (tagInfo == "Spare" || tagInfo == "spare")
    arrayForTagNameTag = arrayForTagNameTag.concat("t" + tagName);
    arrayForClusterNameTag = arrayForClusterNameTag.concat("IAS");
    arrayForTypeTag = arrayForTypeTag.concat("TRN_PERIODIC");
    arrayForExperssionTag = arrayForExperssionTag.concat(tagName);
    arrayForSamplePeriodeTag = arrayForSamplePeriodeTag.concat("00:00:02");
    arrayForCommentTag = arrayForCommentTag.concat(tagInfo);
    arrayForFileNameTag = arrayForFileNameTag.concat("");
    arrayForNoFilesTag = arrayForNoFilesTag.concat("3");
    arrayForPeriodeTag = arrayForPeriodeTag.concat("1st");
    arrayForTimeTag = arrayForTimeTag.concat("");
    arrayForStorrageMethodTag = arrayForStorrageMethodTag.concat(
      "Floating Point (8-byte samples)"
    );
    if (systemName === "PMS") {
      arrayForProjectTag = arrayForProjectTag.concat(`${input}_PMS`);
    } else if (systemName === "HVAC") {
      arrayForProjectTag = arrayForProjectTag.concat(`${input}_HVAC`);
    } else if (
      systemName === "DG 1" ||
      systemName === "DG 2" ||
      systemName === "DG 3" ||
      systemName === "DG 4"
    ) {
      arrayForProjectTag = arrayForProjectTag.concat(`${input}_Engines`);
    } else {
      arrayForProjectTag = arrayForProjectTag.concat(`${input}_Systems`);
    }
  } else if (
    systemName === "Sounding" &&
    signalType == "AI" &&
    nodeCab === "Contr01Port"
  ) {
    //console.log(arrayForTagNameTkPs);
    if (arrayForTagNameTkPs.length < 10) {
      arrayForTagNameTkPs = arrayForTagNameTkPs.concat(
        "PS_Tank00" + (arrayForTagNameTkPs.length + 1) + "_LEV"
      );
    }
    if (arrayForTagNameTkPs.length >= 9) {
      arrayForTagNameTkPs = arrayForTagNameTkPs.concat(
        "PS_Tank0" + (arrayForTagNameTkPs.length + 1) + "_LEV"
      );
    }
    if (arrayForTagNameTkPs.length >= 99) {
      arrayForTagNameTkPs = arrayForTagNameTkPs.concat(
        "PS_Tank" + (arrayForTagNameTkPs.length + 1) + "_LEV"
      );
    }

    arrayForClusterNameTkPs = arrayForClusterNameTkPs.concat("IAS");
    arrayForTypeTkPs = arrayForTypeTkPs.concat("TRN_PERIODIC");
    arrayForExperssionTkPs = arrayForExperssionTkPs.concat(tagName);
    arrayForSamplePeriodeTkPs = arrayForSamplePeriodeTkPs.concat("00:00:02");
    arrayForCommentTkPs = arrayForCommentTkPs.concat(tagInfo);
    arrayForFileNameTkPs = arrayForFileNameTkPs.concat("");
    arrayForNoFilesTkPs = arrayForNoFilesTkPs.concat("3"); // make this to variables
    arrayForPeriodeTkPs = arrayForPeriodeTkPs.concat("1st");
    arrayForTimeTkPs = arrayForTimeTkPs.concat("");
    arrayForStorrageMethodTkPs = arrayForStorrageMethodTkPs.concat(
      "Floating Point (8-byte samples)"
    );
    arrayForProjectTkPs = arrayForProjectTkPs.concat(`${input}_Tank`);
  } else if (
    systemName === "Sounding" &&
    signalType == "AI" &&
    nodeCab === "Contr02Stbd"
  ) {
    //console.log(arrayForTagNameTkSb);
    if (arrayForTagNameTkSb.length < 10) {
      arrayForTagNameTkSb = arrayForTagNameTkSb.concat(
        "SB_Tank00" + (arrayForTagNameTkSb.length + 1) + "_LEV"
      );
    }
    if (arrayForTagNameTkSb.length >= 9) {
      arrayForTagNameTkSb = arrayForTagNameTkSb.concat(
        "SB_Tank0" + (arrayForTagNameTkSb.length + 1) + "_LEV"
      );
    }
    if (arrayForTagNameTkSb.length >= 99) {
      arrayForTagNameTkSb = arrayForTagNameTkSb.concat(
        "SB_Tank" + (arrayForTagNameTkSb.length + 1) + "_LEV"
      );
    }

    arrayForClusterNameTkSb = arrayForClusterNameTkSb.concat("IAS");
    arrayForTypeTkSb = arrayForTypeTkSb.concat("TRN_PERIODIC");
    arrayForExperssionTkSb = arrayForExperssionTkSb.concat(tagName);
    arrayForSamplePeriodeTkSb = arrayForSamplePeriodeTkSb.concat("00:00:02");
    arrayForCommentTkSb = arrayForCommentTkSb.concat(tagInfo);
    arrayForFileNameTkSb = arrayForFileNameTkSb.concat("");
    arrayForNoFilesTkSb = arrayForNoFilesTkSb.concat("3");
    arrayForPeriodeTkSb = arrayForPeriodeTkSb.concat("1st");
    arrayForTimeTkSb = arrayForTimeTkSb.concat("");
    arrayForStorrageMethodTkSb = arrayForStorrageMethodTkSb.concat(
      "Floating Point (8-byte samples)"
    );
    arrayForProjectTkSb = arrayForProjectTkSb.concat(`${input}_Tank`);
  } else if (
    (tagXI === "FI1" || tagXI === "FI") &&
    nodeCab === "Contr01Port" &&
    tagInfo !== "Spare"
  ) {
    console.log(tagXI, tagInfo);
    if (arrayForTagNameFmPs.length < 10) {
      arrayForTagNameFmPs = arrayForTagNameFmPs.concat(
        "PS_FLOW0" + (arrayForTagNameFmPs.length + 1) + "_INS"
      );
    }
    if (arrayForTagNameFmPs.length >= 9) {
      arrayForTagNameFmPs = arrayForTagNameFmPs.concat(
        "PS_FLOW" + (arrayForTagNameFmPs.length + 1) + "_INS"
      );
    }

    arrayForClusterNameFmPs = arrayForClusterNameFmPs.concat("IAS");
    arrayForTypeFmPs = arrayForTypeFmPs.concat("TRN_PERIODIC");
    arrayForExperssionFmPs = arrayForExperssionFmPs.concat(tagName);
    arrayForSamplePeriodeFmPs = arrayForSamplePeriodeFmPs.concat("00:00:02");
    arrayForCommentFmPs = arrayForCommentFmPs.concat(tagInfo);
    arrayForFileNameFmPs = arrayForFileNameFmPs.concat("");
    arrayForNoFilesFmPs = arrayForNoFilesFmPs.concat("3"); // make this to variables
    arrayForPeriodeFmPs = arrayForPeriodeFmPs.concat("1st");
    arrayForTimeFmPs = arrayForTimeFmPs.concat("");
    arrayForStorrageMethodFmPs = arrayForStorrageMethodFmPs.concat(
      "Floating Point (8-byte samples)"
    );
    arrayForProjectFmPs = arrayForProjectFmPs.concat(`${input}_Systems`);
  }
}

function arrayFliperRowtoColumn(array, value) {
  const addressObjecToArray = Object.values(array);
  const result = Object.keys(addressObjecToArray).map((key) => [
    addressObjecToArray[key],
  ]);

  // returns value of hardwired to an object and i convert to column
  if (value === "1") {
    let worksheet = result.map(function (v) {
      return [JSON.stringify(v)];
    });
    return worksheet;
  } else {
    let worksheet = result.map(function (v) {
      return [v];
    });
    return worksheet;
  }
}

let startOFNextSignals = arrayForTagNameAlm.length + 1; // start row for tags
let startOfNextSignalTkPs =
  arrayForTagNameAlm.length + arrayForTagNameTag.length + 1;
let startOfNextSignalTkSb = startOfNextSignalTkPs + arrayForTagNameTkPs.length; // 2447;
let startOfNextSignalFmPs = startOfNextSignalTkSb + arrayForTagNameTkPs.length;
console.log(arrayForTagNameTag.length);
//console.log(startOfNextSignalTkSb);
let ws = XLSX.utils.aoa_to_sheet(arrayFliperRowtoColumn(arrayForTagNameAlm), {
  origin: "A1",
}); // Tag Name
XLSX.utils.sheet_add_aoa(ws, arrayFliperRowtoColumn(arrayForClusterNameAlm), {
  origin: "B1",
}); // Cluster
XLSX.utils.sheet_add_aoa(ws, arrayFliperRowtoColumn(arrayForTypeAlm), {
  origin: "C1",
}); // Type
XLSX.utils.sheet_add_aoa(ws, arrayFliperRowtoColumn(arrayForExperssionAlm), {
  origin: "D1",
}); // Experssion
XLSX.utils.sheet_add_aoa(ws, arrayFliperRowtoColumn(arrayForSamplePeriodeAlm), {
  origin: "E1",
}); // Sample periode
XLSX.utils.sheet_add_aoa(ws, arrayFliperRowtoColumn(arrayForCommentAlm), {
  origin: "F1",
}); // Comment
XLSX.utils.sheet_add_aoa(ws, arrayFliperRowtoColumn(arrayForFileNameAlm), {
  origin: "G1",
}); //File Name
XLSX.utils.sheet_add_aoa(ws, arrayFliperRowtoColumn(arrayForNoFilesAlm), {
  origin: "H1",
}); // no. Files
XLSX.utils.sheet_add_aoa(ws, arrayFliperRowtoColumn(arrayForPeriodeAlm), {
  origin: "I1",
}); // Periode
XLSX.utils.sheet_add_aoa(ws, arrayFliperRowtoColumn(arrayForTimeAlm), {
  origin: "J1",
}); //Time
XLSX.utils.sheet_add_aoa(
  ws,
  arrayFliperRowtoColumn(arrayForStorrageMethodAlm),
  { origin: "K1" }
); //Storage metode
XLSX.utils.sheet_add_aoa(ws, arrayFliperRowtoColumn(arrayForProjectAlm), {
  origin: "L1",
}); //Project

XLSX.utils.sheet_add_aoa(ws, arrayFliperRowtoColumn(arrayForTagNameTag), {
  origin: `A${startOFNextSignals}`,
}); // Tag Name
XLSX.utils.sheet_add_aoa(ws, arrayFliperRowtoColumn(arrayForClusterNameTag), {
  origin: `B${startOFNextSignals}`,
}); // Cluster
XLSX.utils.sheet_add_aoa(ws, arrayFliperRowtoColumn(arrayForTypeTag), {
  origin: `C${startOFNextSignals}`,
}); // Type
XLSX.utils.sheet_add_aoa(ws, arrayFliperRowtoColumn(arrayForExperssionTag), {
  origin: `D${startOFNextSignals}`,
}); // Experssion
XLSX.utils.sheet_add_aoa(ws, arrayFliperRowtoColumn(arrayForSamplePeriodeTag), {
  origin: `E${startOFNextSignals}`,
}); // Sample periode
XLSX.utils.sheet_add_aoa(ws, arrayFliperRowtoColumn(arrayForCommentTag), {
  origin: `F${startOFNextSignals}`,
}); // Comment
XLSX.utils.sheet_add_aoa(ws, arrayFliperRowtoColumn(arrayForFileNameTag), {
  origin: `G${startOFNextSignals}`,
}); //File Name
XLSX.utils.sheet_add_aoa(ws, arrayFliperRowtoColumn(arrayForNoFilesTag), {
  origin: `H${startOFNextSignals}`,
}); // no. Files
XLSX.utils.sheet_add_aoa(ws, arrayFliperRowtoColumn(arrayForPeriodeTag), {
  origin: `I${startOFNextSignals}`,
}); // Periode
XLSX.utils.sheet_add_aoa(ws, arrayFliperRowtoColumn(arrayForTimeTag), {
  origin: `J${startOFNextSignals}`,
}); //Time
XLSX.utils.sheet_add_aoa(
  ws,
  arrayFliperRowtoColumn(arrayForStorrageMethodTag),
  { origin: `K${startOFNextSignals}` }
); //Storage metode
XLSX.utils.sheet_add_aoa(ws, arrayFliperRowtoColumn(arrayForProjectTag), {
  origin: `L${startOFNextSignals}`,
}); //Project

XLSX.utils.sheet_add_aoa(ws, arrayFliperRowtoColumn(arrayForTagNameTkPs), {
  origin: `A${startOfNextSignalTkPs}`,
}); // Tag Name
XLSX.utils.sheet_add_aoa(ws, arrayFliperRowtoColumn(arrayForClusterNameTkPs), {
  origin: `B${startOfNextSignalTkPs}`,
}); // Cluster
XLSX.utils.sheet_add_aoa(ws, arrayFliperRowtoColumn(arrayForTypeTkPs), {
  origin: `C${startOfNextSignalTkPs}`,
}); // Type
XLSX.utils.sheet_add_aoa(ws, arrayFliperRowtoColumn(arrayForExperssionTkPs), {
  origin: `D${startOfNextSignalTkPs}`,
}); // Experssion
XLSX.utils.sheet_add_aoa(
  ws,
  arrayFliperRowtoColumn(arrayForSamplePeriodeTkPs),
  { origin: `E${startOfNextSignalTkPs}` }
); // Sample periode
XLSX.utils.sheet_add_aoa(ws, arrayFliperRowtoColumn(arrayForCommentTkPs), {
  origin: `F${startOfNextSignalTkPs}`,
}); // Comment
XLSX.utils.sheet_add_aoa(ws, arrayFliperRowtoColumn(arrayForFileNameTkPs), {
  origin: `G${startOfNextSignalTkPs}`,
}); //File Name
XLSX.utils.sheet_add_aoa(ws, arrayFliperRowtoColumn(arrayForNoFilesTkPs), {
  origin: `H${startOfNextSignalTkPs}`,
}); // no. Files
XLSX.utils.sheet_add_aoa(ws, arrayFliperRowtoColumn(arrayForPeriodeTkPs), {
  origin: `I${startOfNextSignalTkPs}`,
}); // Periode
XLSX.utils.sheet_add_aoa(ws, arrayFliperRowtoColumn(arrayForTimeTkPs), {
  origin: `J${startOfNextSignalTkPs}`,
}); //Time
XLSX.utils.sheet_add_aoa(
  ws,
  arrayFliperRowtoColumn(arrayForStorrageMethodTkPs),
  { origin: `K${startOfNextSignalTkPs}` }
); //Storage metode
XLSX.utils.sheet_add_aoa(ws, arrayFliperRowtoColumn(arrayForProjectTkPs), {
  origin: `L${startOfNextSignalTkPs}`,
}); //Project

XLSX.utils.sheet_add_aoa(ws, arrayFliperRowtoColumn(arrayForTagNameTkSb), {
  origin: `A${startOfNextSignalTkSb}`,
}); // Tag Name
XLSX.utils.sheet_add_aoa(ws, arrayFliperRowtoColumn(arrayForClusterNameTkSb), {
  origin: `B${startOfNextSignalTkSb}`,
}); // Cluster
XLSX.utils.sheet_add_aoa(ws, arrayFliperRowtoColumn(arrayForTypeTkSb), {
  origin: `C${startOfNextSignalTkSb}`,
}); // Type
XLSX.utils.sheet_add_aoa(ws, arrayFliperRowtoColumn(arrayForExperssionTkSb), {
  origin: `D${startOfNextSignalTkSb}`,
}); // Experssion
XLSX.utils.sheet_add_aoa(
  ws,
  arrayFliperRowtoColumn(arrayForSamplePeriodeTkSb),
  { origin: `E${startOfNextSignalTkSb}` }
); // Sample periode
XLSX.utils.sheet_add_aoa(ws, arrayFliperRowtoColumn(arrayForCommentTkSb), {
  origin: `F${startOfNextSignalTkSb}`,
}); // Comment
XLSX.utils.sheet_add_aoa(ws, arrayFliperRowtoColumn(arrayForFileNameTkSb), {
  origin: `G${startOfNextSignalTkSb}`,
}); //File Name
XLSX.utils.sheet_add_aoa(ws, arrayFliperRowtoColumn(arrayForNoFilesTkSb), {
  origin: `H${startOfNextSignalTkSb}`,
}); // no. Files
XLSX.utils.sheet_add_aoa(ws, arrayFliperRowtoColumn(arrayForPeriodeTkSb), {
  origin: `I${startOfNextSignalTkSb}`,
}); // Periode
XLSX.utils.sheet_add_aoa(ws, arrayFliperRowtoColumn(arrayForTimeTkSb), {
  origin: `J${startOfNextSignalTkSb}`,
}); //Time
XLSX.utils.sheet_add_aoa(
  ws,
  arrayFliperRowtoColumn(arrayForStorrageMethodTkSb),
  { origin: `K${startOfNextSignalTkSb}` }
); //Storage metode
XLSX.utils.sheet_add_aoa(ws, arrayFliperRowtoColumn(arrayForProjectTkSb), {
  origin: `L${startOfNextSignalTkSb}`,
}); //Project

XLSX.utils.sheet_add_aoa(ws, arrayFliperRowtoColumn(arrayForTagNameFmPs), {
  origin: `A${startOfNextSignalFmPs}`,
}); // Tag Name
XLSX.utils.sheet_add_aoa(ws, arrayFliperRowtoColumn(arrayForClusterNameFmPs), {
  origin: `B${startOfNextSignalFmPs}`,
}); // Cluster
XLSX.utils.sheet_add_aoa(ws, arrayFliperRowtoColumn(arrayForTypeFmPs), {
  origin: `C${startOfNextSignalFmPs}`,
}); // Type
XLSX.utils.sheet_add_aoa(ws, arrayFliperRowtoColumn(arrayForExperssionFmPs), {
  origin: `D${startOfNextSignalFmPs}`,
}); // Experssion
XLSX.utils.sheet_add_aoa(
  ws,
  arrayFliperRowtoColumn(arrayForSamplePeriodeFmPs),
  { origin: `E${startOfNextSignalFmPs}` }
); // Sample periode
XLSX.utils.sheet_add_aoa(ws, arrayFliperRowtoColumn(arrayForCommentFmPs), {
  origin: `F${startOfNextSignalFmPs}`,
}); // Comment
XLSX.utils.sheet_add_aoa(ws, arrayFliperRowtoColumn(arrayForFileNameFmPs), {
  origin: `G${startOfNextSignalFmPs}`,
}); //File Name
XLSX.utils.sheet_add_aoa(ws, arrayFliperRowtoColumn(arrayForNoFilesFmPs), {
  origin: `H${startOfNextSignalFmPs}`,
}); // no. Files
XLSX.utils.sheet_add_aoa(ws, arrayFliperRowtoColumn(arrayForPeriodeFmPs), {
  origin: `I${startOfNextSignalFmPs}`,
}); // Periode
XLSX.utils.sheet_add_aoa(ws, arrayFliperRowtoColumn(arrayForTimeFmPs), {
  origin: `J${startOfNextSignalFmPs}`,
}); //Time
XLSX.utils.sheet_add_aoa(
  ws,
  arrayFliperRowtoColumn(arrayForStorrageMethodFmPs),
  { origin: `K${startOfNextSignalFmPs}` }
); //Storage metode
XLSX.utils.sheet_add_aoa(ws, arrayFliperRowtoColumn(arrayForProjectFmPs), {
  origin: `L${startOfNextSignalFmPs}`,
}); //Project

const newWB = XLSX.utils.book_new();

XLSX.utils.book_append_sheet(newWB, ws, "Trends");
XLSX.writeFile(newWB, "C:/Toolkit_script/AutoGen_Trends.xlsx");

console.log(`Completed`);

const btnGenerate = document.querySelector(".btn--generate");
btnGenerate.addEventListener("click", function () {
  console.log("button pressed");
});
