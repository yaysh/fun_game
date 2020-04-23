/*

Manages the different states of the game i. e. what screen is shown 
for the user. The states in this game are the following:
    - Play state (when the user plays the game)
    - Menu state (shows the menu before the player starts to play)
    - Pause state (same as play state but no updates to positions of game objects)
*/

class StateManager {

    constructor () {
        this.current_state = null;
        this.canvas = document.getElementById("canvas");
        this.ctx = this.canvas.getContext("2d");     
    }


    update(progress) {
        if (GAME_OVER) this.push(new GameOverState());
        this.current_state.update(progress);
    }

    draw() {
        // Check for resize of browser, in that case, redraw everything
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.current_state.draw(this.canvas, this.ctx);
    }

    push(_state) {
        this.current_state = _state;
    }


}