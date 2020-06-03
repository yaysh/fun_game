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
var Button = /** @class */ (function (_super) {
    __extends(Button, _super);
    function Button(x, y, width, height, text) {
        var _this = _super.call(this, x, y) || this;
        _this.width = width;
        _this.height = height;
        _this.text = text;
        _this.addListener();
        _this.button_clicked = false;
        return _this;
    }
    Button.prototype.draw = function (ctx) {
        ctx.beginPath();
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.stroke();
        ctx.fillStyle = "red";
        ctx.font = "20pt sans-serif";
        ctx.fillText(this.text, this.x + 10, this.y + this.height / 2);
    };
    Button.prototype.update = function (progress) {
    };
    Button.prototype.addListener = function () {
        var _this = this;
        var canvas = document.getElementById("canvas");
        canvas.addEventListener('click', function (event) {
            var mouse_pos = _this.getCursorPosition(event);
            if (mouse_pos.y > _this.y && mouse_pos.y < _this.y + _this.height && mouse_pos.x > _this.x && mouse_pos.x < _this.x + _this.width) {
                _this.button_clicked = true;
            }
        });
    };
    Button.prototype.getCursorPosition = function (event) {
        var canvas = document.getElementById("canvas");
        if (canvas === null) {
            throw new Error("Could not identify canvas @button.ts -> getCursorPosition. Canvas is null");
        }
        ;
        var rect = canvas.getBoundingClientRect();
        var x = event.clientX - rect.left;
        var y = event.clientY - rect.top;
        return { x: x, y: y };
    };
    return Button;
}(GameObject));
