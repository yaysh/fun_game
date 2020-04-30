/*
If the player presses a key, move the "square" x distance.
Then halt movement until the player resets by letting the key go up.
*/


key_map = {
    37: 'left',
    39: 'right',
    80: 'p'
}

var INPUT_RESET = true;
var PAUSE = false;

function keydown(player, canvas) {
    return function (e) {
        const key = key_map[e.keyCode];
        /*
        If paused, unpause.
        If unpaused, pause.
        */
        if (key === 'p') {
            if (PAUSE) {
                PAUSE = false;
            }else {
                PAUSE = true;
            }
            return;
        }

        // TODO: Fix this so pause doesn't move the player This
        // should be considered a temporary solution. Should
        // be enough to check if paused in the game states update
        // function to stop movement.
        if (PAUSE) return;

        // Below controls player movement, player has to released 
        // the key before the next input is registered.
        // Example: if the player presses right arrow, right arrow has
        // to be released before the player can move to the right again
        // meaning that holding the key down won't continuousyl move 
        if (INPUT_RESET === false) return;
        if (key == 'left' || key == 'right') {
            INPUT_RESET = false;
            if (key == 'left') {
                player.x -= player.width;
                // Incase player moves too much to the left.
                if (player.x < 0) {
                    player.x = 0;
                }
            }
            if (key == 'right') {
                player.x += player.width;
                if(player.x + player.width > canvas.width){
                    player.x = canvas.width - player.width;
                }
            }
        }        
    }
}


function keyup() {
    return function(e) {
        const key = key_map[e.keyCode];
        if (key == 'left' || key == 'right') {
            INPUT_RESET = true; 
        }
        return;
    }
}