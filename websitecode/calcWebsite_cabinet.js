

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

const calcInputInt = function(numberInt){
  let ctrl1_2 = 1800;
  let IoCab01_02 = 2000;
  let IoCab03_04 = 2200;
  let IoCab05_06 = 2400;
  let IoCab07_08 = 2600;
  let IoCab09_10 = 2800;
  let IoCab11_12 = 3000;
  let IoCab13_14 = 3200;
  let IoCab15_16 = 3400;
  let IoCab17_18 = 3600;
  let IoCab19_20 = 3800;
  let IoCab21_22 = 4000;
  let IoCab23_24 = 4200;
  let IoCab25_26 = 4400;
  let IoCab27_28 = 4600;
  let IoCab29_30 = 4800;
  let IoCab31_32 = 5000;
  let IoCab33_34 = 5200;
  let IoCab35_36 = 5400;
  let IoCab37_38 = 5600;
  let IoCab39_40 = 5200;
  let IoCab41_42 = 5400;

 // -------------------------------------------- CTRL CAB 01 and 02 -----------------------------------------------------------------------------------
  if (numberInt >= ctrl1_2  & numberInt < IoCab01_02){
    let tempVariableRO, tempVariableCI, tempVariableRTD;   
    
    if (numberInt <= (ctrl1_2+127)){
      tempVariableRO = currentOperandTextElement6.textContent = `--------------------`;
    } else{
      tempVariableRO  = currentOperandTextElement6.textContent = `CTRL1/2 Cabinet RO${moduleCalcRO(numberInt,ctrl1_2)}:${channelCalcRO(numberInt,ctrl1_2)}`;
    }
    
    if ((numberInt <= (ctrl1_2 + 99) )){
      tempVariableCI = currentOperandTextElement7.textContent = `--------------------`;
    } else{
      tempVariableCI  = currentOperandTextElement7.textContent = `CTRL1/2 Cabinet CI${moduleCalcCI(numberInt,ctrl1_2)}:${channelCalcCI(numberInt,ctrl1_2)}`;
    }
    
    if ((numberInt <= (ctrl1_2 + 63) )){
      tempVariableRTD = currentOperandTextElement8.textContent = `--------------------`;
    } else{
      tempVariableRTD  = currentOperandTextElement8.textContent = `CTRL1/2 Cabinet RTD${moduleCalcRTD(numberInt,ctrl1_2)}:${channelCalcRTD(numberInt,ctrl1_2)}`;
    }

    let tempVariableAI = currentOperandTextElement2.textContent = `CTRL1/2 Cabinet AI${moduleCalc(numberInt,ctrl1_2)}:${channelCalc(numberInt,ctrl1_2)}`;
    let tempVariableAO = currentOperandTextElement3.textContent = `CTRL1/2 Cabinet AO${moduleCalc(numberInt,ctrl1_2)}:${channelCalc(numberInt,ctrl1_2)}`;
    let tempVariableDI = currentOperandTextElement4.textContent = `CTRL1/2 Cabinet DI${moduleCalc(numberInt,ctrl1_2)}:${channelCalc(numberInt,ctrl1_2)}`;
    let tempVariableDO = currentOperandTextElement5.textContent = `CTRL1/2 Cabinet DO${moduleCalc(numberInt,ctrl1_2)}:${channelCalc(numberInt,ctrl1_2)}`;


    return tempVariableAI, tempVariableAO,tempVariableDI,tempVariableDO,tempVariableRO,tempVariableCI, tempVariableRTD;


// -------------------------------------------- IO CAB 01 and 02 -----------------------------------------------------------------------------------
  } else if(numberInt >= IoCab01_02  & numberInt < IoCab03_04){
    let tempVariableRO, tempVariableCI, tempVariableRTD;   
    
    if (numberInt <= (IoCab01_02+127)){
      tempVariableRO = currentOperandTextElement6.textContent = `--------------------`;
    } else{
      tempVariableRO  = currentOperandTextElement6.textContent = `IO Cab 1/2 Cabinet RO${moduleCalcRO(numberInt,IoCab01_02)}:${channelCalcRO(numberInt,IoCab01_02)}`;
    }
    
    if ((numberInt <= (IoCab01_02 + 99) )){
      tempVariableCI = currentOperandTextElement7.textContent = `--------------------`;
    } else{
      tempVariableCI  = currentOperandTextElement7.textContent = `IO Cab 1/2 Cabinet CI${moduleCalcCI(numberInt,IoCab01_02)}:${channelCalcCI(numberInt,IoCab01_02)}`;
    }
    
    if ((numberInt <= (IoCab01_02 + 63) )){
      tempVariableRTD = currentOperandTextElement8.textContent = `--------------------`;
    } else{
      tempVariableRTD  = currentOperandTextElement8.textContent = `IO Cab 1/2 Cabinet RTD${moduleCalcRTD(numberInt,IoCab01_02)}:${channelCalcRTD(numberInt,IoCab01_02)}`;
    }

    let tempVariableAI = currentOperandTextElement2.textContent = `IO Cab 1/2 Cabinet AI${moduleCalc(numberInt,IoCab01_02)}:${channelCalc(numberInt,IoCab01_02)}`;
    let tempVariableAO = currentOperandTextElement3.textContent = `IO Cab 1/2 Cabinet AO${moduleCalc(numberInt,IoCab01_02)}:${channelCalc(numberInt,IoCab01_02)}`;
    let tempVariableDI = currentOperandTextElement4.textContent = `IO Cab 1/2 Cabinet DI${moduleCalc(numberInt,IoCab01_02)}:${channelCalc(numberInt,IoCab01_02)}`;
    let tempVariableDO = currentOperandTextElement5.textContent = `IO Cab 1/2 Cabinet DO${moduleCalc(numberInt,IoCab01_02)}:${channelCalc(numberInt,IoCab01_02)}`;


    return tempVariableAI, tempVariableAO,tempVariableDI,tempVariableDO,tempVariableRO,tempVariableCI, tempVariableRTD;
// -------------------------------------------- IO CAB 03 and 04 -----------------------------------------------------------------------------------
  } else if(numberInt >= IoCab03_04  & numberInt < IoCab05_06){
    let tempVariableRO, tempVariableCI, tempVariableRTD;   
    
    if (numberInt <= (IoCab03_04+127)){
      tempVariableRO = currentOperandTextElement6.textContent = `--------------------`;
    } else{
      tempVariableRO  = currentOperandTextElement6.textContent = `IO Cab  3/4 Cabinet RO${moduleCalcRO(numberInt,IoCab03_04)}:${channelCalcRO(numberInt,IoCab03_04)}`;
    }
    
    if ((numberInt <= (IoCab03_04 + 99) )){
      tempVariableCI = currentOperandTextElement7.textContent = `--------------------`;
    } else{
      tempVariableCI  = currentOperandTextElement7.textContent = `IO Cab  3/4 Cabinet CI${moduleCalcCI(numberInt,IoCab03_04)}:${channelCalcCI(numberInt,IoCab03_04)}`;
    }
    
    if ((numberInt <= (IoCab03_04 + 63) )){
      tempVariableRTD = currentOperandTextElement8.textContent = `--------------------`;
    } else{
      tempVariableRTD  = currentOperandTextElement8.textContent = `IO Cab  3/4 Cabinet RTD${moduleCalcRTD(numberInt,IoCab03_04)}:${channelCalcRTD(numberInt,IoCab03_04)}`;
    }

    let tempVariableAI = currentOperandTextElement2.textContent = `IO Cab  3/4 Cabinet AI${moduleCalc(numberInt,IoCab03_04)}:${channelCalc(numberInt,IoCab03_04)}`;
    let tempVariableAO = currentOperandTextElement3.textContent = `IO Cab  3/4 Cabinet AO${moduleCalc(numberInt,IoCab03_04)}:${channelCalc(numberInt,IoCab03_04)}`;
    let tempVariableDI = currentOperandTextElement4.textContent = `IO Cab  3/4 Cabinet DI${moduleCalc(numberInt,IoCab03_04)}:${channelCalc(numberInt,IoCab03_04)}`;
    let tempVariableDO = currentOperandTextElement5.textContent = `IO Cab  3/4 Cabinet DO${moduleCalc(numberInt,IoCab03_04)}:${channelCalc(numberInt,IoCab03_04)}`;


    return tempVariableAI, tempVariableAO,tempVariableDI,tempVariableDO,tempVariableRO,tempVariableCI, tempVariableRTD;

// -------------------------------------------- IO CAB 05 and 06 -----------------------------------------------------------------------------------
  } else if(numberInt >= IoCab05_06  & numberInt < IoCab07_08){
    let tempVariableRO, tempVariableCI, tempVariableRTD;   
    
    if (numberInt <= (IoCab05_06+127)){
      tempVariableRO = currentOperandTextElement6.textContent = `--------------------`;
    } else{
      tempVariableRO  = currentOperandTextElement6.textContent = `IO Cab 5/6 Cabinet RO${moduleCalcRO(numberInt,IoCab05_06)}:${channelCalcRO(numberInt,IoCab05_06)}`;
    }
    
    if ((numberInt <= (IoCab05_06 + 99) )){
      tempVariableCI = currentOperandTextElement7.textContent = `--------------------`;
    } else{
      tempVariableCI  = currentOperandTextElement7.textContent = `IO Cab 5/6 Cabinet CI${moduleCalcCI(numberInt,IoCab05_06)}:${channelCalcCI(numberInt,IoCab05_06)}`;
    }
    
    if ((numberInt <= (IoCab05_06 + 63) )){
      tempVariableRTD = currentOperandTextElement8.textContent = `--------------------`;
    } else{
      tempVariableRTD  = currentOperandTextElement8.textContent = `IO Cab 5/6 Cabinet RTD${moduleCalcRTD(numberInt,IoCab05_06)}:${channelCalcRTD(numberInt,IoCab05_06)}`;
    }

    let tempVariableAI = currentOperandTextElement2.textContent = `IO Cab 5/6 Cabinet AI${moduleCalc(numberInt,IoCab05_06)}:${channelCalc(numberInt,IoCab05_06)}`;
    let tempVariableAO = currentOperandTextElement3.textContent = `IO Cab 5/6 Cabinet AO${moduleCalc(numberInt,IoCab05_06)}:${channelCalc(numberInt,IoCab05_06)}`;
    let tempVariableDI = currentOperandTextElement4.textContent = `IO Cab 5/6 Cabinet DI${moduleCalc(numberInt,IoCab05_06)}:${channelCalc(numberInt,IoCab05_06)}`;
    let tempVariableDO = currentOperandTextElement5.textContent = `IO Cab 5/6 Cabinet DO${moduleCalc(numberInt,IoCab05_06)}:${channelCalc(numberInt,IoCab05_06)}`;


    return tempVariableAI, tempVariableAO,tempVariableDI,tempVariableDO,tempVariableRO,tempVariableCI, tempVariableRTD;

// -------------------------------------------- IO CAB 07 and 08 -----------------------------------------------------------------------------------
  } else if(numberInt >= IoCab07_08  & numberInt < IoCab09_10){
    let tempVariableRO, tempVariableCI, tempVariableRTD;   
    
    if (numberInt <= (IoCab07_08+127)){
      tempVariableRO = currentOperandTextElement6.textContent = `--------------------`;
    } else{
      tempVariableRO  = currentOperandTextElement6.textContent = `IO Cab 7/8 Cabinet RO${moduleCalcRO(numberInt,IoCab07_08)}:${channelCalcRO(numberInt,IoCab07_08)}`;
    }
    
    if ((numberInt <= (IoCab07_08 + 99) )){
      tempVariableCI = currentOperandTextElement7.textContent = `--------------------`;
    } else{
      tempVariableCI  = currentOperandTextElement7.textContent = `IO Cab 7/8 Cabinet CI${moduleCalcCI(numberInt,IoCab07_08)}:${channelCalcCI(numberInt,IoCab07_08)}`;
    }
    
    if ((numberInt <= (IoCab07_08 + 63) )){
      tempVariableRTD = currentOperandTextElement8.textContent = `--------------------`;
    } else{
      tempVariableRTD  = currentOperandTextElement8.textContent = `IO Cab 7/8 Cabinet RTD${moduleCalcRTD(numberInt,IoCab07_08)}:${channelCalcRTD(numberInt,IoCab07_08)}`;
    }

    let tempVariableAI = currentOperandTextElement2.textContent = `IO Cab 7/8 Cabinet AI${moduleCalc(numberInt,IoCab07_08)}:${channelCalc(numberInt,IoCab07_08)}`;
    let tempVariableAO = currentOperandTextElement3.textContent = `IO Cab 7/8 Cabinet AO${moduleCalc(numberInt,IoCab07_08)}:${channelCalc(numberInt,IoCab07_08)}`;
    let tempVariableDI = currentOperandTextElement4.textContent = `IO Cab 7/8 Cabinet DI${moduleCalc(numberInt,IoCab07_08)}:${channelCalc(numberInt,IoCab07_08)}`;
    let tempVariableDO = currentOperandTextElement5.textContent = `IO Cab 7/8 Cabinet DO${moduleCalc(numberInt,IoCab07_08)}:${channelCalc(numberInt,IoCab07_08)}`;


    return tempVariableAI, tempVariableAO,tempVariableDI,tempVariableDO,tempVariableRO,tempVariableCI, tempVariableRTD;
// -------------------------------------------- IO CAB 09 and 10 -----------------------------------------------------------------------------------
  } else if(numberInt >= IoCab09_10  & numberInt < IoCab11_12){
  let tempVariableRO, tempVariableCI, tempVariableRTD;   
  
  if (numberInt <= (IoCab09_10+127)){
    tempVariableRO = currentOperandTextElement6.textContent = `--------------------`;
  } else{
    tempVariableRO  = currentOperandTextElement6.textContent = `IO Cab 09/10 Cabinet RO${moduleCalcRO(numberInt,IoCab09_10)}:${channelCalcRO(numberInt,IoCab09_10)}`;
  }
  
  if ((numberInt <= (IoCab09_10 + 99) )){
    tempVariableCI = currentOperandTextElement7.textContent = `--------------------`;
  } else{
    tempVariableCI  = currentOperandTextElement7.textContent = `IO Cab 09/10 Cabinet CI${moduleCalcCI(numberInt,IoCab09_10)}:${channelCalcCI(numberInt,IoCab09_10)}`;
  }
  
  if ((numberInt <= (IoCab09_10 + 63) )){
    tempVariableRTD = currentOperandTextElement8.textContent = `--------------------`;
  } else{
    tempVariableRTD  = currentOperandTextElement8.textContent = `IO Cab 09/10 Cabinet RTD${moduleCalcRTD(numberInt,IoCab09_10)}:${channelCalcRTD(numberInt,IoCab09_10)}`;
  }

  let tempVariableAI = currentOperandTextElement2.textContent = `IO Cab 09/10 Cabinet AI${moduleCalc(numberInt,IoCab09_10)}:${channelCalc(numberInt,IoCab09_10)}`;
  let tempVariableAO = currentOperandTextElement3.textContent = `IO Cab 09/10 Cabinet AO${moduleCalc(numberInt,IoCab09_10)}:${channelCalc(numberInt,IoCab09_10)}`;
  let tempVariableDI = currentOperandTextElement4.textContent = `IO Cab 09/10 Cabinet DI${moduleCalc(numberInt,IoCab09_10)}:${channelCalc(numberInt,IoCab09_10)}`;
  let tempVariableDO = currentOperandTextElement5.textContent = `IO Cab 09/10 Cabinet DO${moduleCalc(numberInt,IoCab09_10)}:${channelCalc(numberInt,IoCab09_10)}`;


  return tempVariableAI, tempVariableAO,tempVariableDI,tempVariableDO,tempVariableRO,tempVariableCI, tempVariableRTD;

// -------------------------------------------- IO CAB 11 and 12 -----------------------------------------------------------------------------------
} else if(numberInt >= IoCab11_12  & numberInt < IoCab13_14){
  let tempVariableRO, tempVariableCI, tempVariableRTD;   
  
  if (numberInt <= (IoCab11_12+127)){
    tempVariableRO = currentOperandTextElement6.textContent = `--------------------`;
  } else{
    tempVariableRO  = currentOperandTextElement6.textContent = `IO Cab 11/12 Cabinet RO${moduleCalcRO(numberInt,IoCab11_12)}:${channelCalcRO(numberInt,IoCab11_12)}`;
  }
  
  if ((numberInt <= (IoCab11_12 + 99) )){
    tempVariableCI = currentOperandTextElement7.textContent = `--------------------`;
  } else{
    tempVariableCI  = currentOperandTextElement7.textContent = `IO Cab 11/12 Cabinet CI${moduleCalcCI(numberInt,IoCab11_12)}:${channelCalcCI(numberInt,IoCab11_12)}`;
  }
  
  if ((numberInt <= (IoCab11_12 + 63) )){
    tempVariableRTD = currentOperandTextElement8.textContent = `--------------------`;
  } else{
    tempVariableRTD  = currentOperandTextElement8.textContent = `IO Cab 11/12 Cabinet RTD${moduleCalcRTD(numberInt,IoCab11_12)}:${channelCalcRTD(numberInt,IoCab11_12)}`;
  }

  let tempVariableAI = currentOperandTextElement2.textContent = `IO Cab 11/12 Cabinet AI${moduleCalc(numberInt,IoCab11_12)}:${channelCalc(numberInt,IoCab11_12)}`;
  let tempVariableAO = currentOperandTextElement3.textContent = `IO Cab 11/12 Cabinet AO${moduleCalc(numberInt,IoCab11_12)}:${channelCalc(numberInt,IoCab11_12)}`;
  let tempVariableDI = currentOperandTextElement4.textContent = `IO Cab 11/12 Cabinet DI${moduleCalc(numberInt,IoCab11_12)}:${channelCalc(numberInt,IoCab11_12)}`;
  let tempVariableDO = currentOperandTextElement5.textContent = `IO Cab 11/12 Cabinet DO${moduleCalc(numberInt,IoCab11_12)}:${channelCalc(numberInt,IoCab11_12)}`;


  return tempVariableAI, tempVariableAO,tempVariableDI,tempVariableDO,tempVariableRO,tempVariableCI, tempVariableRTD;

// -------------------------------------------- IO CAB 13 and 14 -----------------------------------------------------------------------------------
} else if(numberInt >= IoCab13_14  & numberInt < IoCab15_16){
  let tempVariableRO, tempVariableCI, tempVariableRTD;   
  
  if (numberInt <= (IoCab13_14+127)){
    tempVariableRO = currentOperandTextElement6.textContent = `--------------------`;
  } else{
    tempVariableRO  = currentOperandTextElement6.textContent = `IO Cab 13/14 Cabinet RO${moduleCalcRO(numberInt,IoCab13_14)}:${channelCalcRO(numberInt,IoCab13_14)}`;
  }
  
  if ((numberInt <= (IoCab13_14 + 99) )){
    tempVariableCI = currentOperandTextElement7.textContent = `--------------------`;
  } else{
    tempVariableCI  = currentOperandTextElement7.textContent = `IO Cab 13/14 Cabinet CI${moduleCalcCI(numberInt,IoCab13_14)}:${channelCalcCI(numberInt,IoCab13_14)}`;
  }
  
  if ((numberInt <= (IoCab13_14 + 63) )){
    tempVariableRTD = currentOperandTextElement8.textContent = `--------------------`;
  } else{
    tempVariableRTD  = currentOperandTextElement8.textContent = `IO Cab 13/14 Cabinet RTD${moduleCalcRTD(numberInt,IoCab13_14)}:${channelCalcRTD(numberInt,IoCab13_14)}`;
  }

  let tempVariableAI = currentOperandTextElement2.textContent = `IO Cab 13/14 Cabinet AI${moduleCalc(numberInt,IoCab13_14)}:${channelCalc(numberInt,IoCab13_14)}`;
  let tempVariableAO = currentOperandTextElement3.textContent = `IO Cab 13/14 Cabinet AO${moduleCalc(numberInt,IoCab13_14)}:${channelCalc(numberInt,IoCab13_14)}`;
  let tempVariableDI = currentOperandTextElement4.textContent = `IO Cab 13/14 Cabinet DI${moduleCalc(numberInt,IoCab13_14)}:${channelCalc(numberInt,IoCab13_14)}`;
  let tempVariableDO = currentOperandTextElement5.textContent = `IO Cab 13/14 Cabinet DO${moduleCalc(numberInt,IoCab13_14)}:${channelCalc(numberInt,IoCab13_14)}`;


  return tempVariableAI, tempVariableAO,tempVariableDI,tempVariableDO,tempVariableRO,tempVariableCI, tempVariableRTD;

// -------------------------------------------- IO CAB 15 and 16 -----------------------------------------------------------------------------------
} else if(numberInt >= IoCab15_16  & numberInt < IoCab17_18){
  let tempVariableRO, tempVariableCI, tempVariableRTD;   
  
  if (numberInt <= (IoCab15_16+127)){
    tempVariableRO = currentOperandTextElement6.textContent = `--------------------`;
  } else{
    tempVariableRO  = currentOperandTextElement6.textContent = `IO Cab 15/16 Cabinet RO${moduleCalcRO(numberInt,IoCab15_16)}:${channelCalcRO(numberInt,IoCab15_16)}`;
  }
  
  if ((numberInt <= (IoCab15_16 + 99) )){
    tempVariableCI = currentOperandTextElement7.textContent = `--------------------`;
  } else{
    tempVariableCI  = currentOperandTextElement7.textContent = `IO Cab 15/16 Cabinet CI${moduleCalcCI(numberInt,IoCab15_16)}:${channelCalcCI(numberInt,IoCab15_16)}`;
  }
  
  if ((numberInt <= (IoCab15_16 + 63) )){
    tempVariableRTD = currentOperandTextElement8.textContent = `--------------------`;
  } else{
    tempVariableRTD  = currentOperandTextElement8.textContent = `IO Cab 15/16 Cabinet RTD${moduleCalcRTD(numberInt,IoCab15_16)}:${channelCalcRTD(numberInt,IoCab15_16)}`;
  }

  let tempVariableAI = currentOperandTextElement2.textContent = `IO Cab 15/16 Cabinet AI${moduleCalc(numberInt,IoCab15_16)}:${channelCalc(numberInt,IoCab15_16)}`;
  let tempVariableAO = currentOperandTextElement3.textContent = `IO Cab 15/16 Cabinet AO${moduleCalc(numberInt,IoCab15_16)}:${channelCalc(numberInt,IoCab15_16)}`;
  let tempVariableDI = currentOperandTextElement4.textContent = `IO Cab 15/16 Cabinet DI${moduleCalc(numberInt,IoCab15_16)}:${channelCalc(numberInt,IoCab15_16)}`;
  let tempVariableDO = currentOperandTextElement5.textContent = `IO Cab 15/16 Cabinet DO${moduleCalc(numberInt,IoCab15_16)}:${channelCalc(numberInt,IoCab15_16)}`;


  return tempVariableAI, tempVariableAO,tempVariableDI,tempVariableDO,tempVariableRO,tempVariableCI, tempVariableRTD;

// -------------------------------------------- IO CAB 17 and 18 -----------------------------------------------------------------------------------
} else if(numberInt >= IoCab17_18  & numberInt < IoCab19_20){
  let tempVariableRO, tempVariableCI, tempVariableRTD;   
  
  if (numberInt <= (IoCab17_18+127)){
    tempVariableRO = currentOperandTextElement6.textContent = `--------------------`;
  } else{
    tempVariableRO  = currentOperandTextElement6.textContent = `IO Cab 17/18 Cabinet RO${moduleCalcRO(numberInt,IoCab17_18)}:${channelCalcRO(numberInt,IoCab17_18)}`;
  }
  
  if ((numberInt <= (IoCab17_18 + 99) )){
    tempVariableCI = currentOperandTextElement7.textContent = `--------------------`;
  } else{
    tempVariableCI  = currentOperandTextElement7.textContent = `IO Cab 17/18 Cabinet CI${moduleCalcCI(numberInt,IoCab17_18)}:${channelCalcCI(numberInt,IoCab17_18)}`;
  }
  
  if ((numberInt <= (IoCab17_18 + 63) )){
    tempVariableRTD = currentOperandTextElement8.textContent = `--------------------`;
  } else{
    tempVariableRTD  = currentOperandTextElement8.textContent = `IO Cab 17/18 Cabinet RTD${moduleCalcRTD(numberInt,IoCab17_18)}:${channelCalcRTD(numberInt,IoCab17_18)}`;
  }

  let tempVariableAI = currentOperandTextElement2.textContent = `IO Cab 17/18 Cabinet AI${moduleCalc(numberInt,IoCab17_18)}:${channelCalc(numberInt,IoCab17_18)}`;
  let tempVariableAO = currentOperandTextElement3.textContent = `IO Cab 17/18 Cabinet AO${moduleCalc(numberInt,IoCab17_18)}:${channelCalc(numberInt,IoCab17_18)}`;
  let tempVariableDI = currentOperandTextElement4.textContent = `IO Cab 17/18 Cabinet DI${moduleCalc(numberInt,IoCab17_18)}:${channelCalc(numberInt,IoCab17_18)}`;
  let tempVariableDO = currentOperandTextElement5.textContent = `IO Cab 17/18 Cabinet DO${moduleCalc(numberInt,IoCab17_18)}:${channelCalc(numberInt,IoCab17_18)}`;


  return tempVariableAI, tempVariableAO,tempVariableDI,tempVariableDO,tempVariableRO,tempVariableCI, tempVariableRTD;

// -------------------------------------------- IO CAB 19 and 20 -----------------------------------------------------------------------------------
} else if(numberInt >= IoCab19_20  & numberInt < IoCab21_22){
  let tempVariableRO, tempVariableCI, tempVariableRTD;   
  
  if (numberInt <= (IoCab19_20+127)){
    tempVariableRO = currentOperandTextElement6.textContent = `--------------------`;
  } else{
    tempVariableRO  = currentOperandTextElement6.textContent = `IO Cab 19/20 Cabinet RO${moduleCalcRO(numberInt,IoCab19_20)}:${channelCalcRO(numberInt,IoCab19_20)}`;
  }
  
  if ((numberInt <= (IoCab19_20 + 99) )){
    tempVariableCI = currentOperandTextElement7.textContent = `--------------------`;
  } else{
    tempVariableCI  = currentOperandTextElement7.textContent = `IO Cab 19/20 Cabinet CI${moduleCalcCI(numberInt,IoCab19_20)}:${channelCalcCI(numberInt,IoCab19_20)}`;
  }
  
  if ((numberInt <= (IoCab19_20 + 63) )){
    tempVariableRTD = currentOperandTextElement8.textContent = `--------------------`;
  } else{
    tempVariableRTD  = currentOperandTextElement8.textContent = `IO Cab 19/20 Cabinet RTD${moduleCalcRTD(numberInt,IoCab19_20)}:${channelCalcRTD(numberInt,IoCab19_20)}`;
  }

  let tempVariableAI = currentOperandTextElement2.textContent = `IO Cab 19/20 Cabinet AI${moduleCalc(numberInt,IoCab19_20)}:${channelCalc(numberInt,IoCab19_20)}`;
  let tempVariableAO = currentOperandTextElement3.textContent = `IO Cab 19/20 Cabinet AO${moduleCalc(numberInt,IoCab19_20)}:${channelCalc(numberInt,IoCab19_20)}`;
  let tempVariableDI = currentOperandTextElement4.textContent = `IO Cab 19/20 Cabinet DI${moduleCalc(numberInt,IoCab19_20)}:${channelCalc(numberInt,IoCab19_20)}`;
  let tempVariableDO = currentOperandTextElement5.textContent = `IO Cab 19/20 Cabinet DO${moduleCalc(numberInt,IoCab19_20)}:${channelCalc(numberInt,IoCab19_20)}`;


  return tempVariableAI, tempVariableAO,tempVariableDI,tempVariableDO,tempVariableRO,tempVariableCI, tempVariableRTD;

// -------------------------------------------- IO CAB 21 and 22 -----------------------------------------------------------------------------------
} else if(numberInt >= IoCab21_22  & numberInt < IoCab23_24){
  let tempVariableRO, tempVariableCI, tempVariableRTD;   
  
  if (numberInt <= (IoCab21_22+127)){
    tempVariableRO = currentOperandTextElement6.textContent = `--------------------`;
  } else{
    tempVariableRO  = currentOperandTextElement6.textContent = `IO Cab 21/22 Cabinet RO${moduleCalcRO(numberInt,IoCab21_22)}:${channelCalcRO(numberInt,IoCab21_22)}`;
  }
  
  if ((numberInt <= (IoCab21_22 + 99) )){
    tempVariableCI = currentOperandTextElement7.textContent = `--------------------`;
  } else{
    tempVariableCI  = currentOperandTextElement7.textContent = `IO Cab 21/22 Cabinet CI${moduleCalcCI(numberInt,IoCab21_22)}:${channelCalcCI(numberInt,IoCab21_22)}`;
  }
  
  if ((numberInt <= (IoCab21_22 + 63) )){
    tempVariableRTD = currentOperandTextElement8.textContent = `--------------------`;
  } else{
    tempVariableRTD  = currentOperandTextElement8.textContent = `IO Cab 21/22 Cabinet RTD${moduleCalcRTD(numberInt,IoCab21_22)}:${channelCalcRTD(numberInt,IoCab21_22)}`;
  }

  let tempVariableAI = currentOperandTextElement2.textContent = `IO Cab 21/22 Cabinet AI${moduleCalc(numberInt,IoCab21_22)}:${channelCalc(numberInt,IoCab21_22)}`;
  let tempVariableAO = currentOperandTextElement3.textContent = `IO Cab 21/22 Cabinet AO${moduleCalc(numberInt,IoCab21_22)}:${channelCalc(numberInt,IoCab21_22)}`;
  let tempVariableDI = currentOperandTextElement4.textContent = `IO Cab 21/22 Cabinet DI${moduleCalc(numberInt,IoCab21_22)}:${channelCalc(numberInt,IoCab21_22)}`;
  let tempVariableDO = currentOperandTextElement5.textContent = `IO Cab 21/22 Cabinet DO${moduleCalc(numberInt,IoCab21_22)}:${channelCalc(numberInt,IoCab21_22)}`;


  return tempVariableAI, tempVariableAO,tempVariableDI,tempVariableDO,tempVariableRO,tempVariableCI, tempVariableRTD;

// -------------------------------------------- IO CAB 23 and 24 -----------------------------------------------------------------------------------
} else if(numberInt >= IoCab23_24  & numberInt < IoCab25_26){
  let tempVariableRO, tempVariableCI, tempVariableRTD;   
  
  if (numberInt <= (IoCab23_24+127)){
    tempVariableRO = currentOperandTextElement6.textContent = `--------------------`;
  } else{
    tempVariableRO  = currentOperandTextElement6.textContent = `IO Cab 23/24 Cabinet RO${moduleCalcRO(numberInt,IoCab23_24)}:${channelCalcRO(numberInt,IoCab23_24)}`;
  }
  
  if ((numberInt <= (IoCab23_24 + 99) )){
    tempVariableCI = currentOperandTextElement7.textContent = `--------------------`;
  } else{
    tempVariableCI  = currentOperandTextElement7.textContent = `IO Cab 23/24 Cabinet CI${moduleCalcCI(numberInt,IoCab23_24)}:${channelCalcCI(numberInt,IoCab23_24)}`;
  }
  
  if ((numberInt <= (IoCab23_24 + 63) )){
    tempVariableRTD = currentOperandTextElement8.textContent = `--------------------`;
  } else{
    tempVariableRTD  = currentOperandTextElement8.textContent = `IO Cab 23/24 Cabinet RTD${moduleCalcRTD(numberInt,IoCab23_24)}:${channelCalcRTD(numberInt,IoCab23_24)}`;
  }

  let tempVariableAI = currentOperandTextElement2.textContent = `IO Cab 23/24 Cabinet AI${moduleCalc(numberInt,IoCab23_24)}:${channelCalc(numberInt,IoCab23_24)}`;
  let tempVariableAO = currentOperandTextElement3.textContent = `IO Cab 23/24 Cabinet AO${moduleCalc(numberInt,IoCab23_24)}:${channelCalc(numberInt,IoCab23_24)}`;
  let tempVariableDI = currentOperandTextElement4.textContent = `IO Cab 23/24 Cabinet DI${moduleCalc(numberInt,IoCab23_24)}:${channelCalc(numberInt,IoCab23_24)}`;
  let tempVariableDO = currentOperandTextElement5.textContent = `IO Cab 23/24 Cabinet DO${moduleCalc(numberInt,IoCab23_24)}:${channelCalc(numberInt,IoCab23_24)}`;


  return tempVariableAI, tempVariableAO,tempVariableDI,tempVariableDO,tempVariableRO,tempVariableCI, tempVariableRTD;

// -------------------------------------------- IO CAB 25 and 26 -----------------------------------------------------------------------------------
} else if(numberInt >= IoCab25_26  & numberInt < IoCab27_28){
  let tempVariableRO, tempVariableCI, tempVariableRTD;   
  
  if (numberInt <= (IoCab25_26+127)){
    tempVariableRO = currentOperandTextElement6.textContent = `--------------------`;
  } else{
    tempVariableRO  = currentOperandTextElement6.textContent = `IO Cab 25/26 Cabinet RO${moduleCalcRO(numberInt,IoCab25_26)}:${channelCalcRO(numberInt,IoCab25_26)}`;
  }
  
  if ((numberInt <= (IoCab25_26 + 99) )){
    tempVariableCI = currentOperandTextElement7.textContent = `--------------------`;
  } else{
    tempVariableCI  = currentOperandTextElement7.textContent = `IO Cab 25/26 Cabinet CI${moduleCalcCI(numberInt,IoCab25_26)}:${channelCalcCI(numberInt,IoCab25_26)}`;
  }
  
  if ((numberInt <= (IoCab25_26 + 63) )){
    tempVariableRTD = currentOperandTextElement8.textContent = `--------------------`;
  } else{
    tempVariableRTD  = currentOperandTextElement8.textContent = `IO Cab 25/26 Cabinet RTD${moduleCalcRTD(numberInt,IoCab25_26)}:${channelCalcRTD(numberInt,IoCab23_24)}`;
  }

  let tempVariableAI = currentOperandTextElement2.textContent = `IO Cab 25/26 Cabinet AI${moduleCalc(numberInt,IoCab25_26)}:${channelCalc(numberInt,IoCab25_26)}`;
  let tempVariableAO = currentOperandTextElement3.textContent = `IO Cab 25/26 Cabinet AO${moduleCalc(numberInt,IoCab25_26)}:${channelCalc(numberInt,IoCab25_26)}`;
  let tempVariableDI = currentOperandTextElement4.textContent = `IO Cab 25/26 Cabinet DI${moduleCalc(numberInt,IoCab25_26)}:${channelCalc(numberInt,IoCab25_26)}`;
  let tempVariableDO = currentOperandTextElement5.textContent = `IO Cab 25/26 Cabinet DO${moduleCalc(numberInt,IoCab25_26)}:${channelCalc(numberInt,IoCab25_26)}`;


  return tempVariableAI, tempVariableAO,tempVariableDI,tempVariableDO,tempVariableRO,tempVariableCI, tempVariableRTD;

// -------------------------------------------- IO CAB 27 and 28 -----------------------------------------------------------------------------------
} else if(numberInt >= IoCab27_28  & numberInt < IoCab29_30){
  let tempVariableRO, tempVariableCI, tempVariableRTD;   
  
  if (numberInt <= (IoCab27_28+127)){
    tempVariableRO = currentOperandTextElement6.textContent = `--------------------`;
  } else{
    tempVariableRO  = currentOperandTextElement6.textContent = `IO Cab 27/28 Cabinet RO${moduleCalcRO(numberInt,IoCab27_28)}:${channelCalcRO(numberInt,IoCab27_28)}`;
  }
  
  if ((numberInt <= (IoCab27_28 + 99) )){
    tempVariableCI = currentOperandTextElement7.textContent = `--------------------`;
  } else{
    tempVariableCI  = currentOperandTextElement7.textContent = `IO Cab 27/28 Cabinet CI${moduleCalcCI(numberInt,IoCab27_28)}:${channelCalcCI(numberInt,IoCab27_28)}`;
  }
  
  if ((numberInt <= (IoCab27_28 + 63) )){
    tempVariableRTD = currentOperandTextElement8.textContent = `--------------------`;
  } else{
    tempVariableRTD  = currentOperandTextElement8.textContent = `IO Cab 27/28 Cabinet RTD${moduleCalcRTD(numberInt,IoCab27_28)}:${channelCalcRTD(numberInt,IoCab27_28)}`;
  }

  let tempVariableAI = currentOperandTextElement2.textContent = `IO Cab 27/28 Cabinet AI${moduleCalc(numberInt,IoCab27_28)}:${channelCalc(numberInt,IoCab27_28)}`;
  let tempVariableAO = currentOperandTextElement3.textContent = `IO Cab 27/28 Cabinet AO${moduleCalc(numberInt,IoCab27_28)}:${channelCalc(numberInt,IoCab27_28)}`;
  let tempVariableDI = currentOperandTextElement4.textContent = `IO Cab 27/28 Cabinet DI${moduleCalc(numberInt,IoCab27_28)}:${channelCalc(numberInt,IoCab27_28)}`;
  let tempVariableDO = currentOperandTextElement5.textContent = `IO Cab 27/28 Cabinet DO${moduleCalc(numberInt,IoCab27_28)}:${channelCalc(numberInt,IoCab27_28)}`;


  return tempVariableAI, tempVariableAO,tempVariableDI,tempVariableDO,tempVariableRO,tempVariableCI, tempVariableRTD;

// -------------------------------------------- IO CAB 29 and 30 -----------------------------------------------------------------------------------
} else if(numberInt >= IoCab29_30  & numberInt < IoCab31_32){
  let tempVariableRO, tempVariableCI, tempVariableRTD;   
  
  if (numberInt <= (IoCab29_30+127)){
    tempVariableRO = currentOperandTextElement6.textContent = `--------------------`;
  } else{
    tempVariableRO  = currentOperandTextElement6.textContent = `IO Cab 29/30 Cabinet RO${moduleCalcRO(numberInt,IoCab29_30)}:${channelCalcRO(numberInt,IoCab29_30)}`;
  }
  
  if ((numberInt <= (IoCab29_30 + 99) )){
    tempVariableCI = currentOperandTextElement7.textContent = `--------------------`;
  } else{
    tempVariableCI  = currentOperandTextElement7.textContent = `IO Cab 29/30 Cabinet CI${moduleCalcCI(numberInt,IoCab29_30)}:${channelCalcCI(numberInt,IoCab29_30)}`;
  }
  
  if ((numberInt <= (IoCab29_30 + 63) )){
    tempVariableRTD = currentOperandTextElement8.textContent = `--------------------`;
  } else{
    tempVariableRTD  = currentOperandTextElement8.textContent = `IO Cab 29/30 Cabinet RTD${moduleCalcRTD(numberInt,IoCab29_30)}:${channelCalcRTD(numberInt,IoCab27_28)}`;
  }

  let tempVariableAI = currentOperandTextElement2.textContent = `IO Cab 29/30 Cabinet AI${moduleCalc(numberInt,IoCab29_30)}:${channelCalc(numberInt,IoCab29_30)}`;
  let tempVariableAO = currentOperandTextElement3.textContent = `IO Cab 29/30 Cabinet AO${moduleCalc(numberInt,IoCab29_30)}:${channelCalc(numberInt,IoCab29_30)}`;
  let tempVariableDI = currentOperandTextElement4.textContent = `IO Cab 29/30 Cabinet DI${moduleCalc(numberInt,IoCab29_30)}:${channelCalc(numberInt,IoCab29_30)}`;
  let tempVariableDO = currentOperandTextElement5.textContent = `IO Cab 29/30 Cabinet DO${moduleCalc(numberInt,IoCab29_30)}:${channelCalc(numberInt,IoCab29_30)}`;


  return tempVariableAI, tempVariableAO,tempVariableDI,tempVariableDO,tempVariableRO,tempVariableCI, tempVariableRTD;

// -------------------------------------------- IO CAB 31 and 32 -----------------------------------------------------------------------------------
} else if(numberInt >= IoCab31_32  & numberInt < IoCab33_34){
  let tempVariableRO, tempVariableCI, tempVariableRTD;   
  
  if (numberInt <= (IoCab31_32+127)){
    tempVariableRO = currentOperandTextElement6.textContent = `--------------------`;
  } else{
    tempVariableRO  = currentOperandTextElement6.textContent = `IO Cab 31/32 Cabinet RO${moduleCalcRO(numberInt,IoCab31_32)}:${channelCalcRO(numberInt,IoCab31_32)}`;
  }
  
  if ((numberInt <= (IoCab31_32 + 99) )){
    tempVariableCI = currentOperandTextElement7.textContent = `--------------------`;
  } else{
    tempVariableCI  = currentOperandTextElement7.textContent = `IO Cab 31/32 Cabinet CI${moduleCalcCI(numberInt,IoCab31_32)}:${channelCalcCI(numberInt,IoCab31_32)}`;
  }
  
  if ((numberInt <= (IoCab31_32 + 63) )){
    tempVariableRTD = currentOperandTextElement8.textContent = `--------------------`;
  } else{
    tempVariableRTD  = currentOperandTextElement8.textContent = `IO Cab 31/32 Cabinet RTD${moduleCalcRTD(numberInt,IoCab31_32)}:${channelCalcRTD(numberInt,IoCab31_32)}`;
  }

  let tempVariableAI = currentOperandTextElement2.textContent = `IO Cab 31/32 Cabinet AI${moduleCalc(numberInt,IoCab31_32)}:${channelCalc(numberInt,IoCab31_32)}`;
  let tempVariableAO = currentOperandTextElement3.textContent = `IO Cab 31/32 Cabinet AO${moduleCalc(numberInt,IoCab31_32)}:${channelCalc(numberInt,IoCab31_32)}`;
  let tempVariableDI = currentOperandTextElement4.textContent = `IO Cab 31/32 Cabinet DI${moduleCalc(numberInt,IoCab31_32)}:${channelCalc(numberInt,IoCab31_32)}`;
  let tempVariableDO = currentOperandTextElement5.textContent = `IO Cab 31/32 Cabinet DO${moduleCalc(numberInt,IoCab31_32)}:${channelCalc(numberInt,IoCab31_32)}`;


  return tempVariableAI, tempVariableAO,tempVariableDI,tempVariableDO,tempVariableRO,tempVariableCI, tempVariableRTD;

// -------------------------------------------- IO CAB 33 and 34 -----------------------------------------------------------------------------------
} else if(numberInt >= IoCab33_34 & numberInt < IoCab35_36){
  let tempVariableRO, tempVariableCI, tempVariableRTD;   
  
  if (numberInt <= (IoCab33_34+127)){
    tempVariableRO = currentOperandTextElement6.textContent = `--------------------`;
  } else{
    tempVariableRO  = currentOperandTextElement6.textContent = `IO Cab 33/34 Cabinet RO${moduleCalcRO(numberInt,IoCab33_34)}:${channelCalcRO(numberInt,IoCab33_34)}`;
  }
  
  if ((numberInt <= (IoCab33_34 + 99) )){
    tempVariableCI = currentOperandTextElement7.textContent = `--------------------`;
  } else{
    tempVariableCI  = currentOperandTextElement7.textContent = `IO Cab 33/34 Cabinet CI${moduleCalcCI(numberInt,IoCab33_34)}:${channelCalcCI(numberInt,IoCab33_34)}`;
  }
  
  if ((numberInt <= (IoCab33_34 + 63) )){
    tempVariableRTD = currentOperandTextElement8.textContent = `--------------------`;
  } else{
    tempVariableRTD  = currentOperandTextElement8.textContent = `IO Cab 33/34 Cabinet RTD${moduleCalcRTD(numberInt,IoCab33_34)}:${channelCalcRTD(numberInt,IoCab33_34)}`;
  }

  let tempVariableAI = currentOperandTextElement2.textContent = `IO Cab 33/34 Cabinet AI${moduleCalc(numberInt,IoCab33_34)}:${channelCalc(numberInt,IoCab33_34)}`;
  let tempVariableAO = currentOperandTextElement3.textContent = `IO Cab 33/34 Cabinet AO${moduleCalc(numberInt,IoCab33_34)}:${channelCalc(numberInt,IoCab33_34)}`;
  let tempVariableDI = currentOperandTextElement4.textContent = `IO Cab 33/34 Cabinet DI${moduleCalc(numberInt,IoCab33_34)}:${channelCalc(numberInt,IoCab33_34)}`;
  let tempVariableDO = currentOperandTextElement5.textContent = `IO Cab 33/34 Cabinet DO${moduleCalc(numberInt,IoCab33_34)}:${channelCalc(numberInt,IoCab33_34)}`;


  return tempVariableAI, tempVariableAO,tempVariableDI,tempVariableDO,tempVariableRO,tempVariableCI, tempVariableRTD;

// -------------------------------------------- IO CAB 35 and 36 -----------------------------------------------------------------------------------
} else if(numberInt >= IoCab35_36 & numberInt < IoCab37_38){
  let tempVariableRO, tempVariableCI, tempVariableRTD;   
  
  if (numberInt <= (IoCab35_36+127)){
    tempVariableRO = currentOperandTextElement6.textContent = `--------------------`;
  } else{
    tempVariableRO  = currentOperandTextElement6.textContent = `IO Cab 35/36 Cabinet RO${moduleCalcRO(numberInt,IoCab35_36)}:${channelCalcRO(numberInt,IoCab35_36)}`;
  }
  
  if ((numberInt <= (IoCab35_36 + 99) )){
    tempVariableCI = currentOperandTextElement7.textContent = `--------------------`;
  } else{
    tempVariableCI  = currentOperandTextElement7.textContent = `IO Cab 35/36 Cabinet CI${moduleCalcCI(numberInt,IoCab35_36)}:${channelCalcCI(numberInt,IoCab35_36)}`;
  }
  
  if ((numberInt <= (IoCab35_36 + 63) )){
    tempVariableRTD = currentOperandTextElement8.textContent = `--------------------`;
  } else{
    tempVariableRTD  = currentOperandTextElement8.textContent = `IO Cab 35/36 Cabinet RTD${moduleCalcRTD(numberInt,IoCab35_36)}:${channelCalcRTD(numberInt,IoCab35_36)}`;
  }

  let tempVariableAI = currentOperandTextElement2.textContent = `IO Cab 35/36 Cabinet AI${moduleCalc(numberInt,IoCab35_36)}:${channelCalc(numberInt,IoCab35_36)}`;
  let tempVariableAO = currentOperandTextElement3.textContent = `IO Cab 35/36 Cabinet AO${moduleCalc(numberInt,IoCab35_36)}:${channelCalc(numberInt,IoCab35_36)}`;
  let tempVariableDI = currentOperandTextElement4.textContent = `IO Cab 35/36 Cabinet DI${moduleCalc(numberInt,IoCab35_36)}:${channelCalc(numberInt,IoCab35_36)}`;
  let tempVariableDO = currentOperandTextElement5.textContent = `IO Cab 35/36 Cabinet DO${moduleCalc(numberInt,IoCab35_36)}:${channelCalc(numberInt,IoCab35_36)}`;


  return tempVariableAI, tempVariableAO,tempVariableDI,tempVariableDO,tempVariableRO,tempVariableCI, tempVariableRTD;

// -------------------------------------------- IO CAB 37 and 38 -----------------------------------------------------------------------------------
} else if(numberInt >= IoCab37_38 & numberInt < IoCab39_40){
  let tempVariableRO, tempVariableCI, tempVariableRTD;   
  
  if (numberInt <= (IoCab37_38+127)){
    tempVariableRO = currentOperandTextElement6.textContent = `--------------------`;
  } else{
    tempVariableRO  = currentOperandTextElement6.textContent = `IO Cab 37/38 Cabinet RO${moduleCalcRO(numberInt,IoCab37_38)}:${channelCalcRO(numberInt,IoCab37_38)}`;
  }
  
  if ((numberInt <= (IoCab37_38 + 99) )){
    tempVariableCI = currentOperandTextElement7.textContent = `--------------------`;
  } else{
    tempVariableCI  = currentOperandTextElement7.textContent = `IO Cab 37/38 Cabinet CI${moduleCalcCI(numberInt,IoCab37_38)}:${channelCalcCI(numberInt,IoCab37_38)}`;
  }
  
  if ((numberInt <= (IoCab37_38 + 63) )){
    tempVariableRTD = currentOperandTextElement8.textContent = `--------------------`;
  } else{
    tempVariableRTD  = currentOperandTextElement8.textContent = `IO Cab 37/38 Cabinet RTD${moduleCalcRTD(numberInt,IoCab37_38)}:${channelCalcRTD(numberInt,IoCab37_38)}`;
  }

  let tempVariableAI = currentOperandTextElement2.textContent = `IO Cab 37/38 Cabinet AI${moduleCalc(numberInt,IoCab37_38)}:${channelCalc(numberInt,IoCab37_38)}`;
  let tempVariableAO = currentOperandTextElement3.textContent = `IO Cab 37/38 Cabinet AO${moduleCalc(numberInt,IoCab37_38)}:${channelCalc(numberInt,IoCab37_38)}`;
  let tempVariableDI = currentOperandTextElement4.textContent = `IO Cab 37/38 Cabinet DI${moduleCalc(numberInt,IoCab37_38)}:${channelCalc(numberInt,IoCab37_38)}`;
  let tempVariableDO = currentOperandTextElement5.textContent = `IO Cab 37/38 Cabinet DO${moduleCalc(numberInt,IoCab37_38)}:${channelCalc(numberInt,IoCab37_38)}`;


  return tempVariableAI, tempVariableAO,tempVariableDI,tempVariableDO,tempVariableRO,tempVariableCI, tempVariableRTD;

// -------------------------------------------- IO CAB 39 and 40 -----------------------------------------------------------------------------------
} else if(numberInt >= IoCab39_40 & numberInt < IoCab41_42){
  let tempVariableRO, tempVariableCI, tempVariableRTD;   
  
  if (numberInt <= (IoCab39_40+127)){
    tempVariableRO = currentOperandTextElement6.textContent = `--------------------`;
  } else{
    tempVariableRO  = currentOperandTextElement6.textContent = `IO Cab 39/40 Cabinet RO${moduleCalcRO(numberInt,IoCab39_40)}:${channelCalcRO(numberInt,IoCab39_40)}`;
  }
  
  if ((numberInt <= (IoCab39_40 + 99) )){
    tempVariableCI = currentOperandTextElement7.textContent = `--------------------`;
  } else{
    tempVariableCI  = currentOperandTextElement7.textContent = `IO Cab 39/40 Cabinet CI${moduleCalcCI(numberInt,IoCab39_40)}:${channelCalcCI(numberInt,IoCab39_40)}`;
  }
  
  if ((numberInt <= (IoCab39_40 + 63) )){
    tempVariableRTD = currentOperandTextElement8.textContent = `--------------------`;
  } else{
    tempVariableRTD  = currentOperandTextElement8.textContent = `IO Cab 39/40 Cabinet RTD${moduleCalcRTD(numberInt,IoCab39_40)}:${channelCalcRTD(numberInt,IoCab39_40)}`;
  }

  let tempVariableAI = currentOperandTextElement2.textContent = `IO Cab 39/40 Cabinet AI${moduleCalc(numberInt,IoCab39_40)}:${channelCalc(numberInt,IoCab39_40)}`;
  let tempVariableAO = currentOperandTextElement3.textContent = `IO Cab 39/40 Cabinet AO${moduleCalc(numberInt,IoCab39_40)}:${channelCalc(numberInt,IoCab39_40)}`;
  let tempVariableDI = currentOperandTextElement4.textContent = `IO Cab 39/40 Cabinet DI${moduleCalc(numberInt,IoCab39_40)}:${channelCalc(numberInt,IoCab39_40)}`;
  let tempVariableDO = currentOperandTextElement5.textContent = `IO Cab 39/40 Cabinet DO${moduleCalc(numberInt,IoCab39_40)}:${channelCalc(numberInt,IoCab39_40)}`;


  return tempVariableAI, tempVariableAO,tempVariableDI,tempVariableDO,tempVariableRO,tempVariableCI, tempVariableRTD;

}
  
  
   else {
    currentOperandTextElement2.textContent = `Address is out of range`
  }
}



const btnSend = document.querySelector(".btn--send");
const textinputNumberInt = document.getElementById("textinputNumberInt-0");
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


btnSend.addEventListener("click", function () {
  let textinputNumberIntC = textinputNumberInt.value;
  calcInputInt(parseInt(`${textinputNumberIntC}`)); // parseInt() converts from STRING to int. We are reading in values from DOM as string. needs to be int for
  console.log(textinputNumberIntC);
});

document.addEventListener(`keydown`, function (e) {
  if (e.key === "Enter") {
    let textinputNumberIntC = textinputNumberInt.value;
    calcInputInt(parseInt(`${textinputNumberIntC}`)); // parseInt() converts from STRING to int. We are reading in values from DOM as string. needs to be int for
    console.log(textinputNumberIntC);
  }
});

allClearButton2.addEventListener("click", (button) => {
  let blank1 = currentOperandTextElement2.textContent = "Enter new address"
  let blank2 = currentOperandTextElement3.textContent = `--------------------`
  let blank3 = currentOperandTextElement4.textContent = `--------------------`
  let blank4 = currentOperandTextElement5.textContent = `--------------------`
  let blank5 = currentOperandTextElement6.textContent = `--------------------`
  let blank6 = currentOperandTextElement7.textContent = `--------------------`
  let blank7 = currentOperandTextElement8.textContent = `--------------------`
  //let blank8 = currentOperandTextElement9.textContent = "Cabinet Info"
  return blank1,blank2, blank3,blank4,blank5,blank6, blank7;
});
document.addEventListener(`keydown`, function (e) {
  if (e.key === "Backspace") {
    let blank1 = currentOperandTextElement2.textContent = "Enter new address"
    let blank2 = currentOperandTextElement3.textContent = `--------------------`
    let blank3 = currentOperandTextElement4.textContent = `--------------------`
    let blank4 = currentOperandTextElement5.textContent = `--------------------`
    let blank5 = currentOperandTextElement6.textContent = `--------------------`
    let blank6 = currentOperandTextElement7.textContent = `--------------------`
    let blank7 = currentOperandTextElement8.textContent = `--------------------`
    //let blank8 = currentOperandTextElement9.textContent = "Cabinet Info"
    return blank1,blank2, blank3,blank4,blank5,blank6, blank7;
  }
});

