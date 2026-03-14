const video = document.getElementById("video");

async function startCamera() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    video.srcObject = stream;
    video.play();
  } catch (err) {
    console.error("Cannot access camera:", err);
    alert("Camera access blocked! Please allow camera permissions.");
  }
}

async function detectEmotion() {
  // Wait a bit to make sure video is ready
  video.addEventListener("playing", () => {
    console.log("Video playing, starting emotion detection");
    setInterval(async () => {
      const detections = await faceapi
        .detectSingleFace(video, new faceapi.TinyFaceDetectorOptions())
        .withFaceExpressions();

      if (detections && detections.expressions) {
        const expressions = detections.expressions;

        let maxEmotion = "neutral";
        let maxValue = 0;

        for (let emotion in expressions) {
          if (expressions[emotion] > maxValue) {
            maxValue = expressions[emotion];
            maxEmotion = emotion;
          }
        }

        updateEmotionUI(maxEmotion);
      }
    }, 1000); // every 1 second
  });
}

window.onload = async () => {
  await loadFaceModels();
  await startCamera();
  detectEmotion();
};