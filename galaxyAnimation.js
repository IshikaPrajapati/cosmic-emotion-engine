const canvas = document.getElementById("galaxyCanvas")
const ctx = canvas.getContext("2d")

canvas.width = 600
canvas.height = 400

let stars = []

for(let i=0;i<100;i++){

stars.push({
x:Math.random()*canvas.width,
y:Math.random()*canvas.height,
size:Math.random()*2
})

}

let galaxyColor = "white"

function updateGalaxyEmotion(emotion){

if(emotionColors[emotion]){
galaxyColor = emotionColors[emotion]
}

}

function animateGalaxy(){

ctx.clearRect(0,0,canvas.width,canvas.height)

for(let star of stars){

ctx.beginPath()
ctx.fillStyle = galaxyColor
ctx.arc(star.x,star.y,star.size,0,Math.PI*2)
ctx.fill()

star.y += 0.2

if(star.y > canvas.height){
star.y = 0
}

}

requestAnimationFrame(animateGalaxy)

}

animateGalaxy()

function updateGalaxyEmotion(emotion) {
    // map emotions to colors (from emotionColors.js)
    const color = getColorForEmotion(emotion);
    setGalaxyColor(color);  // function in galaxyAnimation.js
}