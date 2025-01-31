class Plane{

    constructor(posX, posY, speed, color, angle = Math.PI/4) {
        this.posX = posX;
        this.posY = posY;
        this.speed = speed;
        this.color = color
        this.angle = angle
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.posX, this.posY, 30,15);
    }

    move() {
        this.posX += this.speed*Math.cos(this.angle);
        this.posY += this.speed*Math.sin(this.angle);
    }
}