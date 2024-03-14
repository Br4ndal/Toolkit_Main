"use strict"
/*
Descrption of Program: 
 Files needed is The alarm_PS and alarm_SB

 FIXME: FIND OUT WHY THIS IS SO SLOW !!!!!!!!!!!!!!!!!

*/

self.addEventListener("message",function(e){
    console.log("program started: DifferenceAlarmCitectToIoList ",process.pid)
    let data = e.data
    console.log(data);
    
    this.self.postMessage(DifferenceAlarmCitectToIoList())
})

function DifferenceAlarmCitectToIoList(){
    //--------------------------------- Variables -------------------------------
    //const testArray1 =[1,2,3,4,5,6];
    let almtagsFromIOList = [];
    let tagsFromIOList = [];
    let missingTagUnique = [];
    let IOareOK = [];
    let tagInfoArray =[];
    let tagsInToBeChecked =[];
    let dontNeed =[];
    let removedAlarms =["Removed alarms ",];
    let signalDescription =[];
    let signalDescriptionFromAlarmsNotfound = [];
    let signalDescriptionNew = ["Name of Signal", ];

    let almNrFromIoList = [];
    let almNrPrintedToExcel = ["Alarm Number from IO-list", ];


    //
    let arrayOfAlarmTagCitect = [];
    let arrayOfnameOfAlarmCitect = [];
    let arrayOfAlarmTagCitectToExcel = ["Alarm number",];
    let arrayOfnameOfAlarmCitectToExcel = ["Description"];
    let tagsInToBeCheckedExcel = ["SFI", ];



    //sixnet excel files
    let arrayOfAlarmNumberSixnet = [];
    let arrayOfAddressInputSixnet = [];
    let arrayOfRawMinSixnetPS = [];
    let arrayOfRawMaxSixnetPS = [];
    let arrayOfEngMinSixnetPS = [];
    let arrayOfEngMaxSixnetPS = [];
    let arrayOfSortedAddressInput = [];

    let arrayOfAlarmNumberSixnetSB = [];
    let arrayOfAddressInputSixnetSB = [];
    let arrayOfRawMinSixnetSB = [];
    let arrayOfRawMaxSixnetSB = [];
    let arrayOfEngMinSixnetSB = [];
    let arrayOfEngMaxSixnetSB = [];
    let arrayOfSortedAddressInputSB = [];
    //------------------------------- Getting other Librarys ----------------------------

    const XLSX = require("xlsx");
    const fs = require("fs");


    //-------------------------- Program---------------------------------------
console.log("program started!!!!!");


    const workbook = XLSX.readFile(`C:/Work/- AutoScript/IASProject/IAS_CTRL_Common_Files/IO Liste.xlsx`); // ${input}
    let worksheet = workbook.Sheets["IO List"];
    const dataAI = XLSX.utils.sheet_to_json(worksheet);

    console.log("Rename Variable file to this = Alarm_variables");


    const workbook2 = XLSX.readFile(`C:/Work/- AutoScript/IASProject/Citect_Project/argdig.DBF`); // ${input}
    let worksheet2= workbook2.Sheets["Sheet1"];
    const dataAI2 = XLSX.utils.sheet_to_json(worksheet2);

    let content = fs.readFileSync("C:/Work/- AutoScript/IASProject/Json_files/Alarm_PS.json", 'utf-8');
    const data3 = JSON.parse(content);

    let content2 = fs.readFileSync("C:/Work/- AutoScript/IASProject/Json_files/Alarm_SB.json", 'utf-8');
    const data4 = JSON.parse(content2);


    //Getting information from IO-list and putting tag in a new array
    for (const address of dataAI) {
        const tagXI = address[`ISA`];
        const alarmInfo = address[`Alarm`];
        const tagName = address[`Tag Name`];
        const systemName = address[`System Name`];
        const tagInfo = address[`Signal Description`];
        const supplierCode = address[`Supplier   Code`];
        const signalType = address[`SensorSignalType`];
        const  iasTagName = address["IAS Tag Name"];
        const revText = address[`Rev. Text`]
        let newTagName = (tagName); //  let newTagName = JSON.stringify(tagName);
        let makingStringOfSupplierCode = JSON.stringify(tagInfo);
        let substr = 'Pump';
        let substr1 = 'alve';
        let testForPumpInTagInfo
        let testForValveInTagInfo
        
        //console.log(revText)
        if (tagInfo === undefined || tagInfo == ""){
            false; // do nothing only want to take away error because of when cell is undfined it wont check cell.
        } else{
        
            testForPumpInTagInfo = makingStringOfSupplierCode.indexOf(substr); // if it returns 0 it has found the word Loop if not its -1
            testForValveInTagInfo = makingStringOfSupplierCode.indexOf(substr1);
        }
        
        if (tagInfo == "Spare" || tagInfo == "spare" || tagInfo == "SPARE"){
            dontNeed = dontNeed.concat(newTagName);
        }else if((alarmInfo == "Yes" ||alarmInfo == "YES") && (tagInfo !== "Spare" || tagInfo !== "spare")  ){     //   && (tagInfo == "Spare" || tagInfo == "spare") 
            almtagsFromIOList = almtagsFromIOList.concat(newTagName); 
            signalDescription = signalDescription.concat(tagInfo);
            almNrFromIoList = almNrFromIoList.concat(iasTagName);
        }else if (tagInfo === undefined || tagXI === undefined || revText === undefined || revText == ""  ) {
            dontNeed = dontNeed.concat(newTagName); 
        }else if(revText.includes("Removed")){
            //console.log("INSIDE IF",revText)
            removedAlarms = removedAlarms.concat(newTagName)
        } else if ((alarmInfo == "MON" || alarmInfo == "Mon") && (tagInfo !== "Spare" || tagInfo !== "spare") ) {   //  && (tagInfo == "Spare" || tagInfo == "spare")  
            almtagsFromIOList = almtagsFromIOList.concat(newTagName); 
            signalDescription = signalDescription.concat(tagInfo);
            almNrFromIoList = almNrFromIoList.concat(iasTagName);
        } else if (testForPumpInTagInfo >= 1 && (tagXI == "SRT" || tagXI == "STP" || tagXI == "REM" || tagXI == "RUN" || tagXI == "XC"  )) {
            dontNeed = dontNeed.concat(newTagName); 
        }else if (testForValveInTagInfo >=1 && (tagXI == "XI" || tagXI == "XC" || tagXI == "OPN" || tagXI == "FOP" || tagXI == "FCL"|| tagXI == "CLS") ){ //  ) 
            //console.log(tagXI,newTagName,supplierCode,signalType,testForValveInTagInfo);
            dontNeed = dontNeed.concat(newTagName); 
        } else { //(tagXI !=="XA1") &&    tagXI == "XI" &&   || alarmInfo !== "YES" || alarmInfo !== "MON" || tagInfo !== "spare"|| tagInfo !== "Spare")  || alarmInfo !== "MON" 
            tagsFromIOList = tagsFromIOList.concat(newTagName);
            tagInfoArray = tagInfoArray.concat(JSON.stringify("t"+tagName));
        }
        
    }


    //getting information from Variables on IAS and putting tag name in new array
    for (const address2 of dataAI2) {


        const tagsToBeChecked =  address2[`CUSTOM7`];
        const alarmTagCitect = address2[`TAG`];
        
        const nameOfAlarmCitect = address2[`CUSTOM8`];
        const categoryCitect = address2[`CATEGORY`];

        let strinifyAlarmTagCitext = JSON.stringify(tagsToBeChecked);
        let testThisForAlm = "_NAME"
        let testForSubStrAlm = strinifyAlarmTagCitext.indexOf(testThisForAlm);
        
        //console.log(testForSubStrAlm, tagsToBeChecked,testThisForAlm);
        if (testForSubStrAlm == -1){
            arrayOfnameOfAlarmCitect = arrayOfnameOfAlarmCitect.concat(nameOfAlarmCitect);
            arrayOfAlarmTagCitect = arrayOfAlarmTagCitect.concat(alarmTagCitect);
            tagsInToBeChecked = tagsInToBeChecked.concat((tagsToBeChecked));
        }
    }

    for (const address3 of data3){
        const alarmNumberSixnet = address3["Alarm parameter file"]; //[`Alarm Nr.:`];
        const addressInputSixnet = address3["field16"]//[`Input Adr:`];
        const arrayOfRawMinSixnetPS1 = address3["field12"]//[`Scaling Raw 0:`]; 
        const arrayOfRawMaxSixnetPS1 = address3["field13"]//[`Scaling Raw 1:`];
        const arrayOfEngMinSixnetPS1 = address3["field14"]//[`Scaling Eng 0:`];
        const arrayOfEngMaxSixnetPS1 = address3["field15"]//[`Scaling Eng 1:`];

        arrayOfAlarmNumberSixnet = arrayOfAlarmNumberSixnet.concat((alarmNumberSixnet));
        arrayOfAddressInputSixnet = arrayOfAddressInputSixnet.concat((addressInputSixnet));

        arrayOfRawMinSixnetPS = arrayOfRawMinSixnetPS.concat((arrayOfRawMinSixnetPS1));
        arrayOfRawMaxSixnetPS = arrayOfRawMaxSixnetPS.concat((arrayOfRawMaxSixnetPS1));
        arrayOfEngMinSixnetPS = arrayOfEngMinSixnetPS.concat((arrayOfEngMinSixnetPS1));
        arrayOfEngMaxSixnetPS = arrayOfEngMaxSixnetPS.concat((arrayOfEngMaxSixnetPS1));

    }

    for (const address4 of data4){
        const alarmNumberSixnetSB = address4["Alarm parameter file"]; //[`Alarm Nr.:`];
        const addressInputSixnetSB = address4["field16"]
        const arrayOfRawMinSixnetSB1 = address4["field12"]
        const arrayOfRawMaxSixnetSB1 = address4["field13"]
        const arrayOfEngMinSixnetSB1 = address4["field14"]
        const arrayOfEngMaxSixnetSB1 = address4["field15"]
        
        
        arrayOfAlarmNumberSixnetSB = arrayOfAlarmNumberSixnetSB.concat((alarmNumberSixnetSB));
        arrayOfAddressInputSixnetSB = arrayOfAddressInputSixnetSB.concat((addressInputSixnetSB));

        arrayOfRawMinSixnetSB = arrayOfRawMinSixnetSB.concat((arrayOfRawMinSixnetSB1));
        arrayOfRawMaxSixnetSB = arrayOfRawMaxSixnetSB.concat((arrayOfRawMaxSixnetSB1));
        arrayOfEngMinSixnetSB = arrayOfEngMinSixnetSB.concat((arrayOfEngMinSixnetSB1));
        arrayOfEngMaxSixnetSB = arrayOfEngMaxSixnetSB.concat((arrayOfEngMaxSixnetSB1));


    }

    /*
    this checkes array from IO and Variables file from IAS for difference.
    If Tag in IO-list and not in Variables this will be printed */
    let difference1 = almtagsFromIOList.filter(x => !tagsInToBeChecked.includes(x));


    /*
    her im Finding the name of the tag and put in the IO list,
    i am finding the index for the array and making new array with the names.
    */

    let uniqueSignalDesc = [...new Set(signalDescription)];
    const difference1AlarmName = ["Alarm Name", ];
    for(let i = 0; i <= difference1.length;i++){
        for(let j = 0;j <= almtagsFromIOList.length;j++){
            //console.log(almtagsFromIOList[j],difference1[i] )
            if(difference1[i] === almtagsFromIOList[j]){
                difference1AlarmName.push(uniqueSignalDesc[j])

                //console.log("test1: ",signalDescription);
            }
        }
    }

    for (let i=0;i <=difference1.length;i++){
        //let tagOfDifference = difference1[i];
        //console.log("first",tagOfDifference);
        let idx = almtagsFromIOList.indexOf(difference1[i]); // almtagsFromIOList
        //console.log(idx);
        while (idx != -1) {
            signalDescriptionFromAlarmsNotfound.push(idx); // signalDescriptionFromAlarmsNotfound
            idx = almtagsFromIOList.indexOf(difference1[i], idx + 1);
        }
    }
    // console.log(signalDescriptionFromAlarmsNotfound,difference1 )
    let uniqueChars = [...new Set(signalDescriptionFromAlarmsNotfound)];
    for(let i=0;i<=uniqueChars.length;i++){

        arrayOfAlarmTagCitectToExcel = arrayOfAlarmTagCitectToExcel.concat(arrayOfAlarmTagCitect[[uniqueChars[i]]]);
        arrayOfnameOfAlarmCitectToExcel = arrayOfnameOfAlarmCitectToExcel.concat(arrayOfnameOfAlarmCitect[[uniqueChars[i]]]);
        tagsInToBeCheckedExcel = tagsInToBeCheckedExcel.concat(almtagsFromIOList[[uniqueChars[i]]]);

    }


    //let sfinumber = ["SFI"];
    //let ws = XLSX.utils.aoa_to_sheet(arrayFliperRowtoColumn(difference1), {origin: "A1" }); 

    let ws = XLSX.utils.aoa_to_sheet(arrayFliperRowtoColumn(tagsInToBeCheckedExcel), {origin: "A1" });  //tagsInToBeCheckedExcel
    XLSX.utils.sheet_add_aoa(ws,arrayFliperRowtoColumn(difference1AlarmName), {origin: "B1" });

    XLSX.utils.sheet_add_aoa(ws,arrayFliperRowtoColumn(removedAlarms), {origin: "I1" });

    const newWB = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(newWB, ws, "Difference");
    XLSX.writeFile(newWB, "C:/Work/- AutoScript/- Files AutoGen/Alarm_Difference_between_IOList_Citect.xlsx");
    console.log(`Completed`);
    return "File completed find file her : C:/Work/- AutoScript/- Files AutoGen"
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
