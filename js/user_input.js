/*
If the player presses a key, move the "square" x distance.
Then halt movement until the player resets by letting the key go up.
*/


class UserInput {

    constructor() {

    }

    keydown(e, player, canvas, input_reset, pause, jump_dist) {
        const key_map = {
            37: 'left',
            39: 'right',
            80: 'p',
            50: '2',
            51: '3',
            52: '4',
            53: '5'
        };
        const key = key_map[parseInt(e.keyCode)];
        console.log(key);

        /*
        If paused, unpause.
        If unpaused, pause.
        */
        if (key === 'p') {
            if (pause) {
                pause = false;
            } else {
                pause = true;
            }
            return;
        }

        // TODO: Fix this so pause doesn't move the player This
        // should be considered a temporary solution. Should
        // be enough to check if paused in the game states update
        // function to stop movement.
        if (pause) return;


        // Change the distance to be jumped
        if (key === '2') {
            jump_dist = 2;
        } else if (key === '3') {
            jump_dist = 3;
        } else if (key === '4') {
            jump_dist = 4;
        } else if (key === '5') {
            jump_dist = 5;
        }

        // Below controls player movement, player has to released 
        // the key before the next input is registered.
        // Example: if the player presses right arrow, right arrow has
        // to be released before the player can move to the right again
        // meaning that holding the key down won't continuousyl move 
        if (input_reset === false) return;
        if (key == 'left' || key == 'right') {
            input_reset = false;
            if (key == 'left') {
                player.x -= player.width * jump_dist;
                player.tile -= 1 * jump_dist;
                // Incase player moves too much to the left.
                if (player.x < 0) {
                    player.x = 0;
                    player.tile = 0;
                }
            }
            if (key == 'right') {
                player.x += player.width * jump_dist;
                player.tile += 1 * jump_dist;
                if (player.x + player.width > canvas.width) {
                    player.x = canvas.width - player.width;
                    player.tile = 14;
                }
            }
            // Reset the jump distance
            jump_dist = 1;
        }
    }

    keyup(e, input_reset) {
        const key = this.key_map[e.keyCode];
        if (key == 'left' || key == 'right') {
            input_reset = true;
        }
        return;

    }
}








