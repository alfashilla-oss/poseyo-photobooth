// ===========================
// TEMPLATE
// ===========================

const cards = document.querySelectorAll(".template-card");
const previewImage = document.getElementById("previewImage");

let selectedFrame = "frame1";

cards.forEach(card => {

    card.addEventListener("click", () => {

        cards.forEach(item => item.classList.remove("active"));

        card.classList.add("active");

        previewImage.src = card.dataset.preview;

        selectedFrame = card.dataset.frame;

    });

});


// ===========================
// ELEMENT
// ===========================

const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const countdown = document.getElementById("countdown");
const photoResult = document.getElementById("photoResult");

const startCamera = document.getElementById("startCamera");
const downloadPhoto = document.getElementById("downloadPhoto");

const stripCanvas = document.createElement("canvas");

let cameraStream = null;
let photos = [];


// ===========================
// FRAME CONFIG
// ===========================

const frameConfigs = {

    frame1:{

        frame:"assets/frames/frame1.png",

        x:180,
        y:150,

        width:540,
        height:300,

        gap:40

    },

    frame2:{

        frame:"assets/frames/frame2.png",

        x:180,
        y:150,

        width:540,
        height:300,

        gap:40

    },

    frame3:{

        frame:"assets/frames/frame3.png",

        x:180,
        y:150,

        width:540,
        height:300,

        gap:40

    },

    frame4:{

        frame:"assets/frames/frame4.png",

        x:180,
        y:150,

        width:540,
        height:300,

        gap:40

    }

};


// ===========================
// HELPER
// ===========================

function delay(ms){

    return new Promise(resolve => setTimeout(resolve,ms));

}

function loadImage(src){

    return new Promise((resolve,reject)=>{

        const img = new Image();

        img.onload = ()=>resolve(img);

        img.onerror = ()=>reject("Gagal memuat "+src);

        img.src = src;

    });

}


// ===========================
// CAMERA
// ===========================

startCamera.addEventListener("click", async ()=>{

    if(cameraStream) return;

    try{

        cameraStream = await navigator.mediaDevices.getUserMedia({

            video:{
                facingMode:"user"
            },

            audio:false

        });

        video.srcObject = cameraStream;

        await video.play();

        video.style.display="block";

        startCamera.disabled=true;

        startCamera.textContent="📸 Mengambil Foto...";

        await takePhoto();

        startCamera.textContent="✅ Selesai";

    }

    catch(err){

        alert("Kamera tidak dapat diakses.");

        console.error(err);

    }

});


// ===========================
// TAKE PHOTO
// ===========================

async function takePhoto(){

    photos=[];

    const ctx = canvas.getContext("2d");

    for(let p=0;p<4;p++){

        countdown.style.display="block";

        for(let i=3;i>=1;i--){

            countdown.textContent=i;

            await delay(1000);

        }

        countdown.textContent="📸";

        await delay(400);

        countdown.style.display="none";

        canvas.width=video.videoWidth;
        canvas.height=video.videoHeight;

        ctx.drawImage(video,0,0);

        photos.push(canvas.toDataURL("image/png"));

        await delay(700);

    }

    await createPhotoStrip();

}


// ===========================
// PHOTO STRIP
// ===========================

async function createPhotoStrip(){

    const config = frameConfigs[selectedFrame];

    const frame = await loadImage(config.frame);

    stripCanvas.width = frame.width;
    stripCanvas.height = frame.height;

    const ctx = stripCanvas.getContext("2d");

    ctx.clearRect(0,0,stripCanvas.width,stripCanvas.height);

    const startX = config.x;
    const startY = config.y;

    const photoWidth = config.width;
    const photoHeight = config.height;

    const gap = config.gap;

    for(let i=0;i<photos.length;i++){

        const img = await loadImage(photos[i]);

        ctx.drawImage(

            img,

            startX,

            startY + i*(photoHeight+gap),

            photoWidth,

            photoHeight

        );

    }

    ctx.drawImage(frame,0,0);

    photoResult.src = stripCanvas.toDataURL("image/png");

    photoResult.style.display="block";

}


// ===========================
// DOWNLOAD
// ===========================

downloadPhoto.addEventListener("click",()=>{

    if(photos.length===0){

        alert("Silakan ambil foto terlebih dahulu.");

        return;

    }

    const link=document.createElement("a");

    link.download="poseyo-photostrip.png";

    link.href=photoResult.src;

    link.click();

});
