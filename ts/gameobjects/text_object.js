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
var TextObject = /** @class */ (function (_super) {
    __extends(TextObject, _super);
    function TextObject(x, y, font, text, color) {
        var _this = _super.call(this, x, y, 0, 0) || this;
        _this.font = font;
        _this.text = text;
        _this.color = color;
        return _this;
    }
    TextObject.prototype.draw = function (canvas, ctx) {
        ctx.fillStyle = this.color;
        ctx.font = this.font;
        ctx.fillText(this.text, this.x, this.y);
    };
    TextObject.prototype.update = function (progress) {
    };
    return TextObject;
}(GameObject));
