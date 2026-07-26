const cards = document.querySelectorAll(".template-card");
const previewImage = document.getElementById("previewImage");

let selectedFrame = "assets/frames/frame1.png";

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

let cameraStream = null;
let photos = [];
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

    const width = 900;
    const height = 1600;

    stripCanvas.width = width;
    stripCanvas.height = height;

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0,0,width,height);

    const photoWidth = 700;
    const photoHeight = 320;

    const startX = 100;
    const startY = 80;

    const gap = 35;

    for(let i=0;i<photos.length;i++){

        const img = new Image();

        await new Promise(resolve=>{

            img.onload = ()=>{

                ctx.drawImage(

                    img,

                    startX,

                    startY + i*(photoHeight+gap),

                    photoWidth,

                    photoHeight

                );

                resolve();

            };

            img.src = photos[i];

        });

    }

    photoResult.src = stripCanvas.toDataURL("image/png");

}
