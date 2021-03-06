"use strict";
/*

    Keeps track of what state the game is in. Also handles transitions
    between states based upon what input the user gives during the game
    loop.


*/
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// Game settings - can be changed to an object that controlls the different 
// settings probably?
// TODO: Should make sure that all objects are updated in size depending on screen size
// IE dynamically sized enemy objects
// TODO: Move settings to a settings object
var GameState = /** @class */ (function (_super) {
    __extends(GameState, _super);
    function GameState(_state_manager) {
        var _this = _super.call(this, _state_manager) || this;
        _this.objects = [];
        _this.number_of_tiles = 14;
        _this.obj_width = window.innerWidth / _this.number_of_tiles;
        _this.obj_height = window.innerHeight / 10;
        _this.threshold = 1;
        _this.pause = false;
        _this.jump_dist = 1;
        _this.latest_generated_tile = 3;
        _this.enemy_color = "black";
        _this.player_color = "red";
        _this.user_input = new UserInput();
        _this.score_text = _this.generateScoreTextObject();
        _this.player = _this.addPlayer();
        _this.init();
        return _this;
    }
    GameState.prototype.init = function () {
        var _this = this;
        //Initialize with one enemy
        this.addObject(new Enemy(this.obj_width * 3, 0, 0, 5, this.enemy_color, this.obj_width, this.obj_height, this.latest_generated_tile));
        // User input 
        document.addEventListener("keydown", function (event) {
            _this.user_input.keydown(event, _this.player, _this.state_manager.canvas, _this.pause, _this.jump_dist);
        });
        document.addEventListener("keyup", function (event) {
            _this.user_input.keyup(event);
        });
        // Supporting lines that show the lanes
        this.addLines();
    };
    GameState.prototype.addLines = function () {
        for (var i = 0; i < this.number_of_tiles; i++) {
            var x = this.obj_width / 2 + (i * this.obj_width);
            var y = 0;
            var x_too = x;
            var y_too = window.innerHeight;
            var line = new Line(x, y, x_too, y_too);
            this.addObject(line);
        }
    };
    GameState.prototype.generateScoreTextObject = function () {
        var x = window.innerWidth - 100;
        var score_text_object = new TextObject(x, 50, "40pt sans-serif", "0", "red");
        this.addObject(score_text_object);
        return score_text_object;
    };
    GameState.prototype.addPlayer = function () {
        var player = new Player(this.obj_width * 7, window.innerHeight - this.obj_height, 0, 0, this.player_color, this.obj_width, this.obj_height, 7);
        this.addObject(player);
        return player;
    };
    GameState.prototype.addObject = function (obj) {
        this.objects.push(obj);
    };
    // Update positions of entities
    // Check collisions and handle collision
    // Handle generate new objects 
    GameState.prototype.update = function (progress) {
        if (this.pause)
            return;
        // Ugly solution to fix dynamic sizes of sprites, where
        // should it actually happen? In the object
        this.objects.map(function (x) { return x.update(progress); });
        this.collisionDetection();
        this.generateObjects();
    };
    GameState.prototype.draw = function (canvas, ctx) {
        //Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        //Draw game objects
        this.objects.map(function (x) { return x.draw(canvas, ctx); });
    };
    GameState.prototype.collisionDetection = function () {
        var _this = this;
        this.objects = this.objects.filter(function (x) {
            // Always return player
            if (x instanceof Player)
                return true;
            // Check if the object is touching the player object
            if (!(x instanceof GameEntity)) {
                return true;
            }
            var same_x = (x.tile === _this.player.tile);
            var below = (x.y + x.height) > _this.player.y;
            // If object is vertically in the same position as the player 
            // AND the object is below the player, it should be removed.
            // Otherwise it should live to see another day.
            // PS returning false = its dead
            if (same_x && below) {
                var new_score = parseInt(_this.score_text.text) + 1;
                if (new_score % 10 === 0) {
                    _this.threshold *= 2;
                }
                _this.score_text.text = new_score.toString();
                return false;
            }
            else {
                // First a quick check to see if the object is out
                // of bounds, i. e. outside of the screen. 
                // If it is, game over.
                if (x.y + x.height >= window.innerHeight) {
                    document.removeEventListener("keydown", function (event) {
                        _this.user_input.keydown(event, _this.player, _this.state_manager.canvas, _this.pause, _this.jump_dist);
                    });
                    document.removeEventListener("keyup", function (event) {
                        _this.user_input.keydown(event, _this.player, _this.state_manager.canvas, _this.pause, _this.jump_dist);
                    });
                    _this.state_manager.pop();
                }
                return true;
            }
        });
    };
    GameState.prototype.getTileWithinXTiles = function (dist, latest_generated_tile) {
        while (true) {
            var rnd_tile = Math.floor(Math.random() * this.number_of_tiles);
            if (Math.abs(rnd_tile - latest_generated_tile) <= dist) {
                this.latest_generated_tile = rnd_tile;
                return rnd_tile;
            }
        }
    };
    GameState.prototype.generateObjects = function () {
        // Generate number between 0 - 100. If the number is below or equal to the threshold,
        // generate an object.
        var rnd_number = Math.floor(Math.random() * 101);
        if (rnd_number > this.threshold)
            return; // For test, change < to > for real run
        // Find the x value of the generated object.
        var rnd_tile = this.getTileWithinXTiles(5, this.latest_generated_tile);
        var x = this.obj_width * rnd_tile;
        var y = 0;
        var vx = 0;
        var vy = 5;
        var width = this.obj_width;
        var height = this.obj_height;
        this.addObject(new Enemy(x, y, vx, vy, this.enemy_color, width, height, rnd_tile));
    };
    return GameState;
}(State));
