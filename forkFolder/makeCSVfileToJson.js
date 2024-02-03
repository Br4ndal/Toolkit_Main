"use strict"; 

const fs = require(`fs`);
const csvToJson = require('csvtojson');

const filePathCSVtoJSON = "C:/Work/- AutoScript/IASProject/IAS_CTRL_Common_Files"

console.log("Prosses started.......")
console.log("Opening files and gathering inforamtion")

// Read folder to find which files i have her
var pathForCSVFile = [];
let checkingPathCSVtoJSON = fs.readdirSync(filePathCSVtoJSON)

for (let i = 0; i < checkingPathCSVtoJSON.length; ++i) {
    pathForCSVFile[i] = filePathCSVtoJSON +"/"+checkingPathCSVtoJSON[i];
}

// checking all the files and IF its .CSV i will use fucntion to convert to JSON.
for(let i=0; i < pathForCSVFile.length;i++){
    let checkForCSV = ".CSV"
    let checkedForCSV = JSON.stringify(pathForCSVFile[i].toUpperCase()).indexOf(checkForCSV);
    if(checkedForCSV >=1){
        localCSVtoJSON(pathForCSVFile[i])
    }
}

//function that turns CSV files to JSON file so i can easier get the information i need from them. And puting them all in a JSON folder where i can read them later.
function localCSVtoJSON (filepath){
    let splitString = filepath.split("/");
    const splitStringF = splitString[5].split(".")[0]
    csvToJson()
    .fromFile(filepath)
    .then((json) => {
        
        fs.writeFileSync("C:/Work/- AutoScript/IASProject/Json_files/" + splitStringF + ".json", JSON.stringify(json), "utf-8", (err) => {
            if (err) console.log(err);
        });
    })
    .catch((err) => {
        console.error(err);
    });

}