async function loadFaceModels(){

await faceapi.nets.tinyFaceDetector.loadFromUri(
"https://cdn.jsdelivr.net/npm/face-api.js/models"
)

await faceapi.nets.faceExpressionNet.loadFromUri(
"https://cdn.jsdelivr.net/npm/face-api.js/models"
)

console.log("Face models loaded")

async function loadModels() {
    const MODEL_URL = '/models'; // folder where face-api models are
    await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
    await faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL);
    console.log("Face-api models loaded");
}
}