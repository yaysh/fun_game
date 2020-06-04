/*

    "interface" should be created that gives the objects
    that should be able to move, i. e. entities within the game
    their functions that need to be overrided. 

    Problem now is that TextObject is its own class, but still has
    draw/update functions that follow the loop but can't be included
    as it doesn't have the same SUPER function (doesn't need the same
     variables in super).

*/

abstract class GameObject {

    x: number;
    y: number;
    width: number;
    height: number;
    color: string;

    constructor(x: number, y: number, width: number, height: number, color: string) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
    }

    abstract draw(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D): void;

    abstract update(progress: number): void;
}



    


