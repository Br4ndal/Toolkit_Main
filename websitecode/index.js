"use strict";


let pathForProject = (path.__dirname.dirname(process.resourcesPath))
let findStartPath = pathForProject.split(pathNode.node.delimiter)
let combingNewPath = findStartPath[0].split(`${"\\"}`);
let newPath = `${combingNewPath[0]}/${combingNewPath[1]}/${combingNewPath[2]}`

console.log(`${newPath}/AppData/Local/Programs/toolkit-main/resources/assets/`);

document.getElementById("logo").src = `${newPath}/AppData/Local/Programs/toolkit-main/resources/assets/logo_small.jpg`;