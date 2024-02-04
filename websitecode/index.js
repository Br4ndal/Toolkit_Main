"use strict";


let pathForProject = (path.__dirname.dirname(process.resourcesPath))
let findStartPath = pathForProject.split(pathNode.node.delimiter)
let combingNewPath = findStartPath[0].split(`${"\\"}`);
let newPath = `${combingNewPath[0]}/${combingNewPath[1]}/${combingNewPath[2]}`

console.log(`${newPath}/AppData/Local/Programs/toolkit-main/resources/assets/`);

document.getElementById("pictureExcel").src = `${newPath}/AppData/Local/Programs/toolkit-main/resources/assets/excelImage_copy.jpg`;
document.getElementById("ExtractHere").src = `${newPath}/AppData/Local/Programs/toolkit-main/resources/assets/ExtractHere.jpg`;

ExtractHere