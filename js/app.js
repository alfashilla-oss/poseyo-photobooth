const cards = document.querySelectorAll(".template-card");
const previewImage = document.getElementById("previewImage");

let selectedFrame="frame1";

cards.forEach(card => {

    card.addEventListener("click", () => {

        cards.forEach(item => {
            item.classList.remove("active");
        });

        card.classList.add("active");

        previewImage.src = card.dataset.preview;

        selectedFrame = card.dataset.frame;

        console.log("Frame dipilih:", selectedFrame);

    });

});


const video = document.getElementById("video");
const startCamera = document.getElementById("startCamera");
const downloadPhoto = document.getElementById("downloadPhoto");

let cameraStream = null;

let photos = [];

const frameConfigs={

"frame1":{

background:"assets/frames/frame1_bg.png",

overlay:"assets/frames/frame1_overlay.png",

x:180,
y:150,
width:540,
height:300,
gap:40

},

"frame2":{

background:"assets/frames/frame2_bg.png",

overlay:"assets/frames/frame2_overlay.png",

x:180,
y:150,
width:540,
height:300,
gap:40

},

"frame3":{

background:"assets/frames/frame3_bg.png",

overlay:"assets/frames/frame3_overlay.png",

x:180,
y:150,
width:540,
height:300,
gap:40

},

"frame4":{

background:"assets/frames/frame4_bg.png",

overlay:"assets/frames/frame4_overlay.png",

x:180,
y:150,
width:540,
height:300,
gap:40

}

};

const stripCanvas = document.createElement("canvas");

startCamera.addEventListener("click", async () => {

    if (cameraStream) return;

    try {

        cameraStream = await navigator.mediaDevices.getUserMedia({

            video: {
                facingMode: "user"
            },

            audio: false

        });

        video.srcObject = cameraStream;

await video.play();

video.style.display = "block";

await takePhoto();

        startCamera.disabled = true;
        startCamera.textContent = "✅ Kamera Aktif";

    }

    catch (err) {

        alert("Kamera tidak dapat diakses.");

        console.error(err);

    }

});

const countdown = document.getElementById("countdown");
const canvas = document.getElementById("canvas");
const photoResult = document.getElementById("photoResult");

function delay(ms){

    return new Promise(resolve=>setTimeout(resolve,ms));

}

function loadImage(src){

    return new Promise((resolve,reject)=>{

        const img = new Image();

        img.onload = ()=>resolve(img);

        img.onerror = reject;

        img.src = src;

    });

}

async function takePhoto(){

    photos = [];

    for(let photo = 1; photo <= 4; photo++){

        countdown.style.display = "block";

        for(let i = 3; i >= 1; i--){

            countdown.textContent = i;

            await delay(1000);

        }

        countdown.textContent = "📸";

        await delay(400);

        countdown.style.display = "none";

        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        const ctx = canvas.getContext("2d");

        ctx.drawImage(video,0,0);

        photos.push(canvas.toDataURL("image/png"));

        await delay(600);

    }

    console.log(photos);

    await createPhotoStrip();

photoResult.style.display = "block";
    
}

async function createPhotoStrip(){

    const ctx = stripCanvas.getContext("2d");

    const config = frameConfigs[selectedFrame];

const background = await loadImage(config.background);

const overlay = await loadImage(config.overlay);

// Background
ctx.drawImage(background,0,0);

// Semua foto
for(let i=0;i<photos.length;i++){

    const img = await loadImage(photos[i]);

    ctx.drawImage(
        img,
        startX,
        startY+i*(photoHeight+gap),
        photoWidth,
        photoHeight
    );

}

// Overlay
ctx.drawImage(overlay,0,0);

// Tampilkan hasil
photoResult.src = stripCanvas.toDataURL("image/png");
