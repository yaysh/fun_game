"use strict";
/*

    Initial code that fires up the game.

*/
// // Resize canvas to screen size
// resizeCanvas = (canvas) => {
//     canvas.width = window.innerWidth;
//     canvas.height = window.innerHeight;
// }
// Main game loop
function loop(state_manager, last_render, timestamp) {
    var progress = timestamp - last_render;
    state_manager.update(progress);
    state_manager.draw();
    last_render = timestamp;
    window.requestAnimationFrame(function (timestamp) {
        loop(state_manager, last_render, timestamp);
    });
}
// Initialize the variables that control the game
var startGame = function () {
    var state_manager = new StateManager();
    state_manager.push(new MenuState(state_manager));
    var last_render = 0;
    window.requestAnimationFrame(function (timestamp) {
        loop(state_manager, last_render, timestamp);
    });
};
startGame();
