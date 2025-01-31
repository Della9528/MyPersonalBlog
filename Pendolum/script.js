const gravityInput = document.getElementById("gravity");
const lengthInput = document.getElementById("length");
const canvasArea = document.getElementById("pendolum-canvas");

const ctx = canvasArea.getContext("2d");
const canvasWidth = canvasArea.width;
const canvasHeight = canvasArea.height;

let gravity = 1;
let length = 100;

gravityInput.addEventListener("input", (event) => {
    gravity = parseFloat(event.target.value);
});

lengthInput.addEventListener("input", (event) => {
    length = parseFloat(event.target.value);
});

const pivot = {x: canvasWidth/2, y: 150}
let angle = Math.PI / 4;
let angleVelocity = 0;
let angleAcceleration = 0;

const updatePendolum = () => {
    angleAcceleration = -(gravity/length)*Math.sin(angle);
    angleVelocity += angleAcceleration;
    angle += angleVelocity;
}


const draw = () => {

    const ballX = pivot.x + length*Math.sin(angle);
    const ballY = pivot.y + length*Math.cos(angle);
    
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    ctx.beginPath();
    ctx.moveTo(pivot.x, pivot.y);
    ctx.lineTo(ballX, ballY);
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(ballX,ballY,10,0,2*Math.PI);
    ctx.fillStyle = "black";
    ctx.fill();
}

const animate = () => {
    updatePendolum();
    draw();
    requestAnimationFrame(animate);
}

animate();