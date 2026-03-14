function playFrequency(emotion) {
    const freqMap = {
        "happy": 528,
        "sad": 396,
        "angry": 741,
        "fearful": 432,
        "neutral": 432,
        "surprised": 639,
        "stress": 432
    };
    const frequency = freqMap[emotion] || 432;

    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioCtx.createOscillator();
    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(frequency, audioCtx.currentTime);
    oscillator.connect(audioCtx.destination);
    oscillator.start();
    oscillator.stop(audioCtx.currentTime + 3); // 3 sec sound
}