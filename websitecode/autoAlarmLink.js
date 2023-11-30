'use strict';
// const XLSX = require("xlsx");
// const fs = require(`fs`);
// const csvToJson = require('csvtojson');
// const path = require("path")
/*
Installs needed is:    npm i xlsx,  npm install convert-csv-to-json --save


*/
/* Librarys for program that needed  */
// GETTING information from DOM
const filePathCitect = document.getElementById("file-input");
const filePathIASFiles= document.getElementById("file-input2");

console.log(window.CPU.cpu);
console.log(window.excel.link.readFile);
console.log(window.excel.link.utils);
// const workbook1 = excel.link.readFile(`C:/Users/stian/OneDrive/Documents/Projects/IAS Project/Citect/argdig.DBF`); // ${input}
// let worksheet1= workbook1.Sheets["Sheet1"];
// const dataAI1 = excel.link.utils.sheet_to_json(worksheet1);
// console.log(dataAI1)

var data = [
    {"name":"John", "city": "Seattle"},
    {"name":"Mike", "city": "Los Angeles"},
    {"name":"Zach", "city": "New York"}
];
let ws = excel.link.utils.sheet_to_json(data);  
const newWB = excel.link.utils.book_new();
excel.link.utils.book_append_sheet(newWB, ws, "Citet_AlarmLink");
//excel.link
excel.link.write(newWB,`C:/Users/stian/OneDrive/Documents/Projects/IAS Project/AutoGen Files/Citect_Alarm_Link.xlsx`);
//sending information to DOMs
// const filePathCitect1 = document.querySelector("filename");
// const filePathIASFiles1 = document.querySelector("filename2");

const btnSend = document.querySelector(".btn--send");

btnSend.addEventListener("click", function () {
    let newfilePathCitect = filePathCitect.value;
    let newfilePathIASFIles = filePathIASFiles.value
    filename.textContent = filePathCitect.value; // sending Path back to dom again
    filename2.textContent = filePathIASFiles.value;
    alarmLinker(newfilePathCitect,newfilePathIASFIles)
    console.log(newfilePathCitect, newfilePathIASFIles);
  });
  
  document.addEventListener(`keydown`, function (e) {
    if (e.key === "Enter") {
        let newfilePathCitect = filePathCitect.value;
        let newfilePathIASFIles = filePathIASFiles.value
        alarmLinker(newfilePathCitect,newfilePathIASFIles)
        console.log(newfilePathCitect, newfilePathIASFIles);
    }
  });
  


function alarmLinker (pathCitect,pathCsvFile){
    /*------------------- VARIABLES USED IN PROGRAM TO STORE------------------*/

    let tagsInToBeChecked =[];
    let signalDescriptionFromAlarmsNotfound = [];

    let pumpSystemAlarmsPS = [];
    let pumpSystemAlarmNrPS = [];
    let tankSystemAlarmsPS = [];
    let tankSystemAlarmNrPS = [];
    let pumpSystemAlarmsSB = [];
    let pumpSystemAlarmNrSB = [];
    let tankSystemAlarmsSB = [];
    let tankSystemAlarmNrSB = [];


    let arrayOfAlarmTagCitect = [];
    let arrayOfnameOfAlarmCitect = [];
    let allAlarms = [];

    //-------------------------- Program---------------------------------------

    // getting files from folder
    const filePathCSVtoJSON = pathCsvFile

    console.log("Prosses started.......")
    console.log("Opening files and gathering inforamtion")

    // Read folder to find which files i have her
    // var pathForCSVFile = [];
    // let checkingPathCSVtoJSON = fs1.readFile1.readdirSync(filePathCSVtoJSON)

    // for (let i = 0; i < checkingPathCSVtoJSON.length; ++i) {
    //     pathForCSVFile[i] = filePathCSVtoJSON +"/"+checkingPathCSVtoJSON[i];
    // }

    // // checking all the files and IF its .CSV i will use fucntion to convert to JSON.
    // for(let i=0; i < pathForCSVFile.length;i++){
    //     let checkForCSV = ".CSV"
    //     let checkedForCSV = JSON.stringify(pathForCSVFile[i].toUpperCase()).indexOf(checkForCSV);
    //     if(checkedForCSV >=1){
    //         localCSVtoJSON(pathForCSVFile[i])
    //     }
    // }

    // //function that turns CSV files to JSON file so i can easier get the information i need from them. And puting them all in a JSON folder where i can read them later.
    // function localCSVtoJSON (filepath){
    //     let splitString = filepath.split("/");
    //     const splitStringF = splitString[9].split(".")[0]
    //     csvToJson()
    //     .fromFile(filepath)
    //     .then((json) => {
            
    //         fs1.readFile1.writeFileSync("jsonFiles/" + splitStringF + ".json", JSON.stringify(json), "utf-8", (err) => {
    //             if (err) console.log(err);
    //         });
    //     })
    //     .catch((err) => {
    //         console.error(err);
    //     });

    // }



    let content = fs1.readFile1.readFileSync("C:/Users/stian/OneDrive/Documents/Projects/IAS Project/New folder/jsonFiles/PumpSetup.json", 'utf-8');
    const data = JSON.parse(content);


    let pumpTagPS = [];
    let pumpTagSB = [];

    let pumpAlarmsPS = [];
    let pumpAlarmsSB = [];

    for (let i = 0; i < data.length; i++) {
        if (data[i].PumpNr % 2 === 0) {
            pumpTagSB.push(data[i].TagRef);

            if(i >=10){
                pumpAlarmsSB.push("Pump0"+data[i].PumpNr)
            } else if (i >= 100){
                pumpAlarmsSB.push("Pump"+data[i].PumpNr)
            } else {
                pumpAlarmsSB.push("Pump00"+data[i].PumpNr)
            }

        } else{
            pumpTagPS.push(data[i].TagRef);
            if(i >=10){
                pumpAlarmsPS.push("Pump0"+data[i].PumpNr)
            } else if (i >= 100){
                pumpAlarmsPS.push("Pump"+data[i].PumpNr)
            } else {
                pumpAlarmsPS.push("Pump00"+data[i].PumpNr)
            }
        }
    }


    let TagRefArrayCombined = pumpTagPS.concat(pumpTagSB);
    let combinedArraypumpAlarm = pumpAlarmsPS.concat(pumpAlarmsSB);

    const workbook1 = excel.link.readFile(`${pathCitect}/Citect/argdig.DBF`); // ${input}
    let worksheet1= workbook1.Sheets["Sheet1"];
    const dataAI1 = excel.link.utils.sheet_to_json(worksheet1);

    /* 
    When check for common alarms in this for loop i dont use 792_ SFI because on Ocean infinity there was not 792_common alarms on tank or pumps
    */
    for (const address1 of dataAI1) {
        const tagsToBeChecked =  address1[`CUSTOM7`];
        const alarmTagCitect = address1[`TAG`];
        
        const nameOfAlarmCitect = address1[`CUSTOM8`];
        const categoryCitect = address1[`CATEGORY`];

        let strinifyAlarmTagCitext = tagsToBeChecked;
        let testThisForAlm = "_NAME";
        let testForSubStrAlm = strinifyAlarmTagCitext.indexOf(testThisForAlm);

        let tagForPump = "Pump";
        let stringifyPump = nameOfAlarmCitect;
        
        let checkForPump = stringifyPump.indexOf(tagForPump);

        let tagForFan = "Fan";
        let stringifyFan = nameOfAlarmCitect;
        let checkForFan = stringifyFan.indexOf(tagForFan);

        let commonAlarm = "COMMON";
        let stringifyCommonAlarm = nameOfAlarmCitect.toUpperCase();
        let checkForCommonAlarm = stringifyCommonAlarm.indexOf(commonAlarm);

        let alarmAlarm = "Alarm";
        let stringifyalarmAlarm = nameOfAlarmCitect;
        let checkForAlarmAlarm = stringifyalarmAlarm.indexOf(alarmAlarm);

        // sorting out tank in sfi 792.
        let tagForTank = "TANK";
        let stringifytank = nameOfAlarmCitect.toUpperCase();
        let checkForTank = stringifytank.indexOf(tagForTank);

        let tagFor792 = "792_";
        let stringify792 = tagsToBeChecked.toUpperCase();
        let checkFor792 = stringify792.indexOf(tagFor792);

        let tagForDeleted = "DELE";
        let stringifyDeleted = nameOfAlarmCitect.toUpperCase();
        let checkForDeleted = stringifyDeleted.indexOf(tagForDeleted);
        
        //allAlarms = allAlarms.concat(alarmTagCitect);
        // if (categoryCitect < 4000  ) console.log(nameOfAlarmCitect)
    

        if (checkForTank >= 1 && checkForCommonAlarm >= 1 && checkForDeleted === -1  && categoryCitect < 4000  ){ // checkFor792 >= 0 && 
            tankSystemAlarmsPS.push(nameOfAlarmCitect);
            tankSystemAlarmNrPS.push(alarmTagCitect);
        } else if(checkForTank >= 1 && checkForCommonAlarm >= 1 && checkForDeleted === -1 && categoryCitect >= 4000  ){// && checkFor792 >= 1 && 
            tankSystemAlarmsSB.push(nameOfAlarmCitect);
            tankSystemAlarmNrSB.push(alarmTagCitect);
        } else if ((checkForPump >= 1 || checkForFan >=1 ) && checkForCommonAlarm >= 1 && checkForDeleted === -1  && categoryCitect < 4000  ){ //checkFor792 >= 1 && 
            pumpSystemAlarmsPS.push(nameOfAlarmCitect);
            pumpSystemAlarmNrPS.push(alarmTagCitect);
        } else if ((checkForPump >= 1 || checkForFan >=1 ) && checkForCommonAlarm >= 1 && checkForDeleted === -1  && categoryCitect > 4000  ){ //checkFor792 >= 1 && 
            pumpSystemAlarmsSB.push(nameOfAlarmCitect);
            pumpSystemAlarmNrSB.push(alarmTagCitect);
        }

    }


    const dataAI2 = excel.link.utils.sheet_to_json(worksheet1);
    let tagFilterAway = ["Alarm that has been filtered away "];
    // //getting information from Variables on IAS and putting tag name in new array, her are alarms that are deleted or not gone be checked in my program. meant for manuall jobb to see which alarms are not gone be linked.
    for (const address2 of dataAI2) {
        const tagsToBeChecked =  address2[`CUSTOM7`];
        const alarmTagCitect = address2[`TAG`];
        
        const nameOfAlarmCitect = address2[`CUSTOM8`];
        const categoryCitect = address2[`CATEGORY`];
        // tagsInToBeChecked = tagsInToBeChecked.concat(JSON.stringify(tagsToBeChecked));
        
        let strinifyAlarmTagCitext = JSON.stringify(tagsToBeChecked);
        let testThisForAlm = "_NAME"
        let testForSubStrAlm = strinifyAlarmTagCitext.indexOf(testThisForAlm);

        let tagForPump = "Pump";
        let stringifyPump = JSON.stringify(nameOfAlarmCitect);
        let checkForPump = stringifyPump.indexOf(tagForPump);

        let commonAlarm = "Common";
        let stringifyCommonAlarm = JSON.stringify(nameOfAlarmCitect);
        let checkForCommonAlarm = stringifyCommonAlarm.indexOf(commonAlarm);

        // sorting out tank in sfi 792.
        let tagForTank = "Tank"
        let stringifytank = JSON.stringify(nameOfAlarmCitect);
        let checkForTank = stringifytank.indexOf(tagForTank);

        let tagFor792 = "792_"
        let stringify792 = JSON.stringify(tagsToBeChecked.toUpperCase());
        let checkFor792 = stringify792.indexOf(tagFor792);

        let tagForDeleted = "DELE"
        let checkForDeleted = stringify792.indexOf(tagForDeleted.toUpperCase());

        allAlarms = allAlarms.concat(alarmTagCitect);
        //console.log(testForSubStrAlm, tagsToBeChecked);
        


        if ( (checkForTank >= 1 && checkFor792 >= 1) || checkForDeleted >=1 ){ //
            tagFilterAway = tagFilterAway.concat((nameOfAlarmCitect));
        } else if ((testForSubStrAlm == -1 ) ){ // tok away pymp her!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
            //console.log(testForSubStrAlm,nameOfAlarmCitect);
            arrayOfnameOfAlarmCitect = arrayOfnameOfAlarmCitect.concat(nameOfAlarmCitect); // this is the name of the alarm
            arrayOfAlarmTagCitect = arrayOfAlarmTagCitect.concat(alarmTagCitect); // this is ALM 0948  +".ON"
            tagsInToBeChecked = tagsInToBeChecked.concat((tagsToBeChecked)); // this is the SFI of the alarm
        }
    }

    //her is the link for the main project.
    let pdgFile1 = pgdynobjFile1(`${pathCitect}/Citect/pgdynobj.dbf`)



    // her i check the include folders for which files are there any file the path for the pgdynobj file. This for loop is for all under projects like PMS, Tank , valves etc.

    const filepathStart = `${pathCitect}/Citect/_IncludeProjects`
    var markers = [];
    let checkingPath = fs1.readFile1.readdirSync(filepathStart)
    for (let i = 0; i < checkingPath.length; ++i) {
        markers[i] = filepathStart +"/"+checkingPath[i] + "/pgdynobj.dbf";
    }




    //her i am extracting all info of where tags and alarms are placed. from the pdgfile 
    // in the function i will take away empty undefined cells also the empty ones.
    function pgdynobjFile1(filepathPgd){
        console.log("entering for loop with file",filepathPgd );
        let checkingPath0 = [];
        let citectPageFromPgd = []

        const workbook = excel.link.readFile(filepathPgd);
        let worksheet = workbook.Sheets["Sheet1"];
        const dataAI = excel.link.utils.sheet_to_json(worksheet);

        for (const address3 of dataAI){
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
            
        }
        return [checkingPath0,citectPageFromPgd]
    }


    const pgdynobjComplett =[pdgFile1[0]]
    const pgdynobjComplettPage =  [pdgFile1[1]]


    for(let i = 0; i <= markers.length -1;i++){
        pgdynobjComplett.push(pgdynobjFile1(markers[i])[0])
        pgdynobjComplettPage.push(pgdynobjFile1(markers[i])[1])
    }

    // CHECK THHE PRINT OUT AT THE END; ADDED MORE VARIABLES THEN NEEDED.-----------------------------------------------------------------------------------------
    // Combining all the pgdynogj files to one big array.
    const pgdynobjComplettCombined = pgdynobjComplett[0].concat(pgdynobjComplett[1],pgdynobjComplett[2],pgdynobjComplett[3],pgdynobjComplett[4],pgdynobjComplett[5],pgdynobjComplett[6],pgdynobjComplett[7]) 
    const pgdynobjComplettPageCombied = pgdynobjComplettPage[0].concat(pgdynobjComplettPage[1],pgdynobjComplettPage[2],pgdynobjComplettPage[3],pgdynobjComplettPage[4],pgdynobjComplettPage[5],pgdynobjComplettPage[6],pgdynobjComplettPage[7]) 

    console.log("Comparing " +pgdynobjComplettCombined.length +" off excel cells"  )
    //--------------------------------Pump COMMON ALARMS------------------------------
    let arrayObj1Pump = [];
    let arrayObj2Pump = [];
    //tagsInToBeChecked,,,,arrayOfAlarmTagCitect
    for (let i = 0; i <= TagRefArrayCombined.length -1 ;i++){
        arrayObj1Pump.push({ID: TagRefArrayCombined[i], citectPage: ""})
    }
    for (let i = 0; i <= tagsInToBeChecked.length -1 ;i++){
        arrayObj2Pump.push({ID: tagsInToBeChecked[i], citectPage: arrayOfAlarmTagCitect[i]})
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
    for (let i = 0; i <= arrayObj1Pump.length;i++){
        if(arrayObj1Pump[i] != undefined){
            newFinalArrayAlmNrPump = newFinalArrayAlmNrPump.concat(arrayObj1Pump[i].ID);
            newFianlArrayPagePump = newFianlArrayPagePump.concat(arrayObj1Pump[i].citectPage);
        }
    }



    let difference1PumpAlarm = [];
    let pageCitectPumpAlarm= [];
    for(let i = 0; i <= combinedArraypumpAlarm.length;i++){
        let tempVar1P= combinedArraypumpAlarm[i];
        for(let j =0; j<=pgdynobjComplettCombined.length;j++){
            let tempVar2P = JSON.stringify(pgdynobjComplettCombined[j]);
            //console.log(tempVar1P,tempVar2P);
            if(tempVar1P !== undefined && tempVar2P !== undefined) {
                let controllValueP = tempVar2P.indexOf(combinedArraypumpAlarm[i]);
                if (controllValueP >= 0){
                    difference1PumpAlarm = difference1PumpAlarm.concat(`${newFianlArrayPagePump[i]}`); // , ${tempVar1}
                    pageCitectPumpAlarm = pageCitectPumpAlarm.concat(pgdynobjComplettPageCombied[j]); 
                } 
            }
        }
    }
    let combinedArrayPumpAlarm2 = [];
    for (let i=0;i <= difference1PumpAlarm.length -1 ;i++){
        combinedArrayPumpAlarm2 = combinedArrayPumpAlarm2.concat(`${difference1PumpAlarm[i]} ${pageCitectPumpAlarm[i]}`);
    }
    let uniqueCharsPumpAlarm = [...new Set(combinedArrayPumpsAlarm2)];


    //splitting uniqueChars to get alarms and pages from them self
    let uniqueCharsSplitt1PumpAlarm = [];
    let uniqueCharsSplitt2PumpAlarm = [];

    for (let i = 0; i <= uniqueCharsPumpAlarm.length;i++){
        if (uniqueCharsPumpAlarm[i] != undefined){
        let temp1Pump = uniqueCharsPumpAlarm[i].split(" ");
        uniqueCharsSplitt1PumpAlarm = uniqueCharsSplitt1PumpAlarm.concat(temp1Pump[0])
        uniqueCharsSplitt2PumpAlarm = uniqueCharsSplitt2PumpAlarm.concat(temp1Pump[1])
        }else{
            false;
        }
    }

    //---------------------------------Pump System Internal Alarms ------------------------------------------------
    let newPumpSystemAlarmsPS = [];
    for (let i =0; i <= pumpSystemAlarmsPS.length -1; i++){
        if(i<=4) {
            newPumpSystemAlarmsPS.push(`PUMP00${(i*2)+1}`)
        } else {
            newPumpSystemAlarmsPS.push(`PUMP0${(i*2)+1}`)
        }
    }    
    let newPumpSystemAlarmsSB = [];
    for (let i =0; i <= pumpSystemAlarmsSB.length -1; i++){
        if(i === 1){
            newPumpSystemAlarmsSB.push(`PUMP004`)
        }
        else if (i<=3){
            newPumpSystemAlarmsSB.push(`PUMP00${(i*2)+2}`)
        } else{
            newPumpSystemAlarmsSB.push(`PUMP0${(i*2)+2}`) 
        }     
    }

    const combinedPumpAlarmNr = pumpSystemAlarmNrPS.concat(pumpSystemAlarmNrSB)
    const combinedPumpAlarms = newPumpSystemAlarmsPS.concat(newPumpSystemAlarmsSB);


    let difference1Pump = [];
    let pageCitectPump= [];
    for(let i = 0; i <= combinedPumpAlarms.length;i++){
        let tempVar1P= combinedPumpAlarms[i];
        for(let j =0; j<=pgdynobjComplettCombined.length;j++){
            let tempVar2P = JSON.stringify(pgdynobjComplettCombined[j]);
            //console.log(tempVar1P,tempVar2P);
            if(tempVar1P !== undefined && tempVar2P !== undefined) {
                let controllValueP = tempVar2P.indexOf(combinedPumpAlarms[i]);
                if (controllValueP >= 0){
                    difference1Pump = difference1Pump.concat(`${combinedPumpAlarmNr[i]}`); // , ${tempVar1}
                    pageCitectPump = pageCitectPump.concat(pgdynobjComplettPageCombied[j]); 
                } 
            }
        }
    }
    let combinedArrayPump = [];
    for (let i=0;i <= difference1Pump.length -1 ;i++){
        combinedArrayPump = combinedArrayPump.concat(`${difference1Pump[i]} ${pageCitectPump[i]}`);
    }
    let uniqueCharsPump = [...new Set(combinedArrayPump)];


    //splitting uniqueChars to get alarms and pages from them self
    let uniqueCharsSplitt1Pump = [];
    let uniqueCharsSplitt2Pump = [];

    for (let i = 0; i <= uniqueCharsPump.length;i++){
        if (uniqueCharsPump[i] != undefined){
        let temp1Pump = uniqueCharsPump[i].split(" ");
        uniqueCharsSplitt1Pump = uniqueCharsSplitt1Pump.concat(temp1Pump[0])
        uniqueCharsSplitt2Pump = uniqueCharsSplitt2Pump.concat(temp1Pump[1])
        }else{
            false;
        }
    }

    // ------------------------------- TANK System Internal Alarms -------------------------------------------------
    let newtankSystemAlarmsPS = [];
    for (let i =0; i <= tankSystemAlarmsPS.length -1; i++){
        if(i<=8) {
            newtankSystemAlarmsPS.push(`PS_TANK00${i+1}`)
        } else {
            newtankSystemAlarmsPS.push(`PS_TANK0${i+1}`)
        } 
    }
    let newtankSystemAlarmsSB = [];
    for (let i =0; i <= tankSystemAlarmsSB.length -1; i++){
        if(i <=8) {
            newtankSystemAlarmsSB.push(`SB_TANK00${i+1}`)
        } else {
            newtankSystemAlarmsSB.push(`SB_TANK0${i+1}`)
        } 
    }

    const combinedTankAlarmNr = tankSystemAlarmNrPS.concat(tankSystemAlarmNrSB)
    const combinedTankAlarms = newtankSystemAlarmsPS.concat(newtankSystemAlarmsSB);

    let difference1Tank = [];
    let pageCitectTank = [];
    for(let i = 0; i <= combinedTankAlarms.length;i++){
        let tempVar1T= combinedTankAlarms[i];
        for(let j =0; j<=pgdynobjComplettCombined.length;j++){
            let tempVar2T = JSON.stringify(pgdynobjComplettCombined[j]);
            //console.log(tempVar1,tempVar2);
            if(tempVar1T !== undefined && tempVar2T !== undefined) {
                let controllValueT = tempVar2T.indexOf(combinedTankAlarms[i]);
                if (controllValueT >= 0){
                    difference1Tank = difference1Tank.concat(`${combinedTankAlarmNr[i]}`); // , ${tempVar1}
                    pageCitectTank = pageCitectTank.concat(pgdynobjComplettPageCombied[j]); 
                } 
            }
        }
    }
    let combinedArrayTank = [];
    for (let i=0;i <= difference1Tank.length -1 ;i++){
        combinedArrayTank = combinedArrayTank.concat(`${difference1Tank[i]} ${pageCitectTank[i]}`);
    }
    let uniqueCharsTank = [...new Set(combinedArrayTank)];

    //splitting uniqueChars to get alarms and pages from them self
    let uniqueCharsSplitt1Tank = [];
    let uniqueCharsSplitt2Tank = [];

    for (let i = 0; i <= uniqueCharsTank.length;i++){
        if (uniqueCharsTank[i] != undefined){
        let temp1Tank = uniqueCharsTank[i].split(" ");
        uniqueCharsSplitt1Tank = uniqueCharsSplitt1Tank.concat(temp1Tank[0])
        uniqueCharsSplitt2Tank = uniqueCharsSplitt2Tank.concat(temp1Tank[1])
        }else{
            false;
        }
    }

    // --------------------------------------------- Alarm Numbers to be linked --------------------
    //Compares alarm number from alarm_variables to the big pgdynobj file and tries to match if it matches i make an new array difference1
    let difference1 = [];
    let pageCitect = [];
    for(let i = 0; i <= arrayOfAlarmTagCitect.length;i++){
        let tempVar1= arrayOfAlarmTagCitect[i];
        for(let j =0; j<=pgdynobjComplettCombined.length;j++){
            let tempVar2 = JSON.stringify(pgdynobjComplettCombined[j]);
            if(tempVar1 !== undefined && tempVar2 !== undefined) {
                let controllValue = tempVar2.indexOf(arrayOfAlarmTagCitect[i]);
                if (controllValue >= 0){
                    difference1 = difference1.concat(tempVar1);
                    pageCitect = pageCitect.concat(pgdynobjComplettPageCombied[j]);
                } 
            }
        }
    }

    let combinedArray = [];
    for (let i=0;i <= difference1.length -1 ;i++){
        combinedArray = combinedArray.concat(`${difference1[i]} ${pageCitect[i]}`);
    }
    let uniqueChars = [...new Set(combinedArray)];

    //splitting uniqueChars to get alarms and pages from them self
    let uniqueCharsSplitt1 = [];
    let uniqueCharsSplitt2 = [];

    for (let i = 0; i <= uniqueChars.length;i++){
        if (uniqueChars[i] != undefined){
        let temp1 = uniqueChars[i].split(" ");
        uniqueCharsSplitt1 = uniqueCharsSplitt1.concat(temp1[0])
        uniqueCharsSplitt2 = uniqueCharsSplitt2.concat(temp1[1])
        }else{
            false;
        }
    }

    //adding all different array togther before i start comparing and sorting them
    let combineduniqueCharsSplitt1 = [];
    let combineduniqueCharsSplitt2 = [];
    combineduniqueCharsSplitt1 = uniqueCharsSplitt1.concat(uniqueCharsSplitt1Tank,uniqueCharsSplitt1Pump,uniqueCharsSplitt1PumpAlarm);
    combineduniqueCharsSplitt2 = uniqueCharsSplitt2.concat(uniqueCharsSplitt2Tank,uniqueCharsSplitt2Pump,uniqueCharsSplitt2PumpAlarm);


    // --------------------- Comparing alarm numbers and sorting-------------------------------------------------------
    //https://stackoverflow.com/questions/49215358/checking-for-duplicate-strings-in-javascript-array
    let findDuplicates = arr => arr.filter((item, index) => arr.indexOf(item) != index)
    let  alarmSeveralPages = ["Alarms to be checked !", ... findDuplicates(combineduniqueCharsSplitt1)]

    //making dummy array for alarm
    let dummyArray1 = [];
    for (let i = 0; i <= allAlarms.length; i++){
        dummyArray1.push("");
    }

    let arrayObj1 = [];
    let arrayObj2 = [];

    for (let i = 0; i <= allAlarms.length -1 ;i++){
        arrayObj1.push({ID: allAlarms[i], citectPage: dummyArray1[i]})
    }

    for (let i = 0; i <= combineduniqueCharsSplitt1.length -1 ;i++){
        arrayObj2.push({ID: combineduniqueCharsSplitt1[i], citectPage: combineduniqueCharsSplitt2[i]})
    }

    //https://stackoverflow.com/questions/61370909/how-to-compare-two-arrays-and-change-the-name-if-id-matches
    arrayObj1.forEach(e => {
        let idx1 = arrayObj2.findIndex(u => u.ID == e.ID);
        if (idx1 >= 0) {
            e.citectPage = arrayObj2[idx1].citectPage;
        }
    });

    let newFinalArrayAlmNr = [];
    let newFianlArrayPage = [];

    for (let i = 0; i <= arrayObj1.length;i++){
        if(arrayObj1[i] != undefined){
        newFinalArrayAlmNr = newFinalArrayAlmNr.concat(arrayObj1[i].ID);
        newFianlArrayPage = newFianlArrayPage.concat(arrayObj1[i].citectPage);
        }
    }

    // HER REPLACE THE CAB pages with page M_MNU_07_01
    for(let i = 0;i <= newFianlArrayPage.length;i++){
        let checkForPageName = "CAB"
        if(newFianlArrayPage[i] === undefined){
            null
        }else{
            let checkedForPageName = JSON.stringify(newFianlArrayPage[i].toUpperCase()).indexOf(checkForPageName);
            if(checkedForPageName >= 1){
                newFianlArrayPage[i] = "M_MNU_7_01"
            }
        }
    }


    //will check the length of page name if its over 10 caracters it will need to be checked. 
    let pageDifference = ["Alarms with not usable Alarm link"];
    for(let i=0; i < newFianlArrayPage.length;i++){
        let checkedForPageName = newFianlArrayPage[i].length
        if(checkedForPageName > 10 && newFianlArrayPage[i] !=="" ){
            pageDifference.push(newFinalArrayAlmNr[i] +" " + newFianlArrayPage[i])
        }
    }





    let ws = excel.link.utils.aoa_to_sheet(arrayFliperRowtoColumn(newFinalArrayAlmNr), {origin: "A1" });  
    excel.link.utils.sheet_add_aoa(ws,arrayFliperRowtoColumn(newFianlArrayPage), {origin: "B1" });
    excel.link.utils.sheet_add_aoa(ws,arrayFliperRowtoColumn(alarmSeveralPages), {origin: "D1" });
    excel.link.utils.sheet_add_aoa(ws,arrayFliperRowtoColumn(pageDifference), {origin: "C1" });


    excel.link.utils.sheet_add_aoa(ws,arrayFliperRowtoColumn(newPumpSystemAlarmsSB), {origin: "J1" });
    excel.link.utils.sheet_add_aoa(ws,arrayFliperRowtoColumn(pumpSystemAlarmNrSB), {origin: "K1" });
    excel.link.utils.sheet_add_aoa(ws,arrayFliperRowtoColumn(pumpSystemAlarmsSB), {origin: "L1" });


    excel.link.utils.sheet_add_aoa(ws,arrayFliperRowtoColumn(newPumpSystemAlarmsPS), {origin: "N1" });
    excel.link.utils.sheet_add_aoa(ws,arrayFliperRowtoColumn(pumpSystemAlarmNrPS), {origin: "O1" });
    excel.link.utils.sheet_add_aoa(ws,arrayFliperRowtoColumn(pumpSystemAlarmsPS), {origin: "P1" });

    excel.link.utils.sheet_add_aoa(ws,arrayFliperRowtoColumn(newFinalArrayAlmNrPump), {origin: "G1" });
    excel.link.utils.sheet_add_aoa(ws,arrayFliperRowtoColumn(newFianlArrayPagePump), {origin: "H1" });
    excel.link.utils.sheet_add_aoa(ws,arrayFliperRowtoColumn(combinedArraypumpAlarm), {origin: "I1" });


    excel.link.utils.sheet_add_aoa(ws,arrayFliperRowtoColumn(newtankSystemAlarmsSB), {origin: "R1" });
    excel.link.utils.sheet_add_aoa(ws,arrayFliperRowtoColumn(tankSystemAlarmNrSB), {origin: "S1" });
    excel.link.utils.sheet_add_aoa(ws,arrayFliperRowtoColumn(tankSystemAlarmsSB), {origin: "T1" });

    excel.link.utils.sheet_add_aoa(ws,arrayFliperRowtoColumn(newtankSystemAlarmsPS), {origin: "W1" });
    excel.link.utils.sheet_add_aoa(ws,arrayFliperRowtoColumn(tankSystemAlarmNrPS), {origin: "X1" });
    excel.link.utils.sheet_add_aoa(ws,arrayFliperRowtoColumn(tankSystemAlarmsPS), {origin: "Y1" });

    const newWB = excel.link.utils.book_new();
    excel.link.utils.book_append_sheet(newWB, ws, "Citet_AlarmLink");
    excel.link.writeFile(newWB, `C:/Users/stian/OneDrive/Documents/Projects/IAS Project/AutoGen Files/Citect_Alarm_Link.xlsx`);

    console.log(`Completed`);
    console.log("Systems alarms needs to be double checked because of cant be compared correctly....")




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
}