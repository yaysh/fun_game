"use strict";
/*

    "interface" should be created that gives the objects
    that should be able to move, i. e. entities within the game
    their functions that need to be overrided.

    Problem now is that TextObject is its own class, but still has
    draw/update functions that follow the loop but can't be included
    as it doesn't have the same SUPER function (doesn't need the same
     variables in super).

*/
var GameObject = /** @class */ (function () {
    function GameObject(x, y, width, height, color) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
    }
    return GameObject;
}());
