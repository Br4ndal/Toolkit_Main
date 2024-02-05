'use strict';
/*
Descrption of Program: 
Comparing ARDIGE-file from citect to the pgdynobj from citect project to what alarms are used in mimic and not used in mimic.
Its to see if some has been forgotten or not added. Controll for end of project.


Program can max read 7 pgdynobj Files
s
TODO: NEEDS TO BE VERIFIED !!!

*/


self.addEventListener("message",function(e){
    console.log("program started1 ",process.pid)
    let data = e.data
    console.log(data);
    this.self.postMessage(almNotInMimic())
  })
  

function almNotInMimic(){

//--------------------------------- Variables -------------------------------
    let tagsInToBeChecked =[];
    let signalDescriptionFromAlarmsNotfound = [];

    let arrayOfAlarmTagCitect = [];
    let arrayOfnameOfAlarmCitect = [];

    let checkingPath0 = [];
    let checkingPath1 = [];
    let checkingPath2 = [];
    let checkingPath3 = [];
    let checkingPath4 = [];
    let checkingPath5 = [];
    let checkingPath6 = [];
    let checkingPath7 = [];



    //------------------------------- Getting other Librarys ----------------------------
    //const ExcelJS = require('exceljs');
    const XLSX = require("xlsx");
    const fs = require(`fs`);
    //const prompt = require("prompt-sync")();
    //const { Console } = require('console');
    //const { exit } = require('process');

    //-------------------------- Program---------------------------------------

    console.log("Place Alarm_variables file her : C:/Users/bruker/Desktop/IAS/-1 Javascript/Toolkit-main - Stian slettes etter oppstart");
    console.log("Rename Variable file to this = Alarm_variables");
    console.log("Rename Variable file sheet to this = Alarm_variables");


    const workbook2 = XLSX.readFile(`C:/Work/- AutoScript/IASProject/Citect_Project/argdig.DBF`); // ${input}
    let worksheet2 = workbook2.Sheets["Sheet1"];
    const dataAI2 = XLSX.utils.sheet_to_json(worksheet2);

    let tagFilterAway = ["Alarm that has been filtered away "];
    // //getting information from Variables on IAS and putting tag name in new array
    for (const address2 of dataAI2) {
        const tagsToBeChecked =  address2[`CUSTOM7`];
        const alarmTagCitect = address2[`TAG`];
        //const clusterName = address2[`Cluster Name`];
        const nameOfAlarmCitect = address2[`CUSTOM8`];
        // tagsInToBeChecked = tagsInToBeChecked.concat(JSON.stringify(tagsToBeChecked));
        
        //console.log(tagsToBeChecked);
        let strinifyAlarmTagCitext = JSON.stringify(tagsToBeChecked);
        let testThisForAlm = "_NAME"
        let testForSubStrAlm = strinifyAlarmTagCitext.indexOf(testThisForAlm);

        let tagForPump = "Pump";
        let stringifyPump = JSON.stringify(nameOfAlarmCitect);
        let checkForPump = stringifyPump.indexOf(tagForPump);
        console.log(alarmTagCitect);

        // sorting out tank in sfi 792.
        let tagForTank = "Tank"
        let stringifytank = JSON.stringify(nameOfAlarmCitect);
        let checkForTank = stringifytank.indexOf(tagForTank);

        let tagFor792 = "792_"
        let stringify792 = JSON.stringify(tagsToBeChecked.toUpperCase());
        let checkFor792 = stringify792.indexOf(tagFor792);

        let tagForDeleted = "DEL"
        let checkForDeleted = stringify792.indexOf(tagForDeleted);


        //console.log(testForSubStrAlm, tagsToBeChecked);

        if ((checkForTank >= 1 && checkFor792 >= 1) || checkForDeleted >=1 ){
            tagFilterAway = tagFilterAway.concat((nameOfAlarmCitect));
        }  else if ((testForSubStrAlm == -1 && checkForPump <= 0) ){
            //console.log(testForSubStrAlm,nameOfAlarmCitect);
            arrayOfnameOfAlarmCitect = arrayOfnameOfAlarmCitect.concat(nameOfAlarmCitect); // this is the name of the alarm
            arrayOfAlarmTagCitect = arrayOfAlarmTagCitect.concat(alarmTagCitect); // this is ALM 0948  +".ON"
            tagsInToBeChecked = tagsInToBeChecked.concat((tagsToBeChecked)); // this is the SFI of the alarm
            
        }
    }

    //her is the link for the main project.
    let pdgFile1 = pgdynobjFile1("C:/Work/- AutoScript/IASProject/Citect_Project/pgdynobj.dbf",)
    console.log("Gathering files.... Please wait")


    // her i check the include folders for which files are there any file the path for the pgdynobj file. This for loop is for all under projects like PMS, Tank , valves etc.

    const filepathStart = "C:/Work/- AutoScript/IASProject/Citect_Project/_IncludeProjects"
    var markers = [];
    let checkingPath = fs.readdirSync(filepathStart)
    for (let i = 0; i < checkingPath.length; ++i) {
        if (checkingPath[i].includes("Alarms") || checkingPath[i].includes("PMS") || checkingPath[i].includes("Include")|| checkingPath[i].includes("Library")   ){ 
            false
        } else {
        markers[i] = filepathStart +"/"+checkingPath[i] + "/pgdynobj.dbf";
        console.log(markers[i])
        }
    }
    console.log("Working.....")



    //her i am extracting all info of where tags and alarms are placed. from the pdgfile 
    // in the function i will take away empty undefined cells also the empty ones.
    function pgdynobjFile1(filepathPgd){
        let checkingPath0 = [];
        let citectPageFromPgd = []

        const workbook = XLSX.readFile(filepathPgd);
        let worksheet = workbook.Sheets["Sheet1"];
        const dataAI = XLSX.utils.sheet_to_json(worksheet);

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
        return [checkingPath0]
    }


    const pgdynobjComplett =[pdgFile1[0]]
    //const pgdynobjComplettPage =  [pdgFile1[1]]


    for(let i = 0; i <= markers.length -1;i++){
        if( markers[i]==undefined ){

        }else {
            pgdynobjComplett.push(pgdynobjFile1(markers[i]))
        }
        
        //pgdynobjComplettPage.push(pgdynobjFile1(markers[i])[1])
    }

    // CHECK THHE PRINT OUT AT THE END; ADDED MORE VARIABLES THEN NEEDED.-----------------------------------------------------------------------------------------
    // Combining all the pgdynogj files to one big array.
    const pgdynobjComplett2 = pgdynobjComplett[0].concat(pgdynobjComplett[1],pgdynobjComplett[2],pgdynobjComplett[3],pgdynobjComplett[4],pgdynobjComplett[5],pgdynobjComplett[6],pgdynobjComplett[7],pgdynobjComplett[8],pgdynobjComplett[9],pgdynobjComplett[10],pgdynobjComplett[11],pgdynobjComplett[12],pgdynobjComplett[13]) 

    //console.log(pgdynobjComplett2);
    console.log("Comparing " +pgdynobjComplett2.length +" off excel cells"  )


    //Compares alarm number from alarm_variables to the big pgdynobj file and tries to match if it matches i make an new array difference1
    let difference1 = [];
    for(let i = 0; i <= arrayOfAlarmTagCitect.length;i++){
        
        let tempVar1= arrayOfAlarmTagCitect[i];
        
        for(let j =0; j<=pgdynobjComplett2.length;j++){
            
            let tempVar2 = JSON.stringify(pgdynobjComplett2[j]);
            if(tempVar1 !== undefined && tempVar2 !== undefined) {
                let controllValue = tempVar2.indexOf(arrayOfAlarmTagCitect[i]);
                // console.log(arrayOfAlarmTagCitect[i],tempVar2);
                if (controllValue >= 0){
                    
                    difference1 = difference1.concat(tempVar1);
                }
            }
        }
    }

    // Her it compares what in the pgydynobj files with difference1 with alarms from citect, if alarm not in difference1 i make new array.  This one is what not in citect Mimic
    let difference2 = arrayOfAlarmTagCitect.filter(searchWord => !difference1.includes(searchWord));

    /*
    her im Finding the name of the tag and put in the IO list,
    i am finding the index for the array and making new array with the names.
    */
    for (let i=0;i <=difference2.length;i++){
        let idx = arrayOfAlarmTagCitect.indexOf(difference2[i]);
        while (idx != -1) {
            signalDescriptionFromAlarmsNotfound.push(idx);
            idx = arrayOfAlarmTagCitect.indexOf(difference2[i], idx + 1);
        }
    }


    //
    let missingAlarmMimic = [];
    let missingAlarmSFIMimic = [];
    for(let i=0;i<=signalDescriptionFromAlarmsNotfound.length;i++){ 
        missingAlarmMimic = missingAlarmMimic.concat(arrayOfnameOfAlarmCitect[[signalDescriptionFromAlarmsNotfound[i]]]);
        missingAlarmSFIMimic = missingAlarmSFIMimic.concat(tagsInToBeChecked[[signalDescriptionFromAlarmsNotfound[i]]]);
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



    let ws = XLSX.utils.aoa_to_sheet(arrayFliperRowtoColumn(missingAlarmSFIMimic), {origin: "A1" });  
    XLSX.utils.sheet_add_aoa(ws,arrayFliperRowtoColumn(missingAlarmMimic), {origin: "B1" });
    XLSX.utils.sheet_add_aoa(ws,arrayFliperRowtoColumn(difference2), {origin: "C1" });
    XLSX.utils.sheet_add_aoa(ws,arrayFliperRowtoColumn(tagFilterAway), {origin: "G1" });


    const newWB = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(newWB, ws, "Alarms_Not_In_Mimic");
    XLSX.writeFile(newWB, "C:/Work/- AutoScript/- Files AutoGen/Alarms_Not_In_Mimic.xlsx");


    console.log(`Completed`);
}