class GameObject {
    
    constructor(x, y, vx, vy, width, height, is_player) {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.width = width;
        this.height = height;
        this.is_player = is_player;
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