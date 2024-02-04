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




const completionTankDesc1 = document.getElementById("completionTankDesc");
async function writeToDom(text, domVariable) {
    requestAnimationFrame( () => {
        domVariable.innerHTML = text
    })
}

const btnTankDesc = document.querySelector(".btn--tankDescMaking");
btnTankDesc.addEventListener("click", function () {
    writeToDom("Place wait the process has been started.",completionTankDesc1)
    let worker = new Worker("../forkFolder/makeXlsxTankDesc.js")
    //let sendDataToChild = 
    worker.postMessage("Confirm connection with child process")

    worker.onmessage = function(e){
        console.log(e.data);
        writeToDom(e.data,completionTankDesc1)
    }
    worker.onerror = (error) =>{
        console.log(`Error : ${error}`);
        console.log(error);
        writeToDom(error.message,completionTankDesc1)
    }

  });