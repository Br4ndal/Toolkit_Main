"use strict";
const btnSendCsvToJson = document.querySelector(".btn--converCsvToJson");
btnSendCsvToJson.addEventListener("click", function () {
    //csvtoJSONFile("C:/Work/- AutoScript/IASProject/IAS_CTRL_Common_Files")
    chi.pro.fork("makeCSVfileToJson.js", {cwd: "forkFolder/"})
    alert("CSV files are now converted to JSON files.")
  });
