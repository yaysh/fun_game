/*

    "interface" should be created that gives the objects
    that should be able to move, i. e. entities within the game
    their functions that need to be overrided. 

    Problem now is that TextObject is its own class, but still has
    draw/update functions that follow the loop but can't be included
    as it doesn't have the same SUPER function (doesn't need the same
     variables in super).

*/

class GameObject {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    draw(ctx) {

    }

    update(progress) {

    }
}

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

class Player extends GameEntity {
    constructor(x, y, vx, vy, width, height) {
        super(x, y, vx, vy, width, height);
        window.addEventListener("keydown", keydown(this, document.getElementById("canvas")), false);
        window.addEventListener("keyup", keyup(), false);
    }

}
    
class Enemy extends GameEntity {
    constructor(x, y, vx, vy, width, height) {
        super(x, y, vx, vy, width, height);
    }
}

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

