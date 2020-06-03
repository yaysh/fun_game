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

    x: Number;
    y: Number;

    constructor(x: Number, y: Number) {
        this.x = x;
        this.y = y;
    }

    draw(ctx: CanvasRenderingContext2D) {

    }

    update(progress) {

    }
}



    


