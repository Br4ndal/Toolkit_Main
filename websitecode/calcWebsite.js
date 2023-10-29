class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;
    this.clear();
  }

  clear() {
    this.currentOperand = ``;
    this.previousOperand = ``;
    this.operation = undefined;
  }
  delete() {}
  appendNumber(number) {
    let calculcation;
    let testThis = JSON.stringify(number);
    let substr = "ab";
    let substr1 = "I";
    let substr2 = "O";
    let substr3 = "D";
    let arrayIndex7 = [0];

    console.log(testThis);
    if (testThis.indexOf(substr) > 0 && this.currentOperand.includes(substr))
      return; //this.currentOperand = this.currentOperand.toString() + number.toString()
    if (
      (testThis.indexOf(substr1) > 0 ||
        testThis.indexOf(substr2) > 0 ||
        testThis.indexOf(substr3) > 0) &&
      (this.currentOperand.includes(substr1) ||
        this.currentOperand.includes(substr2) ||
        this.currentOperand.includes(substr3))
    )
      return;

    this.currentOperand = this.currentOperand.toString() + number.toString();
    return (calculcation = this.currentOperand);
    //this.compute(this.currentOperand = this.currentOperand.toString() + number.toString())
  }
  chooseOperation(operation) {
    if (this.currentOperand === "") return;
    if (this.previousOperand !== "") {
      this.compute(appendNumber.calculcation);
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = "";
  }
  compute(number) {
    let number1 = this.currentOperand;
    console.log(number1);
    let stringNumber = number1;
    stringNumber.split("");
    let stationCalc = stringNumber[3] + stringNumber[4];
    let stationNoSplitt = Number(stationCalc);
    let stationNoValue1;
    let checkForCab = stringNumber[0] + stringNumber[1] + stringNumber[2];
    let checkForType = stringNumber[5] + stringNumber[6];
    if (checkForCab === "Cab") {
      for (let i = 0; i < stationNoSplitt * 100; i += 200) {
        let j = i + 200;
        //console.log("value of J",j,"before calc",i,stationNoSplitt,typeof i);
        stationNoValue1 = 2000 + i;
      }
      //return this.previousOperand =  stationNoValue1;
      //return stationNoValue1;
    } else if (checkForCab === "Ctr") {
      stationNoValue1 = 1800;
    }

    if (checkForType !== "Cab") {
      number1.split("");
      let iocardType = number1[5] + number1[6];
      let addArr1 = number1[7] + number1[8];
      let iocardNo = Number(addArr1);

      let addArr2 = number1[8] + number1[9];
      let iocardRTD = Number(addArr2);

      let channel = number1[9] + number1[10];
      let channelRTD = number1[10] + number1[11];
      //sorting array from lowest to highest number

      if (
        iocardType === "DI" ||
        iocardType === "DO" ||
        iocardType === "AO" ||
        iocardType === "AI"
      ) {
        if (channel == 1) {
          let ioValue = 4 * iocardNo - 4;
          console.log((this.previousOperand = ioValue + stationNoValue1));
          return (this.previousOperand = ioValue + stationNoValue1);
        }
        if (channel == 2) {
          let ioValue = 4 * iocardNo - 3;
          return (this.previousOperand = ioValue + stationNoValue1);
        }
        if (channel == 3) {
          let ioValue = 4 * iocardNo - 2;
          return (this.previousOperand = ioValue + stationNoValue1);
        }
        if (channel == 4) {
          let ioValue = 4 * iocardNo - 1;
          return (this.previousOperand = ioValue + stationNoValue1);
        }
      } else if (iocardType === "RO") {
        if (channel == 1) {
          let ioValue = 128 + (2 * iocardNo - 2);
          return (this.previousOperand = ioValue + stationNoValue1);
        }
        if (channel == 2) {
          let ioValue = 128 + (2 * iocardNo - 1);
          return (this.previousOperand = ioValue + stationNoValue1);
        }
      } else if (iocardType === "CI") {
        if (channel == 1) {
          let ioValue = 100 + (2 * iocardNo - 2);
          return (this.previousOperand = ioValue + stationNoValue1);
        }
        if (channel == 2) {
          let ioValue = 100 + (2 * iocardNo - 1);
          return (this.previousOperand = ioValue + stationNoValue1);
        }
      } else if (iocardType === "RTD" || iocardType === "RT") {
        if (channelRTD == 1) {
          let ioValue = 64 + (2 * iocardRTD - 2);
          return (this.previousOperand = ioValue + stationNoValue1);
        }
        if (channelRTD == 2) {
          let ioValue = 64 + (2 * iocardRTD - 1);
          return (this.previousOperand = ioValue + stationNoValue1);
        }
      }

      return (this.previousOperand = stationNoValue1 + ioValue);
    }
  }
  updateDisplay() {
    this.currentOperandTextElement.innerText = this.currentOperand; //this.getDisplayNumber(
    this.previousOperandTextElement.innerText = `${this.previousOperand}`;
  }
}

const numberButton = document.querySelectorAll("[cabinetNr]");
const channelType = document.querySelectorAll("[channelType]");
const iocardnr = document.querySelectorAll("[iocardnr]");
const channelNr = document.querySelectorAll("[channelNr]");
const equalsButton = document.querySelector("[data-equals]");
//const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector("[data-all-clear]");
const cabGrid = document.querySelector(`.cab-grid`);
const channelTypeGrid = document.querySelector(`.channelType-grid`);
const ioCardNrGrid = document.querySelector(`.iocardnr-grid`);
const channelNrGrid = document.querySelector(`.channelNr-grid`);
const buttonChannelType = document.querySelectorAll(`.buttonChannel-Type`);

const previousOperandTextElement = document.querySelector(
  "[data-previous-operend]"
);
const currentOperandTextElement = document.querySelector(
  "[data-current-operend]"
);

const calculator = new Calculator(
  previousOperandTextElement,
  currentOperandTextElement
);

numberButton.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
    console.log(numberButton);
    cabGrid.classList.add(`testStian`);
    channelTypeGrid.classList.remove(`testStian`);
    console.log(currentOperandTextElement.textContent);
  });
});

channelType.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
    console.log(channelType);
    hiddenClass();
    channelTypeGrid.classList.add(`testStian`);
    ioCardNrGrid.classList.remove(`testStian`);
  });
});
iocardnr.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
    ioCardNrGrid.classList.add(`testStian`);
    channelNrGrid.classList.remove(`testStian`);
  });
});

channelNr.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText);
    calculator.compute();
    calculator.updateDisplay();

    channelNrGrid.classList.add(`testStian`);
  });
});

allClearButton.addEventListener("click", (button) => {
  calculator.clear();
  calculator.updateDisplay();
  cabGrid.classList.remove(`testStian`);
  init();
});

/* DONT NEED EQUAL button. will calculate after  the channel number is press.
equalsButton.addEventListener("click", (button) => {
  calculator.compute();
  calculator.updateDisplay();
});
*/
const init = function () {
  channelTypeGrid.classList.add(`testStian`);
  ioCardNrGrid.classList.add(`testStian`);
  channelNrGrid.classList.add(`testStian`);
  buttonChannelType[0].classList.remove(`hidden`);
  buttonChannelType[1].classList.remove(`hidden`);
};
init();

const hiddenClass = function () {
  let splitString = currentOperandTextElement.textContent.split("");

  let checkString = splitString[5] + splitString[6];

  if (checkString === "RT" || checkString === "CI" || checkString === "RO"  ) {
    buttonChannelType[0].classList.add(`hidden`);
    buttonChannelType[1].classList.add(`hidden`);
  }
};


//Calculating module number for   DI, AI, DO and AO modules
function moduleCalc(addressInput,cabinetAddress){
  let moduleNr = ((addressInput-cabinetAddress )/4)+1;
  return Math.floor(moduleNr);
}


//Calculating module number for RO
function moduleCalcRO (addressInput,cabinetAddress){
  let cabinetAddressRO = cabinetAddress + 128;
  let moduleNr = ((addressInput-cabinetAddressRO )/2)+1;
  return Math.floor(moduleNr);
}
function moduleCalcCI (addressInput,cabinetAddress){
  let cabinetAddressRO = cabinetAddress + 100;
  let moduleNr = ((addressInput-cabinetAddressRO )/2)+1;
  return Math.floor(moduleNr);
}

function moduleCalcRTD (addressInput,cabinetAddress){
  let cabinetAddressRO = cabinetAddress + 64;
  let moduleNr = ((addressInput-cabinetAddressRO )/2)+1;
  return Math.floor(moduleNr);
}

//calculation off channel
function channelCalc(addressInput,cabinetAddress){
  let channel = ((addressInput-cabinetAddress)/4);
  
  //getting the decimal to check what channel
  let decimalChannel = channel.toString().indexOf(".");
  let finalDecimal = channel.toString().substring(decimalChannel+1);
 
  if (finalDecimal == "25") {
    return 2;
  } else if (finalDecimal == "5") {
    return 3;
  }else if (finalDecimal == "75") {
    return 4;
  }else {
    return 1;
  }

}

function channelCalcRO(addressInput,cabinetAddress){

  let cabinetAddressRO = cabinetAddress + 128;
  let channel = ((addressInput)/2);

  //getting the decimal to check what channel
  let decimalChannel = channel.toString().indexOf(".");
  let finalDecimal = channel.toString().substring(decimalChannel+1);

  if (finalDecimal == "5") {
    return 2;
  }else {
    return 1;
  }

}
function channelCalcCI(addressInput,cabinetAddress){

  let cabinetAddressRO = cabinetAddress + 100;
  let channel = ((addressInput)/2);

  //getting the decimal to check what channel
  let decimalChannel = channel.toString().indexOf(".");
  let finalDecimal = channel.toString().substring(decimalChannel+1);

  if (finalDecimal == "5") {
    return 2;
  }else {
    return 1;
  }

}
function channelCalcRTD (addressInput,cabinetAddress){

  let cabinetAddressRO = cabinetAddress + 64;
  let channel = ((addressInput)/2);

  //getting the decimal to check what channel
  let decimalChannel = channel.toString().indexOf(".");
  let finalDecimal = channel.toString().substring(decimalChannel+1);

  if (finalDecimal == "5") {
    return 2;
  }else {
    return 1;
  }

}





const btnSend = document.querySelector(".btn--send");

const allClearButton2 = document.querySelector("[data-all-clear2]");


const currentOperandTextElement2 = document.querySelector(
  "[data-current-operend2]"  // AI output
);
const currentOperandTextElement3 = document.querySelector(
  "[data-current-operend3]" // AO output
);
const currentOperandTextElement4 = document.querySelector(
  "[data-current-operend4]" //DI Output
);
const currentOperandTextElement5 = document.querySelector(
  "[data-current-operend5]" // DO output
);
const currentOperandTextElement6 = document.querySelector(
  "[data-current-operend6]" // RO output
);
const currentOperandTextElement7 = document.querySelector(
  "[data-current-operend7]" // CI output
);
const currentOperandTextElement8 = document.querySelector(
  "[data-current-operend8]" // RTD output
);


