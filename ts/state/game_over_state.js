"use strict";
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
var GameOverState = /** @class */ (function (_super) {
    __extends(GameOverState, _super);
    function GameOverState(_state_manager) {
        var _this = _super.call(this, _state_manager) || this;
        _this.objects = [];
        _this.init();
        return _this;
    }
    GameOverState.prototype.init = function () {
        this.objects.push(new TextObject(100, 100, '50px serif', "Game Over", "White"));
        this.objects.push(new Button(300, 300, 100, 100, "Hello"));
    };
    GameOverState.prototype.update = function (progress) {
        this.objects.map(function (x) { return x.update(progress); });
    };
    GameOverState.prototype.draw = function (ctx) {
        console.log(ctx);
        this.objects.map(function (x) { return x.draw(ctx); });
    };
    return GameOverState;
}(State));
