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
var Line = /** @class */ (function (_super) {
    __extends(Line, _super);
    function Line(x, y, x_too, y_too) {
        var _this = _super.call(this, x, y, 0, 0, "black") || this;
        _this.x_too = x_too;
        _this.y_too = y_too;
        return _this;
    }
    Line.prototype.draw = function (canvas, ctx) {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.setLineDash([5, 15]);
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x_too, this.y_too);
        ctx.stroke();
    };
    Line.prototype.update = function (progress) {
        return;
    };
    return Line;
}(GameObject));
