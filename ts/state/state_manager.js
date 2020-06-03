"use strict";
/*

Manages the different states of the game i. e. what screen is shown
for the user. The states in this game are the following:
    - Play state (when the user plays the game)
    - Menu state (shows the menu before the player starts to play)
    - Pause state (same as play state but no updates to positions of game objects)
*/
var StateManager = /** @class */ (function () {
    function StateManager() {
        this.stack = new Stack();
        this.init();
    }
    StateManager.prototype.init = function () {
        var canvas = document.createElement('canvas');
        canvas.id = "canvas";
        document.body.appendChild(canvas);
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d");
    };
    StateManager.prototype.update = function (progress) {
        // if (GAME_OVER) this.push(new GameOverState());
        this.stack.peek().update(progress);
    };
    StateManager.prototype.draw = function () {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.stack.peek().draw(this.canvas, this.ctx);
    };
    StateManager.prototype.push = function (_state) {
        this.stack.push(_state);
    };
    StateManager.prototype.pop = function () {
        var old_state = this.stack.pop();
    };
    return StateManager;
}());
