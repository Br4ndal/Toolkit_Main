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
const btnDiffArdigIoList = document.querySelector(".btn--generatDiffArdigIoList");
const btngenerateTrend = document.querySelector(".btn--generateTrend");
const btnDiffIoListArdig = document.querySelector(".btn--generatDiffIoListArdig");
const btnDiffIoListVariable = document.querySelector(".btn--generatDiffIoListVariable");
const btnAlmNotInMimic = document.querySelector(".btn--generatAlmNotInMimic");

const btnAlarmLinker = document.querySelector(".btn--autoAlarmLinkFunction");

const completionTankDesc1 = document.getElementById("completionTankDesc");
const completionDiffArdigIoList1 = document.getElementById("completionDiffArdigIoList");
const completionTrend1 = document.getElementById("completionTrend");
const completionDiffIoListArdig1 = document.getElementById("completionDiffIoListArdig");
const completionDiffIoListVariable1 = document.getElementById("completionDiffIoListVariable");
const programStart1 =document.getElementById("programstarted");

const almNotInMimic1 =document.getElementById("almNotInMimic");


//------------------------------ THIS WIL MAKE tankdesc.csv --------------------------

// function for the tankdesc.csv
startingNewWorker(btnTankDesc,"Place wait, making tankdesc.csv .",completionTankDesc1,"makeXlsxTankDesc.js");

//this is a function for the Alarm Linker
startingNewWorker(btnAlarmLinker,"Please wait, making Alarm Link File.",programStart1,"makeXlsxAL.js");

//this is a function for checking the ardig file to the IO List
startingNewWorker(btnDiffArdigIoList,"Place wait, Comparing Ardig file and IO List.",completionDiffArdigIoList1,"DifferenceAlarmCitectToIoList.js");

//this is a function for making trend File 
startingNewWorker(btngenerateTrend,"Place wait, making trend file.",completionTrend1,"trendGen.js");

//this is a function for checking if alarms are in the mimic
startingNewWorker(btnAlmNotInMimic,"Place wait, making trend file.",almNotInMimic1,"AlmNotInMimic.js");

startingNewWorker(btnDiffIoListVariable,"Place wait, Comparing IO list to Variable File.",completionDiffIoListVariable1,"differenceIOListVariableFile.js");

startingNewWorker(btnDiffIoListArdig,"Place wait, Comparing IO list to Ardig.dbf File.",completionDiffIoListArdig1,"differenceIOListToCitect.js");


function writeToDom(text, domVariable) {
    requestAnimationFrame( () => {
        domVariable.innerHTML = text
    })
}

function startingNewWorker (btnName,domText,domTag,programToStart){
    console.log(`This program is ready : ${programToStart}`);
    btnName.addEventListener("click", function () {
        writeToDom(domText,domTag)
        let worker = new Worker(`../forkFolder/${programToStart}`)
        //let sendDataToChild = 
        worker.postMessage("Confirm connection with child process")
        worker.onmessage = function(e){
            console.log(e.data);
            writeToDom(e.data,domTag)
        }
        worker.onerror = (error) =>{
            console.log(`Error : ${error}`);
            console.log(error);
            writeToDom(error.message,domTag)
        }

    });
    

}