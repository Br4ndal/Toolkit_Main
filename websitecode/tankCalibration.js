'use strict';
/*
TODO: 

*/
function materWater(sensorRangeC, sensorVal) {
    let meterWater = sensorRangeC * 10.1972;

    return currentOperandTextWaterMeter.textContent = `(${sensorVal} mA - 4 mA )* ${meterWater.toFixed(3)}`

}

function tankCal5barg(sensorVal, sensorRangeC) {
    if (sensorVal > 20 || sensorVal < 4) {
        return currentOperandTextElement2.textContent = "Invalied  sensor data";
    }
    const barg5 = 5.0987214446105; // 5.0987214446105  5.0985

    let meterWater = sensorRangeC * 10.1972;
    let hightTank = ((sensorVal - 4) * meterWater) / 16;

    return currentOperandTextElement2.textContent = `=  ${hightTank.toFixed(2)} m`;


}



const btnSend = document.querySelector(".btn--send");
const textinputNumberInt = document.getElementById("textinputNumberbarg");
const sensorRange = document.getElementById("textinputSensorRange");
const allClearButton2 = document.querySelector("[data-all-clearTank]");


const currentOperandTextElement2 = document.querySelector(
    "[data-current-5barg]"
);
const currentOperandTextWaterMeter = document.querySelector(
    "[data-current-waterMeter]"
);


btnSend.addEventListener("click", function () {
    let textinputNumberIntC = textinputNumberInt.value;
    let sensorRangeC = sensorRange.value
    materWater(sensorRangeC, textinputNumberIntC)
    tankCal5barg(parseFloat(`${textinputNumberIntC}`), sensorRangeC); // parseInt() converts from STRING to int. We are reading in values from DOM as string. needs to be int for
    console.log(textinputNumberIntC, sensorRangeC);

});

document.addEventListener(`keydown`, function (e) {
    if (e.key === "Enter") {
        let textinputNumberIntC = textinputNumberInt.value;
        let sensorRangeC = sensorRange.value
        materWater(sensorRangeC, textinputNumberIntC)
        tankCal5barg(parseFloat(`${textinputNumberIntC}`), sensorRangeC); // parseInt() converts from STRING to int. We are reading in values from DOM as string. needs to be int for
        console.log(parseFloat(textinputNumberIntC), sensorRangeC);

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