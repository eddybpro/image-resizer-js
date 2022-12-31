const uploadBox = document.querySelector('.upload-box');
const previewImag = uploadBox.querySelector('img');
const fileInput = uploadBox.querySelector('input');
const widthInput = document.querySelector('.width input');
const heightInput = document.querySelector('.height input');
const ratioInput = document.querySelector('.ratio input');
const qualityInput = document.querySelector('.quality input');
const downloadBtn = document.querySelector('.download-btn');



let ratioImage;

const loadFile = (e)=>{
    const file = e.target.files[0];
    if(!file)return;
    previewImag.src = URL.createObjectURL(file);
    
    previewImag.addEventListener('load', ()=>{
        widthInput.value = previewImag.naturalWidth;
        heightInput.value = previewImag.naturalHeight;
        ratioImage = previewImag.naturalWidth / previewImag.naturalHeight;
        document.querySelector('.wrapper').classList.add('active')
    })
}

widthInput.addEventListener('keyup', ()=>{
    const height = ratioInput.checked ? widthInput.value / ratioImage : heightInput.value;
    heightInput.value = Math.floor(height);
})

heightInput.addEventListener('keyup', ()=>{
    const width = ratioInput.checked ? heightInput.value * ratioImage : widthInput.value;
    widthInput.value = Math.floor(width);
})

const resizeAndDownload = ()=>{
    const canvas = document.createElement('canvas');
    const a = document.createElement('a');
    const ctx = canvas.getContext("2d");

    const imgQuality = qualityInput.checked ? 0.7 : 1.0;

    canvas.width = widthInput.value;
    canvas.height = heightInput.value;

    ctx.drawImage(previewImag, 0, 0, canvas.width, canvas.height);
    
    a.href = canvas.toDataURL('image/jpeg', imgQuality);
    a.download = new Date().getTime();
    a.click();
}



downloadBtn.addEventListener('click', resizeAndDownload);
fileInput.addEventListener('change', loadFile)
uploadBox.addEventListener('click',()=>fileInput.click())



































