const XLSX = require("xlsx") 


let data = process.argv.slice(2);
//console.log("test1:", data[1]);


//console.log(typeof(data), typeof(test123));
// let ws = XLSX.utils.aoa_to_sheet(arrayFliperRowtoColumn(data), {origin: "A1" });
// const newWB = XLSX.utils.book_new();
// XLSX.utils.book_append_sheet(newWB, ws, "Citet_AlarmLink");
//XLSX.writeFileSync(data, "C:/Work/- AutoScript/- Files AutoGen/Citect_Alarm_Link.xlsx");
console.log(data[1]);
console.log("test");


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