'use strict';
/*
TODO: 

*/
function getData(tankNumber, sensorVal, sensorRangeC) {

    let meterWater = sensorRangeC * 10.1972;
    let hightTank = ((sensorVal - 4) * meterWater) / 16;
    let compareHightTank = hightTank.toFixed(1)

    currentOperandTextErrorText.textContent = ""
    let newTankNumber;
    if (tankNumber >= 10) {
        newTankNumber = tankNumber
    } else {
        newTankNumber = `0${tankNumber}`
    }
    fetch(`C:/Work/- AutoScript/IASProject/Json_files/t${newTankNumber}.json`) //
        .then(response => response.json())
        .then(data => {
            let outputJson = '';
            let placeholder = document.querySelector("#data-output")
            let i = 0;
            for (let product of data) {

                i++;
                if (i == 1) {
                    console.log("Skipped");
                } else if (product.H != compareHightTank) {
                    console.log(typeof (product.H), product.H, typeof (compareHightTank), compareHightTank);
                    outputJson += `
                    <tr>
                        <td> ${product.H} m</td>
                        <td > ${product.VNET} m3 </td>
                    </tr>
                `;
                } else if (product.H === compareHightTank) {
                    console.log(`found it  ${product.H} m`);

                    outputJson += `
                    <tr>
                        <td bgcolor="green"> ${product.H} m</td>
                        <td bgcolor="green"> ${product.VNET} m3 </td>
                    </tr>
                `;
                }

            }
            placeholder.innerHTML = outputJson
            currentOperandTextErrorText.textContent = `Tank file shown : t${newTankNumber} `
        })

        .catch(error => {
            if (error) {
                console.error("Error fetching JSON data:", error)
                currentOperandTextErrorText.textContent = `Error message :  ${error}`;
            }
        });




}

function materWater(sensorRangeC, sensorVal) {
    let meterWater = sensorRangeC * 10.1972;

    return currentOperandTextWaterMeter.textContent = `(${sensorVal} mA - 4 mA ) * ${meterWater.toFixed(3)}`

}

function tankCal5barg(sensorVal, sensorRangeC) {
    if (sensorVal > 20 || sensorVal < 4) {
        return currentOperandTextElement2.textContent = "Invalied  sensor data";
    }


    let meterWater = sensorRangeC * 10.1972;
    let hightTank = ((sensorVal - 4) * meterWater) / 16;

    return currentOperandTextElement2.textContent = `=  ${hightTank.toFixed(2)} m`;


}



const btnSend = document.querySelector(".btn--send");
const textinputNumberInt = document.getElementById("textinputNumberbarg");
const sensorRange = document.getElementById("textinputSensorRange");
const tankNumber = document.getElementById("textinputTankNumber");
const allClearButton2 = document.querySelector("[data-all-clearTank]");


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
    tankCal5barg(parseFloat(`${textinputNumberIntC}`), sensorRangeC);
    materWater(sensorRangeC, textinputNumberIntC)
    getData(tankNumberC, parseFloat(`${textinputNumberIntC}`), sensorRangeC)
    // parseInt() converts from STRING to int. We are reading in values from DOM as string. needs to be int for
    //console.log(tankCal5barg(parseFloat(`${textinputNumberIntC}`), sensorRangeC));

});

document.addEventListener(`keydown`, function (e) {
    if (e.key === "Enter") {
        let textinputNumberIntC = textinputNumberInt.value;
        let sensorRangeC = sensorRange.value
        let tankNumberC = tankNumber.value
        materWater(sensorRangeC, textinputNumberIntC)
        getData(tankNumberC, parseFloat(`${textinputNumberIntC}`), sensorRangeC)
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