let currentEmotion = "neutral";

function updateEmotionUI(emotion) {
    currentEmotion = emotion.toLowerCase();
    document.getElementById("emotionText").innerText = "Emotion: " + currentEmotion;
    updateGalaxyEmotion(currentEmotion);
}

// Play relaxation sound
function playRelaxation() {
    playFrequency(currentEmotion);
}

// --- CAMERA ACCESS ---
document.getElementById("startCameraBtn").addEventListener("click", async () => {
    const video = document.getElementById("video");
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        video.srcObject = stream;
        video.play();
        document.getElementById("emotionText").innerText = "Camera started. Loading AI models...";

        await loadFaceModels(); // face-api models
        detectEmotion();        // start detection
        document.getElementById("emotionText").innerText = "Detecting emotion...";
    } catch (err) {
        console.error("Camera access denied:", err);
        alert("Camera access denied! You can also type your emotion below.");
        document.getElementById("emotionText").innerText = "Camera not started";
    }
});

// --- MANUAL EMOTION INPUT ---
document.getElementById("submitEmotionBtn").addEventListener("click", () => {
    const input = document.getElementById("emotionInput").value.trim();
    if (input) {
        updateEmotionUI(input);
    } else {
        alert("Please type an emotion!");
    }
});

async function sendEmotionToBackend(emotion) {
    try {
        const response = await fetch("http://127.0.0.1:5000/emotion", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ emotion })
        });
        const data = await response.json();

        // Update UI with backend response
        updateEmotionUI(data.emotion);
        displayPoem(data.poem);  // function to show poem on screen
        playFrequency(data.emotion);
    } catch (err) {
        console.error("Error contacting backend:", err);
    }
}

// After detecting emotion via camera
sendEmotionToBackend(detectedEmotion);

// After manual input
sendEmotionToBackend(userTypedEmotion);

function displayPoem(poem){
    let poemDiv = document.getElementById("poemDiv");
    if(!poemDiv){
        poemDiv = document.createElement("div");
        poemDiv.id = "poemDiv";
        poemDiv.style.color = "#9b7cff";
        poemDiv.style.fontStyle = "italic";
        poemDiv.style.marginTop = "10px";
        document.body.appendChild(poemDiv);
    }
    poemDiv.innerText = poem;
}