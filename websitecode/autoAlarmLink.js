const form = document.querySelector('#img-form');
const img = document.querySelector('#img');
const outputPath = document.querySelector('#output-path');
const filename = document.querySelector('#filename');
const heightInput = document.querySelector('#height');
const widthInput = document.querySelector('#width');

function loadFilePath(e){
    const file = e.target.files[0];

    if(!isFileImage(file)){
        console.log("Please slect an image");
        return
    }

    console.log("OK!");
    
}


//make sure file is image
function isFileImage (file){
    const accpetedFiles =["image/gif","image/png","image/jpeg"]
    return file && accpetedFiles.includes(file["type"])
}

img.addEventListener("change",loadFilePath);

console.log("hello2222sssss2")