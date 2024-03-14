"use strict"
/*
TODO:
Needs to be fixed:

- flowmeters are showing up but they are in Flowmetersetup, tags need to be removed from her.

Needs to be added:
- need to add fucntion that can see if the signal is on alarm controller or cargo controller, AS of now its only cargo controller.

Descrption of Program: 

FIXME: Program not working need to use correct IO LIST!!
*/

self.addEventListener("message",function(e){
    console.log("program started: differenceIOlistVariableFile ",process.pid)
    let data = e.data
    console.log(data);
    
    this.self.postMessage(differenceIOlistVariableFile())
})


function differenceIOlistVariableFile(){
    //--------------------------------- Variables -------------------------------

    let almtagsFromIOList = [];
    let tagsFromIOList = [];
    let missingTagUnique = [];
    let IOareOK = [];
    let tagInfoArray = [];

    let test = [];
    let clusterNameConstant = [];
    let projectNameConstant = [];
    let signalsTypes = [];
    let calcualtedAddress = [];
    let arrayOfMissTagAddressSignalType = [];
    let arrayOfcalcualtedAddress = [];
    let arrayOfCitectAdress = ["Address"];
    let arrayOfDataTypeCitect = ["Data Type"];
    let arrayOfNode = [];
    let arrayOfIoDevice = ["I/O Device"];

    let arrayOfSignalDesc = [];
    let arrayOfSignalDescExcel = [];
    let arrayOfRangeMin = [];
    let arrayOfRangeMax = [];
    let arrayOfRangeMinExcel = [];
    let arrayOfRangeMaxExcel = [];
    let arrayOfEngRangeMin = [];
    let arrayOfEngRangeMax = [];
    let arrayOfEngRangeMinExcel = [];
    let arrayOfEngRangeMaxExcel = [];
    //------------------------------- Getting other Librarys ----------------------------
    //const ExcelJS = require("exceljs");
    const XLSX = require("xlsx");
    const fs = require("fs");
    //const prompt = require("prompt-sync")();
    //const { Console } = require("console");
    //const { exit } = require("process");

    //-------------------------- Program---------------------------------------
    // const input = prompt('Please enter name of IO list you want to be modified: ');
    // console.log(`you have entered ${input}`);
    // console.log("Creating file please wait");
    console.log(
    "You will need to convert .csv file to excel, this can be done with Libre Office, save as and choose << Excel 2007 - 365 >>"
    );
    console.log("Rename IO-list file to this = IO_List");

    const workbook = XLSX.readFile(`C:/Work/- AutoScript/IASProject/IAS_CTRL_Common_Files/IO Liste.xlsx`); // ${input}
    let worksheet = workbook.Sheets["IO List"];
    //const sheet1 = "IO List";
    const dataAI = XLSX.utils.sheet_to_json(worksheet);

    let variableFile1 = variableFileFile1("C:/Work/- AutoScript/IASProject/Citect_Project/variable.DBF",)
    console.log("Gathering files.... Please wait")


    // her i check the include folders for which files are there any file the path for the variableFile file. This for loop is for all under projects like PMS, Tank , valves etc.

    const filepathStart = "C:/Work/- AutoScript/IASProject/Citect_Project/_IncludeProjects"
    var markers = [];
    let checkingPath = fs.readdirSync(filepathStart)
    for (let i = 0; i < checkingPath.length; ++i) {
        if (checkingPath[i].includes("Alarms") || checkingPath[i].includes("PMS") || checkingPath[i].includes("Include")|| checkingPath[i].includes("Library")   ){ 
            
        } else {
            markers[i] = filepathStart +"/"+checkingPath[i] + "/variable.dbf";
            console.log("files includes = ", markers[i]);
        }
    }


    console.log("Working.....")
    //her i am extracting all info of where tags and alarms are placed. from the pdgfile 
    // in the function i will take away empty undefined cells also the empty ones.

    function variableFileFile1(filepathPgd){

        const workbook = XLSX.readFile(filepathPgd);
        let worksheet = workbook.Sheets["Sheet1"];
        const dataAI = XLSX.utils.sheet_to_json(worksheet);

        const getTag= [];

        
        for (const address of dataAI){
        const tagName = address[`NAME`]
        const typeTag = address[`TYPE`]
        const controllSide = address[`UNIT`]
        const addrTag = address[`ADDR`]
        const rawZero = address[`RAW_ZERO`]
        const rawFull = address[`RAW_FULL`]
        const engZero = address[`ENG_ZERO`]
        const engFull = address[`ENG_FULL`]


        getTag.push(tagName)
        }
        
        return getTag
    }


    const variableFileComplett = [variableFile1,]
    for(let i = 0; i <= markers.length -1;i++){ //markers.length -1
        if( markers[i]==undefined ){
        }else {
            variableFileComplett.push(variableFileFile1(markers[i]))
        }
    }


    const tagsInToBeChecked = variableFileComplett[0].concat(variableFileComplett[1],variableFileComplett[2],variableFileComplett[3],variableFileComplett[4],variableFileComplett[5],variableFileComplett[6],variableFileComplett[7],variableFileComplett[8])

    //console.log(tagsInToBeChecked)


    //Getting information from IO-list and putting tag in a new array
    for (const address of dataAI) {
    const tagXI = address[`ISA`];
    const alarmInfo = address[`Alarm`];
    const tagName = address[`Tag Name`];
    const systemName = address[`System Name`];
    const tagInfo = address[`Signal Description`];
    const supplierCode = address[`Supplier   Code`];
    const signalType = address[`SensorSignalType`];
    const calculatedAddressIOList = address["Calcualted Address"];
    const node = address[`Node`];
    const RangeMin = address[`IAS RAW Min`];
    const RangeMax = address[`IAS RAW Max`];
    const rangeEngMin = address[`IAS RangeMin`];
    const rangeEngMax = address[`IAS RangeMax`];

    let newTagName = JSON.stringify(tagName);
    let makingStringOfSupplierCode = JSON.stringify(tagInfo);
    let substr = "Pump";
    let substr1 = "alve";
    let testForPumpInTagInfo;
    let testForValveInTagInfo;
    console.log(tagXI);
    if (tagInfo === undefined || tagInfo == "") {
        false; // do nothing only want to take away error because of when cell is undfined it wont check cell.
    } else {
        testForPumpInTagInfo = makingStringOfSupplierCode.indexOf(substr); // if it returns 0 it has found the word Loop if not its -1
        testForValveInTagInfo = makingStringOfSupplierCode.indexOf(substr1);
    }

    if (tagXI == "XA" || tagXI == "XA1") {
        //  (alarmInfo == "YES") || (alarmInfo == "MON")
        almtagsFromIOList = almtagsFromIOList.concat(newTagName);
    } else if (tagInfo === undefined || tagXI === undefined) {
        almtagsFromIOList = almtagsFromIOList.concat(newTagName);
    } else if (systemName === "Sounding") {
        almtagsFromIOList = almtagsFromIOList.concat(newTagName);
    } else if (
        testForPumpInTagInfo >= 1 &&
        (tagXI == "SRT" ||
        tagXI == "STP" ||
        tagXI == "REM" ||
        tagXI == "RUN" ||
        tagXI == "XC")
    ) {
        almtagsFromIOList = almtagsFromIOList.concat(newTagName);
    } else if (alarmInfo == "Yes" || alarmInfo == "YES") {
        almtagsFromIOList = almtagsFromIOList.concat(newTagName);
    } else if (alarmInfo == "MON" || alarmInfo == "Mon") {
        almtagsFromIOList = almtagsFromIOList.concat(newTagName);
    } else if (tagInfo == "Spare" || tagInfo == "spare") {
        almtagsFromIOList = almtagsFromIOList.concat(newTagName);
    } else if (
        testForValveInTagInfo >= 1 &&
        (tagXI == "XI" ||
        tagXI == "XC" ||
        tagXI == "OPN" ||
        tagXI == "FOP" ||
        tagXI == "FCL" ||
        tagXI == "CLS")
    ) {
        almtagsFromIOList = almtagsFromIOList.concat(newTagName);
    } else if (tagXI == "FI" || tagXI == "FI1") {
    } else {
        //(tagXI !=="XA1") &&    tagXI == "XI" &&   || alarmInfo !== "YES" || alarmInfo !== "MON" || tagInfo !== "spare"|| tagInfo !== "Spare")  || alarmInfo !== "MON"
        tagsFromIOList = tagsFromIOList.concat(newTagName);
        tagInfoArray = tagInfoArray.concat("t" + tagName);
        signalsTypes = signalsTypes.concat(signalType);
        calcualtedAddress = calcualtedAddress.concat(calculatedAddressIOList);
        arrayOfNode = arrayOfNode.concat(node);
        //extra INFO
        arrayOfSignalDesc = arrayOfSignalDesc.concat(tagInfo);

        arrayOfRangeMin = arrayOfRangeMin.concat(RangeMin)
        arrayOfRangeMax = arrayOfRangeMax.concat(RangeMax)
        arrayOfEngRangeMin = arrayOfEngRangeMin.concat(rangeEngMin)
        arrayOfEngRangeMax = arrayOfEngRangeMax.concat(rangeEngMax)
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

    /*
    this checkes array from IO and Variables file from IAS for difference.
    If Tag in IO-list and not in Variables this will be printed */

    let difference1 = [];
    difference1 = tagInfoArray.filter((x) => !tagsInToBeChecked.includes(x));

    //ADDING IAS tag to new colum for the amount of tags not found
    for (let i = 0; i < difference1.length; i++) {
    clusterNameConstant[i] = "IAS";
    }

    //ADDING project name to new colum for the amount of tags not found
    for (let i = 0; i < difference1.length; i++) {
    projectNameConstant[i] = "NB910";
    }

    // Her i find the index's of the missing tags
    let indexOfarrayOfMissTagAddressSignalType = [];
    for (let i = 0; i < difference1.length; i++) {
    let index = tagInfoArray.findIndex(
        (tagInfoArray1) => tagInfoArray1 == difference1[i]
    );
    indexOfarrayOfMissTagAddressSignalType.push(index);
    }

    // Putting in Calculated address and if its DI or AI etc....
    for (let i = 0; i < indexOfarrayOfMissTagAddressSignalType.length; i++) {
    if (signalsTypes[indexOfarrayOfMissTagAddressSignalType[i]] == "DIC") {
        test.push("DI");
    } else if (signalsTypes[indexOfarrayOfMissTagAddressSignalType[i]] == "DI") {
        test.push("DI");
    } else if (signalsTypes[indexOfarrayOfMissTagAddressSignalType[i]] == "DO") {
        test.push("DO");
    } else if (signalsTypes[indexOfarrayOfMissTagAddressSignalType[i]] == "DOC") {
        test.push("DO");
    } else if (signalsTypes[indexOfarrayOfMissTagAddressSignalType[i]] == "AIC") {
        test.push("DI");
    } else if (signalsTypes[indexOfarrayOfMissTagAddressSignalType[i]] == "AI") {
        test.push("AI");
    } else if (signalsTypes[indexOfarrayOfMissTagAddressSignalType[i]] == "AOC") {
        test.push("AO");
    } else if (signalsTypes[indexOfarrayOfMissTagAddressSignalType[i]] == "AO") {
        test.push("AO");
    }
    }

    for (let i = 0; i < indexOfarrayOfMissTagAddressSignalType.length; i++) {
    arrayOfCitectAdress.push(
        test[i] + // signalsTypes[indexOfarrayOfMissTagAddressSignalType[i]]
        ":" +
        calcualtedAddress[indexOfarrayOfMissTagAddressSignalType[i + 1]]
    );
    }

    //Her im check if DI, AI etc and convtering to data type for citect ----- FOR LATER NEEDS to find out if real
    for (let i = 1; i < indexOfarrayOfMissTagAddressSignalType.length; i++) {
    if (signalsTypes[indexOfarrayOfMissTagAddressSignalType[i]] == "DI") {
        arrayOfDataTypeCitect.push("Digital");
    } else if (signalsTypes[indexOfarrayOfMissTagAddressSignalType[i]] == "DIC") {
        arrayOfDataTypeCitect.push("Digital");
    } else if (signalsTypes[indexOfarrayOfMissTagAddressSignalType[i]] == "DOC") {
        arrayOfDataTypeCitect.push("Digital");
    } else if (signalsTypes[indexOfarrayOfMissTagAddressSignalType[i]] == "DO") {
        arrayOfDataTypeCitect.push("Digital");
    } else if (signalsTypes[indexOfarrayOfMissTagAddressSignalType[i]] == "AI") {
        arrayOfDataTypeCitect.push("INT");
    } else if (signalsTypes[indexOfarrayOfMissTagAddressSignalType[i]] == "AIC") {
        arrayOfDataTypeCitect.push("INT");
    } else if (signalsTypes[indexOfarrayOfMissTagAddressSignalType[i]] == "AOC") {
        arrayOfDataTypeCitect.push("INT");
    } else if (signalsTypes[indexOfarrayOfMissTagAddressSignalType[i]] == "AO") {
        arrayOfDataTypeCitect.push("INT");
    }
    }

    // Her im checking if signal is port or starboard side.  ----------------- FOR LATER NEED TO FIND OUT IF ON ALARM controller or cargo---------

    for (let i = 1; i < indexOfarrayOfMissTagAddressSignalType.length; i++) {
    if (arrayOfNode[i] == "Contr02Stbd") {
        arrayOfIoDevice.push("Contr04Stbd");
    } else if (arrayOfNode[i] == "Contr01Port") {
        arrayOfIoDevice.push("Contr03Port");
    }
    }

    // Adding signal description in then end of document....

    for (let i = 0; i < indexOfarrayOfMissTagAddressSignalType.length; i++) {
    arrayOfSignalDescExcel.push(
        arrayOfSignalDesc[indexOfarrayOfMissTagAddressSignalType[i]]
    );
    }

    //adding scaling of sensor by using Range Min.
    for (let i = 0; i < indexOfarrayOfMissTagAddressSignalType.length; i++) {
    arrayOfRangeMinExcel.push(
        arrayOfRangeMin[indexOfarrayOfMissTagAddressSignalType[i]]
    );
    }
    //adding scaling of sensor by using Range Max.
    for (let i = 0; i < indexOfarrayOfMissTagAddressSignalType.length; i++) {
    arrayOfRangeMaxExcel.push(
        arrayOfRangeMax[indexOfarrayOfMissTagAddressSignalType[i]]
    );
    }

    //adding scaling of sensor by using Range Min.
    for (let i = 0; i < indexOfarrayOfMissTagAddressSignalType.length; i++) {
    arrayOfEngRangeMinExcel.push(
        arrayOfEngRangeMin[indexOfarrayOfMissTagAddressSignalType[i]]
    );
    }
    //adding scaling of sensor by using Range Max.
    for (let i = 0; i < indexOfarrayOfMissTagAddressSignalType.length; i++) {
    arrayOfEngRangeMaxExcel.push(
        arrayOfEngRangeMax[indexOfarrayOfMissTagAddressSignalType[i]]
    );
    }


    let ws = XLSX.utils.aoa_to_sheet(arrayFliperRowtoColumn(difference1), {
    origin: "A1",
    });
    XLSX.utils.sheet_add_aoa(ws, arrayFliperRowtoColumn(clusterNameConstant), {
    origin: "B1",
    });

    XLSX.utils.sheet_add_aoa(ws, arrayFliperRowtoColumn(arrayOfIoDevice), {
    origin: "C1",
    });
    XLSX.utils.sheet_add_aoa(ws, arrayFliperRowtoColumn(arrayOfDataTypeCitect), {
    origin: "D1",
    });
    XLSX.utils.sheet_add_aoa(ws, arrayFliperRowtoColumn(arrayOfCitectAdress), {
    origin: "E1",
    });
    XLSX.utils.sheet_add_aoa(ws, arrayFliperRowtoColumn(arrayOfEngRangeMinExcel), {
    origin: "I1",
    });
    XLSX.utils.sheet_add_aoa(ws, arrayFliperRowtoColumn(arrayOfEngRangeMaxExcel), {
    origin: "J1",
    });
    XLSX.utils.sheet_add_aoa(ws, arrayFliperRowtoColumn(arrayOfRangeMinExcel), {
    origin: "G1",
    });
    XLSX.utils.sheet_add_aoa(ws, arrayFliperRowtoColumn(arrayOfRangeMaxExcel), {
    origin: "H1",
    });

    // XLSX.utils.sheet_add_aoa(ws, arrayFliperRowtoColumn(projectNameConstant), {
    //   origin: "K1",
    // });
    XLSX.utils.sheet_add_aoa(ws, arrayFliperRowtoColumn(arrayOfSignalDescExcel), {
    origin: "F1",
    });
    // creating new excel file from array with all the difference between variable file from citect and IO list
    const newWB = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(newWB, ws, "Difference");
    XLSX.writeFile(newWB, "C:/Work/- AutoScript/- Files AutoGen/Difference_between_IOList_And_VariableFile.xlsx");

    console.log(`Completed`);
    return "File completed find file her : C:/Work/- AutoScript/- Files AutoGen"
}