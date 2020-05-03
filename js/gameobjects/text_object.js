class TextObject extends GameObject {

    constructor(x, y, font, text, color) {
        super(x, y);
        this.font = font;
        this.text = text;
        this.color = color;
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.font = this.font;
        ctx.fillText(this.text, this.x, this.y);
    }

    update(progress) {

    }
}

