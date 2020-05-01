class GameEntity extends GameObject {
    
    constructor(x, y, vx, vy, width, height) {
        super(x, y);
        this.vx = vx;
        this.vy = vy;
        this.width = width;
        this.height = height;
    }

    // TODO: make these abstract
    draw(ctx) {      
        ctx.beginPath();
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.stroke();
    }
    
    // TODO: make these abstract
    update(progress) {
        const p = progress / 16;
        this.x += this.vx;
        this.y += this.vy;
    }

};
