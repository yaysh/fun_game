/*
If the player presses a key, move the "square" x distance.
Then halt movement until the player resets by letting the key go up.
*/


key_map = {
    37: 'left',
    39: 'right',
}

var INPUT_RESET = true;

function keydown(player, canvas) {
    return function (e) {
        if (INPUT_RESET === false) return;
        const key = key_map[e.keyCode];
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