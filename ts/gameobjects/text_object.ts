class TextObject extends GameObject {

    font: string;
    text: string;
    color: string;

    constructor(x: number, y: number, font: string, text: string, color: string) {
        super(x, y, 0, 0);
        this.font = font;
        this.text = text;
        this.color = color;
    }

    draw(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = this.color;
        ctx.font = this.font;
        ctx.fillText(this.text, this.x, this.y);
    }

    update(progress: number) {

    }
}

