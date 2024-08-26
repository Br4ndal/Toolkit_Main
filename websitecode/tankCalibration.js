'use strict';
/*
TODO: 

*/
function getData(tankNumber, sensorVal, sensorRangeC,formula) {

    //formulla to calculate the height of the tank, needed so i can mark the field green below
    let meterWater
    if(!formula) {meterWater = sensorRangeC/ 10000 * 10.1972} else {meterWater = sensorRangeC * 10.1972} //* 10.1972;
    
    
    let hightTank = ((sensorVal - 4) * meterWater) / 16;
    let compareHightTank = hightTank.toFixed(1)

    currentOperandTextErrorText.textContent = "" // sending  error text to empty

    // manipulating the tank numbers so dont neeed to write 0 before 1
    let newTankNumber;
    if (tankNumber >= 10) {
        newTankNumber = tankNumber
    } else {
        newTankNumber = `0${tankNumber}`
    }
    //function for getting the tank table, and putting in the DOM
    fetch(`C:/Work/- AutoScript/IASProject/Json_files/t${newTankNumber}.json`) //
        .then(response => response.json())
        .then(data => {
            let outputJson = '';
            let placeholder = document.querySelector("#data-output")
            let i = 0;
            let tempVarHeight;
            for (let product of data) {
                tempVarHeight = (parseFloat(product.H)).toFixed(1)

                i++;
                if (i == 1) {
                    console.log("Skipped");
                } else if (tempVarHeight != compareHightTank) {
                    //console.log(typeof (product.H), product.H, typeof (compareHightTank), compareHightTank);
                    outputJson += `
                    <tr>
                        <td> ${tempVarHeight} m</td>
                        <td > ${product.VNET} m3 </td>
                    </tr>
                `;
                } else if (tempVarHeight === compareHightTank) {
                    //console.log(`found it  ${product.H} m`);
                    outputJson += `
                    <tr>
                        <td bgcolor="green"> ${tempVarHeight} m</td>
                        <td bgcolor="green"> ${product.VNET} m3 </td>
                    </tr>
                `;
                }

            }
            placeholder.innerHTML = outputJson
            currentOperandTextErrorText.textContent = `Tank file shown : t${newTankNumber} `
        })

        .catch(error => { // error message if it fails to OPEN or find the tank file.
            if (error) {
                console.error("Error fetching JSON data:", error)
                currentOperandTextErrorText.textContent = `Error message :  ${error}`;
            }
        });




}
// function to add the  meter water to the formula in the dom.
function materWater(sensorRangeC, sensorVal,formula) {

    let meterWater
    if (!formula){
        console.log("in mmWC",parseFloat(sensorRangeC)* 10.1972);
        meterWater = parseFloat(sensorRangeC)/ 10000 * 10.1972 // * 10.1972;
        return currentOperandTextWaterMeter.textContent = `(${sensorVal} mA - 4 mA ) * ${meterWater.toFixed(2)}`//
    } else {
        console.log("in bar",parseFloat(sensorRangeC)* 10.1972);
        meterWater = parseFloat(sensorRangeC) * 10.1972;
        return currentOperandTextWaterMeter.textContent = `(${sensorVal} mA - 4 mA ) * ${meterWater.toFixed(2)}`//
    }


}
// calculates the height of the sensor. 
function tankCal5barg(sensorVal, sensorRangeC,formula) {
    if (sensorVal > 20 || sensorVal < 4) {
        return currentOperandTextElement2.textContent = "Invalied  sensor data";
    }
    let meterWater
    let hightTank

    if (!formula){
        meterWater= (parseFloat(sensorRangeC) / 10000 * 10.1972)   /// 10197) * 10.1972///10197 //);
        
        hightTank = ((parseFloat(sensorVal) - 4) * meterWater) / 16;
    
        return currentOperandTextElement2.textContent = `=  ${hightTank.toFixed(2)} m`;
    } else{
        meterWater = parseFloat(sensorRangeC) * 10.1972///10197 //);
        
        hightTank = ((parseFloat(sensorVal) - 4) * meterWater) / 16;
    
        return currentOperandTextElement2.textContent = `=  ${hightTank.toFixed(2)} m`;

    }



}

let valueCheckBox =1;
document.getElementById("checkboxSensorType").addEventListener("click", function(){ 
    if (this.checked) {
        console.log(document.getElementById("checkboxSensorType").checked);
        textElementInputSensorType.textContent = "bar"
        textElementInputSensorType2.textContent = "bar"
    } else {
        console.log(document.getElementById("checkboxSensorType").checked);
        textElementInputSensorType.textContent = "mmWG"
        textElementInputSensorType2.textContent = "mmWG"
    }
    
 });
 const textElementInputSensorType = document.querySelector(
    "[data-inputSensorType]"
);
const textElementInputSensorType2 = document.querySelector(
    "[data-inputSensorType2]"
);

const btnSend = document.querySelector(".btn--send");
const textinputNumberInt = document.getElementById("textinputNumberbarg");
const sensorRange = document.getElementById("textinputSensorRange");
const tankNumber = document.getElementById("textinputTankNumber");
const allClearButton2 = document.querySelector("[data-all-clearTank]");
const inputSensorType = document.getElementById("inputSensorType");
const checkboxSensorType1=  document.getElementById("checkboxSensorType");

const currentOperandTextElement2 = document.querySelector(
    "[data-current-5barg]"
);
const currentOperandTextWaterMeter = document.querySelector(
    "[data-current-waterMeter]"
);


const currentOperandTextErrorText = document.querySelector(
    "[data-current-errorTank ]"
);
btnSend.addEventListener("click", function () {
    let textinputNumberIntC = textinputNumberInt.value;
    let sensorRangeC = sensorRange.value
    let tankNumberC = tankNumber.value
    let checkBoxValue = checkboxSensorType1.checked

    console.log("value of box",checkBoxValue   );
    tankCal5barg(parseFloat(`${textinputNumberIntC}`), sensorRangeC, checkBoxValue);
    materWater(sensorRangeC, textinputNumberIntC,checkBoxValue);
    getData(tankNumberC, parseFloat(`${textinputNumberIntC}`), sensorRangeC,checkBoxValue)
    // parseInt() converts from STRING to int. We are reading in values from DOM as string. needs to be int for
    //console.log(tankCal5barg(parseFloat(`${textinputNumberIntC}`), sensorRangeC));

});

document.addEventListener(`keydown`, function (e) {
    if (e.key === "Enter") {
        let textinputNumberIntC = textinputNumberInt.value;
        let sensorRangeC = sensorRange.value
        let tankNumberC = tankNumber.value
        let checkBoxValue = checkboxSensorType1.checked
        materWater(sensorRangeC, textinputNumberIntC,checkBoxValue)
        getData(tankNumberC, parseFloat(`${textinputNumberIntC}`), sensorRangeC,checkBoxValue)
        tankCal5barg(parseFloat(`${textinputNumberIntC}`), sensorRangeC,checkBoxValue); // parseInt() converts from STRING to int. We are reading in values from DOM as string. needs to be int for
        //console.log(parseFloat(textinputNumberIntC), sensorRangeC);

    }
});


allClearButton2.addEventListener("click", (button) => {
    textinputNumberInt.value = "";

});
document.addEventListener(`keydown`, function (e) {

    if (e.key === "Escape") {
        textinputNumberInt.value = "";
    }


});