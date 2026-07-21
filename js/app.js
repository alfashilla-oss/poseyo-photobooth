const templateCards = document.querySelectorAll(".template-card");

const previewImage = document.getElementById("previewImage");

let selectedFrame = "assets/frames/frame1.png";

templateCards.forEach(card => {

card.addEventListener("click", () => {

templateCards.forEach(item => {

item.classList.remove("active");

});

card.classList.add("active");

previewImage.src = card.dataset.preview;

selectedFrame = card.dataset.frame;

console.log("Frame dipilih:", selectedFrame);

});

});
