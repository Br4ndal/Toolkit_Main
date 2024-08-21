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
function freeCalc(inputValue,Phigh,Plow,Ihigh,ilow){
    parseInt(inputValue),parseInt(Phigh),parseInt(Plow),parseInt(Ihigh),parseInt(ilow)

    let value;
    value = ((parseInt(Phigh)-parseInt(Plow))/(parseInt(Ihigh)-parseInt(ilow))) * ((parseInt(inputValue)-parseInt(ilow)) + parseInt(Plow))
   
    
    dataAbove.textContent = `${Phigh} - ${Plow} `
    dataLow.textContent = `${Ihigh} - ${ilow} `
    dataAfter.textContent =`* ${inputValue} - ${ilow} +${Plow} `
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
const textinputPhigh = document.getElementById("textinputPhigh")
const textinputPlow = document.getElementById("textinputPlow")
const textinputIhigh = document.getElementById("textinputIhigh")
const textinputIlow = document.getElementById("textinputIlow")

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
    // let textinputValueC = 16//textinputValue.value
    // let textinputPhighC =32767 //textinputPhigh.value
    // let textinputPlowC =0 //textinputPlow.value
    // let textinputIhighC =20 //textinputIhigh.value
    // let textinputIlowC =4 //textinputIlow.value


    //console.log(textinputValue.value,textinputPhigh.value,textinputPlow.value,textinputIhigh.value,textinputIlow.value);
    rawTomA(inputRawValueC)
    mAToRaw(inputmAC)
    freeCalc(textinputValueC,textinputPhighC,textinputPlowC,textinputIhighC,textinputIlowC )


});

document.addEventListener(`keydown`, function (e) {
    if (e.key === "Enter") {
        let inputRawValueC = inputRawValue.value
        let inputmAC = inputmA.value
        let textinputValueC = textinputValue.value
        let textinputPhighC = textinputPhigh.value
        let textinputPlowC = textinputPlow.value
        let textinputIhighC = textinputIhigh.value
        let textinputIlowC = textinputIlow.value
        // let textinputValueC = 20//textinputValue.value
        // let textinputPhighC =32767 //textinputPhigh.value
        // let textinputPlowC =0 //textinputPlow.value
        // let textinputIhighC =20 //textinputIhigh.value
        // let textinputIlowC =4 //textinputIlow.value
        rawTomA(inputRawValueC)
        mAToRaw(inputmAC)
        
        freeCalc(textinputValueC,textinputPhighC,textinputPlowC,textinputIhighC,textinputIlowC )
    }
});


allClearButton2.addEventListener("click", (button) => {
    inputRawValue.value = "";
    inputmA.value = "";
    textinputValue.value = "";
    textinputPhigh.value = "";
    textinputPlow.value = "";
    textinputIhigh.value = "";
    textinputIlow.value = "";


});
document.addEventListener(`keydown`, function (e) {

    if (e.key === "Escape") {
        inputRawValue.value = "";
        inputmA.value = "";
        textinputValue.value = "";
        textinputPhigh.value = "";
        textinputPlow.value = "";
        textinputIhigh.value = "";
        textinputIlow.value = "";
    }


});