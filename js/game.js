
// Resize canvas to screen size
resizeCanvas = (canvas) => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}


function loop(game_state, canvas, ctx, last_render, timestamp) {

    const progress = timestamp - last_render;

    game_state.update(progress);
    game_state.collisionDetection();
    game_state.draw(ctx, canvas);
    game_state.generateObjects();
    last_render = timestamp;
    window.requestAnimationFrame(function(timestamp) {
        loop(game_state, canvas, ctx, last_render, timestamp);
    });
}

startGame = () => {
    const canvas = document.getElementById("canvas")
    resizeCanvas(canvas);
    const ctx = canvas.getContext("2d");

    const number_of_tiles = 15;
    const obj_width = canvas.width / number_of_tiles;
    const obj_height = canvas.height / 10;

    var last_render = 0
    game_state = new GameState(obj_width, obj_height, number_of_tiles, canvas, ctx);
    player = new GameObject(obj_width * 7, canvas.height - obj_height, 0, 0, obj_width, obj_height, true);
    game_state.addObject(new GameObject(obj_width * 3, 0, 0, 5, obj_width, obj_height, false));
    game_state.addObject(player);

    window.addEventListener("keydown", keydown(player, canvas), false)
    window.addEventListener("keyup", keyup(), false)
    window.requestAnimationFrame(function(timestamp) {
        loop(game_state, canvas, ctx, last_render, timestamp);
    });
}


startGame();