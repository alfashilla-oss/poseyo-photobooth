// =======================================
// POSEYO PHOTOBOOTH
// APP.JS FINAL V2
// =======================================


// ===============================
// ELEMENT
// ===============================

const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const countdown = document.getElementById("countdown");
const photoResult = document.getElementById("photoResult");
const frameOverlay = document.getElementById("frameOverlay");

const startCamera = document.getElementById("startCamera");
const downloadPhoto = document.getElementById("downloadPhoto");

const templateCards = document.querySelectorAll(".template-card");

const stripCanvas = document.createElement("canvas");
const stripCtx = stripCanvas.getContext("2d");

let cameraStream = null;
let photos = [];
let selectedFrame = "frame1";

// ===============================
// KONFIGURASI FRAME
// ===============================

const frameConfigs = {

    frame1:{

        overlay:"assets/frames/frame1_overlay.png",

        canvasWidth:1181,
        canvasHeight:1748,

        photos:[

            // FOTO 1
            {
                x:0,
                y:0,
                w:0,
                h:0
            }

        ]

    },

    frame2:{

        overlay:"assets/frames/frame2_overlay.png",

        canvasWidth:1181,
        canvasHeight:1748,

        photos:[

        ]

    },

    frame3:{

        overlay:"assets/frames/frame3_overlay.png",

        canvasWidth:1181,
        canvasHeight:1748,

        photos:[

        ]

    },

    frame4:{

        overlay:"assets/frames/frame4_overlay.png",

        canvasWidth:1181,
        canvasHeight:1748,

        photos:[

        ]

    }

};

// ===============================
// TEMPLATE
// ===============================

templateCards.forEach(card=>{

    card.addEventListener("click",()=>{

        templateCards.forEach(c=>c.classList.remove("active"));

        card.classList.add("active");

        selectedFrame = card.dataset.frame;

        frameOverlay.src = frameConfigs[selectedFrame].overlay;

    });

});

// ===============================
// HELPER
// ===============================

function delay(ms){

    return new Promise(resolve=>setTimeout(resolve,ms));

}

function loadImage(src){

    return new Promise((resolve,reject)=>{

        const img = new Image();

        img.onload=()=>resolve(img);

        img.onerror=()=>reject(src);

        img.src=src;

    });

}
