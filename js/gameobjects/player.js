class Player extends GameEntity {
    constructor(x, y, vx, vy, width, height) {
        super(x, y, vx, vy, width, height);
        window.addEventListener("keydown", keydown(this, document.getElementById("canvas")), false);
        window.addEventListener("keyup", keyup(), false);
    }

}