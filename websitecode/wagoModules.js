"use strict";
/*
Descrption of Program: 

Website that shows all wago modules and some 


*/
//const path = require("path");

let pathForProject = (path.__dirname.dirname(process.resourcesPath))
let findStartPath = pathForProject.split(pathNode.node.delimiter)
let combingNewPath = findStartPath[0].split(`${"\\"}`);
let newPath = `${combingNewPath[0]}/${combingNewPath[1]}/${combingNewPath[2]}`

console.log(`${newPath}/AppData/Local/Programs/toolkit-main/resources/assets/`);

document.getElementById("WagoDICH4").src = `${newPath}/AppData/Local/Programs/toolkit-main/resources/assets/WagoDICH4.jpg`;
document.getElementById("UpDownCounter").src = `${newPath}/AppData/Local/Programs/toolkit-main/resources/assets/UpDownCounter.jpg`;
document.getElementById("WagoDOCh4").src = `${newPath}/AppData/Local/Programs/toolkit-main/resources/assets/WagoDOCh4.jpg`;
document.getElementById("WagoAOCh4").src = `${newPath}/AppData/Local/Programs/toolkit-main/resources/assets/WagoAOCh4.jpg`;
document.getElementById("WagoDICh8").src = `${newPath}/AppData/Local/Programs/toolkit-main/resources/assets/WagoDICh8.jpg`;
document.getElementById("WagoAICh2").src = `${newPath}/AppData/Local/Programs/toolkit-main/resources/assets/WagoAICh2.jpg`;
document.getElementById("WagoAICh4").src = `${newPath}/AppData/Local/Programs/toolkit-main/resources/assets/WagoAICh4.jpg`;
document.getElementById("RTDCard").src = `${newPath}/AppData/Local/Programs/toolkit-main/resources/assets/RTDCard.jpg`;
document.getElementById("WagoROCh2").src = `${newPath}/AppData/Local/Programs/toolkit-main/resources/assets/WagoROCh2.jpg`;
document.getElementById("WagoROCh21").src = `${newPath}/AppData/Local/Programs/toolkit-main/resources/assets/WagoROCh2.jpg`;