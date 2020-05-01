class TextObject extends GameObject {

    constructor(x, y, font, text) {
        super(x, y);
        this.font = font;
        this.text = text;
    }

    draw(ctx) {
        ctx.font = this.font;
        ctx.fillText(this.text, this.x, this.y);
    }

    update(progress) {

    }
}

