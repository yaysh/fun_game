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
var MenuState = /** @class */ (function (_super) {
    __extends(MenuState, _super);
    function MenuState(_state_manager) {
        var _this = _super.call(this, _state_manager) || this;
        _this.objects = [];
        _this.play_button = _this.addPlayAgainButton();
        _this.init();
        return _this;
    }
    // Menu should insert a DIV element with buttons
    // Important to remove the div when state is changed
    MenuState.prototype.init = function () {
        this.addPlayAgainButton();
    };
    /*
        Very sloppy solution, fix if possible...

        Grab the canvas element, then add a listener
        that listens for clicks on the button that was created.

        Needs statemanager to be able to pop
    */
    MenuState.prototype.addPlayAgainButton = function () {
        var btn_x = 250;
        var btn_y = 250;
        var btn_height = 250;
        var btn_width = 250;
        var btn = new Button(btn_x, btn_y, btn_height, btn_width, "PLAY");
        this.objects.push(btn);
        return btn;
    };
    MenuState.prototype.draw = function (canvas, ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        this.objects.map(function (x) { return x.draw(canvas, ctx); });
    };
    MenuState.prototype.update = function (progress) {
        // Check if play button has been clicked, in that case
        // pop state to resume game state
        if (this.play_button.button_clicked) {
            this.play_button.button_clicked = false;
            this.state_manager.push(new GameState(this.state_manager));
        }
        //Keep empty
        this.objects.map(function (x) { x.update(progress); });
    };
    return MenuState;
}(State));
;
