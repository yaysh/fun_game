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
var GameEntity = /** @class */ (function (_super) {
    __extends(GameEntity, _super);
    function GameEntity(x, y, vx, vy, width, height, tile) {
        var _this = _super.call(this, x, y) || this;
        _this.vx = vx;
        _this.vy = vy;
        _this.width = width;
        _this.height = height;
        _this.tile = tile;
        return _this;
    }
    // TODO: make these abstract
    GameEntity.prototype.draw = function (ctx) {
        ctx.beginPath();
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.stroke();
    };
    // TODO: make these abstract
    GameEntity.prototype.update = function (progress) {
        var p = progress / 16;
        this.x += this.vx;
        this.y += this.vy;
    };
    return GameEntity;
}(GameObject));
;
