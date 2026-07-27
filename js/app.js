
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

    const ctx = 
