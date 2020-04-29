/*

Manages the different states of the game i. e. what screen is shown 
for the user. The states in this game are the following:
    - Play state (when the user plays the game)
    - Menu state (shows the menu before the player starts to play)
    - Pause state (same as play state but no updates to positions of game objects)
*/

class StateManager {

    constructor () {
        this.stack = new Stack();
    }


    update(progress) {
        // if (GAME_OVER) this.push(new GameOverState());
        this.stack.peek().update(progress);
    }

    draw() {
        this.stack.peek().draw();
    }

    push(_state) {
        this.stack.push(_state);
    }

}