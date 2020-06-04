class Line extends GameObject {

    x_too: number;
    y_too: number

    constructor(x: number, y: number, x_too: number, y_too: number) {
        super(x, y, 0, 0, "black");
        this.x_too = x_too;
        this.y_too = y_too;
    }

    draw(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.setLineDash([5, 15]);
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x_too, this.y_too);
        ctx.stroke();
    }

    update(progress: number) {
        return;
    }
}





