const video = document.getElementById("video");

const startCamera =
document.getElementById("startCamera");

startCamera.addEventListener("click", async ()=>{

try{

const stream = await navigator.mediaDevices.getUserMedia({

video:true,

audio:false

});

video.srcObject = stream;

}

catch(err){

alert("Kamera tidak dapat diakses");

}

});
