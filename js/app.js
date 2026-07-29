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
