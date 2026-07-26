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

    ctx.drawImage(video, 0, 0);

    photoResult.src = canvas.toDataURL("image/png");

    photoResult.style.display = "block";

}
