const calcOfvalve = function (valveSFI, calcValveNumber, valveNumber,textInputValveP) {
  let blk 
  let cmd 
  let fbk 
  let pdem;
  let pfbk;
  let sys 
  let txt 
  let typ 

  if(textInputValveP == "600"){ // valve program 600 ato 604
    blk = 8800;
    cmd = 17300;
    fbk = 17300;
    pdem = 17000;
    pfbk = 17600;
    sys = "I";
    txt = "S";
    typ = 17000;
  } else if(textInputValveP == "500"){ // valve program 500  to 508
    blk = 8800;
    cmd = 17200;
    fbk = 17600;
    pdem = 17000;
    pfbk = 17400;
    sys = "I";
    txt = "S";
    typ = 17000;
  } else if(textInputValveP == "100"){ // valve program 100 to 124
    blk = 8800;
    cmd = 17200;
    fbk = 17600;
    pdem = 17000;
    pfbk = 17400;
    sys = "I";
    txt = "S";
    typ = 17000;
  }else if(textInputValveP == "200"){ // valve program 200 and 201
    blk = 8800;
    cmd = 17200;
    fbk = 17600;
    pdem = 17000;
    pfbk = 17400;
    sys = "I";
    txt = "S";
    typ = 17000;
  }
  const cabSide = valveNumber % 2 == 0 ? "Contr04Stbd" : "Contr03Port"; // her checking if number is even or odd, to print correct cab Side
  const Valve = "Valve";

  // the calculation of the addresses for the valve
  let valve_blk = blk + calcValveNumber;
  let valve_cmd = cmd + calcValveNumber;
  let valve_fbk = fbk + calcValveNumber;
  let valve_pdem = pdem + calcValveNumber;
  let valve_pfbk = pfbk + calcValveNumber;
  let valve_sys = sys + valveNumber;
  let valve_txt = txt + valveNumber;
  let valve_typ = typ + calcValveNumber;

  // her im just adding the singal type infront of the adress
  let output_blk = "DO:" + valve_blk;
  let output_cmd = "AO:" + valve_cmd;
  let output_fbk = "AI:" + valve_fbk;
  let output_pdem = "AO:" + valve_pdem;
  let output_pfbk = "AI:" + valve_pfbk;
  let output_sys = valve_sys;
  let output_txt = valve_txt;
  let output_typ = "AI:" + valve_typ;

  // Her im printing to the table
  sfiValveColum[0].textContent = "t" + valveSFI + "_BLK";
  sfiValveColum[1].textContent = "t" + valveSFI + "_CMD";
  sfiValveColum[2].textContent = "t" + valveSFI + "_FBK";
  sfiValveColum[3].textContent = "t" + valveSFI + "_PDEM";
  sfiValveColum[4].textContent = "t" + valveSFI + "_PFBK";
  sfiValveColum[5].textContent = "t" + valveSFI + "_SYS";
  sfiValveColum[6].textContent = "t" + valveSFI + "_TXT";
  sfiValveColum[7].textContent = "t" + valveSFI + "_TYP";

  cabNrColum[0].textContent = cabSide;
  cabNrColum[1].textContent = cabSide;
  cabNrColum[2].textContent = cabSide;
  cabNrColum[3].textContent = cabSide;
  cabNrColum[4].textContent = cabSide;
  cabNrColum[5].textContent = Valve;
  cabNrColum[6].textContent = Valve;
  cabNrColum[7].textContent = cabSide;

  addressColum[0].textContent = output_blk;
  addressColum[1].textContent = output_cmd;
  addressColum[2].textContent = output_fbk;
  addressColum[3].textContent = output_pdem;
  addressColum[4].textContent = output_pfbk;
  addressColum[5].textContent = output_sys;
  addressColum[6].textContent = output_txt;
  addressColum[7].textContent = output_typ;
};

function valveCalc1(valveSFI, valveNumber,textInputValveP) {
  if (valveNumber % 2 == 0) {
    //valve is Even
    let calcValveNumber = (valveNumber - 1) / 2 - 0.5; // forumal to calc even number for valve address
    calcOfvalve(valveSFI, calcValveNumber, valveNumber,textInputValveP);
  } else {
    //valve is ODD
    let calcValveNumber = (valveNumber - 1) / 2; // forumal to calc odd number for valve address
    calcOfvalve(valveSFI, calcValveNumber, valveNumber,textInputValveP);
  }
}

//let valveNumberInput1 = document.querySelector(".valveNumberInput-0");
const valveNumberInput1 = document.getElementById("valveNumberInput-0");
const sfiNumberInput1 = document.getElementById("sfiNumberInput-1");
const score0El = document.getElementById("score--0");
const valveProgramNr = document.getElementById("valveProgramNrhtml")
// variables for the DOM element
const sfiValveColum = document.querySelectorAll(".sfiValveColum"); //this get all classes for the column  //const sfiValveR1 = document.getElementById("sfiValveR1");  gett ID
const signalTypeColum = document.querySelectorAll(".signalTypeColum");
const cabNrColum = document.querySelectorAll(".cabNrColum");
const addressColum = document.querySelectorAll(".addressColum");


const btnSend = document.querySelector(".btn--send");

let textinputSFI, textinputValveNr,textInputValveP;

btnSend.addEventListener("click", function () {
  textinputSFI = sfiNumberInput1.value;
  textinputValveNr = valveNumberInput1.value;
  textInputValveP = valveProgramNr.value;

  valveCalc1(textinputSFI, parseInt(`${textinputValveNr}`),textInputValveP); // parseInt() converts from STRING to int. We are reading in values from DOM as string. needs to be int for
  console.log(textinputSFI, textinputValveNr,textInputValveP);
});

document.addEventListener(`keydown`, function (e) {
  if (e.key === "Enter") {
    textinputSFI = sfiNumberInput1.value;
    textinputValveNr = valveNumberInput1.value;
    valveCalc1(textinputSFI, parseInt(`${textinputValveNr}`));
  }
});
