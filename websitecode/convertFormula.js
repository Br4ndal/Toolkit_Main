'use strict';
/*
TODO: 

*/

function rawTomA(inputraw){
    let mA;
    console.log(typeof(inputraw));
    mA = ((20-4)/(32767-0))*(parseInt(inputraw)-0)+4
    console.log(mA);
    return datavaluemA.textContent = `= ${mA.toFixed(2)} mA`;
}

function mAToRaw(inputmA){
    let raw;
    console.log(typeof(inputmA));
    if (inputmA >= 21){
        return dataValueRaw.textContent ="=  mA too high"
    } else {
        raw = ((32767-0)/(20-4))*(parseInt(inputmA)-4)+0
        console.log(raw);
        return dataValueRaw.textContent = `= ${raw.toFixed(0)}`;
    }

}
//freeCalc(textinputValue.value,textinputPhigh.value,textinputPlow.value,textinputIhigh.value,textinputIlow.value )
function freeCalc(inputValue,MaxR,MinR){
    parseInt(inputValue),parseInt(MaxR),parseInt(MinR)

    let value; 
    value = ((parseInt(MaxR) - parseInt(MinR))/ 32767)* (parseInt(inputValue)-0) +parseInt(MinR)
   
    
    dataAbove.textContent = `${MaxR} - ${MinR} `
    dataLow.textContent = `32767 `
    dataAfter.textContent =`${inputValue} - ${0} + MinR`
    dataCalcValue.textContent = `= ${value}`   
}



const btnSend = document.querySelector(".btn--send");
const allClearButton2 = document.querySelector("[data-all-clearTank]");


//
const inputRawValue = document.getElementById("textinputRawValue");
const inputmA = document.getElementById("textinputmA");

const datavaluemA= document.querySelector(
    "[data-valuemA]"
);
const dataValueRaw = document.querySelector(
    "[data-valueRaw]"
);

//variables for the freecalc function 
const textinputValue = document.getElementById("textinputValue")
const textinputMaxR = document.getElementById("textinputMaxR")
const textinputMinR = document.getElementById("textinputMinR")


const dataAbove= document.querySelector(
    "[data-Above]"
);
const dataLow= document.querySelector(
    "[data-Low]"
);
const dataAfter= document.querySelector(
    "[data-after]"
);
const dataCalcValue= document.querySelector(
    "[data-calcValue]"
);





btnSend.addEventListener("click", function () {

    let inputRawValueC = inputRawValue.value
    let inputmAC = inputmA.value

    let textinputValueC =  textinputValue.value
    let textinputMaxRC =textinputMaxR.value
    let textinputMinRC = textinputMinR.value



    //console.log(textinputValue.value,textinputPhigh.value,textinputPlow.value,textinputIhigh.value,textinputIlow.value);
    rawTomA(inputRawValueC)
    mAToRaw(inputmAC)
    freeCalc(textinputValueC,textinputMaxRC,textinputMinRC )


});

document.addEventListener(`keydown`, function (e) {
    if (e.key === "Enter") {
        let inputRawValueC = inputRawValue.value
        let inputmAC = inputmA.value


        let textinputValueC =  textinputValue.value
        let textinputMaxRC = textinputMaxR.value
        let textinputMinRC = textinputMinR.value
        rawTomA(inputRawValueC)
        mAToRaw(inputmAC)
        freeCalc(textinputValueC,textinputMaxRC,textinputMinRC )
      
    }
});


allClearButton2.addEventListener("click", (button) => {
    inputRawValue.value = "";
    inputmA.value = "";
    textinputValue.value = "";
    textinputMaxR.value = "";
    textinputMinR.value = "";



});
document.addEventListener(`keydown`, function (e) {

    if (e.key === "Escape") {
        inputRawValue.value = "";
        inputmA.value = "";
        textinputValue.value = "";
        textinputMaxR.value = "";
        textinputMinR.value = "";

    }


});