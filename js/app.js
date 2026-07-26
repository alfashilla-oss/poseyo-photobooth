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

const startCamera =
document.getElementById("startCamera");

startCamera.addEventListener("click", async ()=>{

try{

const stream =
await navigator.mediaDevices.getUserMedia({

video:{
facingMode:"user"
},

audio:false

});

video.srcObject = stream;

video.style.display="block";

}

catch(err){

alert("Kamera tidak dapat diakses.");

console.error(err);

}

});
