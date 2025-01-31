const gameArea = document.getElementById("game-area");
const ctx = gameArea.getContext("2d");
const width = gameArea.width;
const height = gameArea.height
const plane = new Plane(Math.floor(Math.random()*width),Math.floor(Math.random()*height),Math.floor(Math.random()*5),"red");
let planeArray = [plane];


const draw = () => {

    ctx.clearRect(0, 0, 800, 600);

    ctx.beginPath();
    ctx.rect(150, height/2 - 150, 500, 80);
    ctx.fillStyle = "grey";
    ctx.fill();

    ctx.beginPath();
    ctx.rect(570, height/2 - 70, 50, 100);
    ctx.fillStyle = "grey";
    ctx.fill();

    ctx.beginPath();
    ctx.rect(180, height/2 +30, 440, 50);
    ctx.fillStyle = "grey";
    ctx.fill();

    ctx.beginPath();
    ctx.rect(180, height/2 - 70, 50, 100);
    ctx.fillStyle = "grey";
    ctx.fill();

    for (let i = 0; i<5; i++){
        ctx.beginPath();
        ctx.rect(180 + i*100, height/2 - 115, 50, 10);
        ctx.fillStyle = "white";
        ctx.fill();
    }

    for (let i = 0; i<5; i++){
        ctx.beginPath();
        ctx.rect(150 + i* 100, height/2 + 80, 100, 80);
        ctx.fillStyle = "grey";
        ctx.fill();
        ctx.lineWidth = 2
        ctx.strokeStyle = "black"
        ctx.stroke()
    }

    

    
}

const updatePlane = () => {
    planeArray.forEach((plane)=>{
        plane.draw(ctx);
        plane.move();
    })


}
setInterval(() => {
    const plane = new Plane(Math.floor(Math.random()*width),Math.floor(Math.random()*height),Math.floor(Math.random()*5),"red");
    planeArray.push(plane);
}, 10000);


const animate = () => {
    draw();
    updatePlane();
    requestAnimationFrame(animate);
}

animate();