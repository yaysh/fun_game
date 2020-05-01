class Button extends GameObject {
    constructor(x, y, width, height, text) {
        super(x, y);
        this.width = width; 
        this.height = height;
        this.text = text;
        this.addListener();
        this.button_clicked = false;
    }

    draw (ctx) {
        ctx.beginPath();
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.stroke();

        ctx.fillStyle = "red";
        ctx.font = "20pt sans-serif";
        ctx.fillText(this.text, this.x+10, this.y+this.height/2);

    }

    update(progress) {
        
    }

    addListener() {
        var canvas = document.getElementById("canvas");
        canvas.addEventListener('click', (event) => {
            var mouse_pos = this.getCursorPosition(event);
            if (mouse_pos.y > this.y && mouse_pos.y < this.y + this.height && mouse_pos.x > this.x && mouse_pos.x < this.x + this.width) {
                this.button_clicked = true;
            }
        });
    }

    getCursorPosition(event) {
        var canvas = document.getElementById("canvas");
        var rect = canvas.getBoundingClientRect();
        var x = event.clientX - rect.left;
        var y = event.clientY - rect.top;
        return {x: x, y: y};
    }
}

