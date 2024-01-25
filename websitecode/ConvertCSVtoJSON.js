"use strict";
const btnSendCsvToJson = document.querySelector(".btn--converCsvToJson");
btnSendCsvToJson.addEventListener("click", function () {
    csvtoJSONFile("C:/Work/- AutoScript/IAS_proj/IAS_CTRL_Common_Files")
  });

  
function csvtoJSONFile(FilePath){
    const filePathCSVtoJSON = FilePath

    console.log("Prosses started.......1")
    console.log("Opening files and gathering inforamtion")
    
    // Read folder to find which files i have her
    let pathForCSVFile = [];
    let checkingPathCSVtoJSON = fs1.readFile1.readdirSync(filePathCSVtoJSON)
    
    //console.log(pathForCSVFile)
    for (let i = 0; i < checkingPathCSVtoJSON.length; ++i) {

        pathForCSVFile.push(filePathCSVtoJSON +"/"+checkingPathCSVtoJSON[i]);
    }

    // checking all the files and IF its .CSV i will use fucntion to convert to JSON.
    for(let i=0; i < pathForCSVFile.length;i++){
        let checkForCSV = ".CSV"
        let checkedForCSV = JSON.stringify(pathForCSVFile[i].toUpperCase()).indexOf(checkForCSV);
        if(checkedForCSV >=1){
            document.getElementById("valueOfJSonFile").innerHTML = pathForCSVFile.length;
            localCSVtoJSON(pathForCSVFile[i])
        }
    }

}
    //function that turns CSV files to JSON file so i can easier get the information i need from them. And puting them all in a JSON folder where i can read them later.
function localCSVtoJSON (filepath){
    let splitString = filepath.split("/");
    const splitStringF = splitString[5].split(".")[0];
    console.log(splitStringF);
    const csvData = fs1.readFile1.readFileSync(filepath, 'utf8')
    const jsonData = pepe.p.parse(csvData, { header: true})
    fs1.readFile1.writeFileSync("C:/Work/- AutoScript/IAS_proj/Json_files/" + splitStringF +".json",JSON.stringify(jsonData))
}

