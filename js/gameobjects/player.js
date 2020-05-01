class Player extends GameEntity {
    constructor(x, y, vx, vy, width, height, tile) {
        super(x, y, vx, vy, width, height, tile);
        window.addEventListener("keydown", keydown(this, document.getElementById("canvas")), false);
        window.addEventListener("keyup", keyup(), false);
    }

}