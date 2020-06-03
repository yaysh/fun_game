class GameEntity extends GameObject {
    
    vx: number;
    vy: number;
    tile: number;


    constructor(x: number, y: number, vx: number, vy: number, width: number, height: number, tile: number) {
        super(x, y, width, height);
        this.vx = vx;
        this.vy = vy;
        this.tile = tile;
    }

    // TODO: make these abstract
    draw(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {      
        ctx.beginPath();
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.stroke();
    }
    
    // TODO: make these abstract
    update(progress: number) {
        const p = progress / 16;
        this.x += this.vx;
        this.y += this.vy;
    }

};
