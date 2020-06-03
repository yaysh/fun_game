interface MousePosition {
    x: number,
    y: number
}

class Button extends GameObject {


    text: string;
    button_clicked: Boolean

    constructor(x: number, y: number, width: number, height: number, text: string) {
        super(x, y, width, height);
        this.text = text;
        this.addListener();
        this.button_clicked = false;
    }

    draw(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.fillStyle = "Black";
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.stroke();
        ctx.fillStyle = "red";
        ctx.font = "20pt sans-serif";
        ctx.fillText(this.text, this.x + 10, this.y + this.height / 2);

    }

    update(progress: number) {

    }

    addListener() {
        const canvas = document.getElementById("canvas") as HTMLCanvasElement;
        canvas.addEventListener('click', (event) => {
            var mouse_pos: MousePosition = this.getCursorPosition(event);
            if (mouse_pos.y > this.y && mouse_pos.y < this.y + this.height && mouse_pos.x > this.x && mouse_pos.x < this.x + this.width) {
                this.button_clicked = true;
            }
        });
    }

    getCursorPosition(event: MouseEvent) {
        var canvas = document.getElementById("canvas");
        if (canvas === null) {
            throw new Error(
                "Could not identify canvas @button.ts -> getCursorPosition. Canvas is null"
            );
        };
        var rect = canvas.getBoundingClientRect();
        var x = event.clientX - rect.left;
        var y = event.clientY - rect.top;
        return { x: x, y: y };
    }
}

