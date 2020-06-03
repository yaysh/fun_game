"use strict";
var Stack = /** @class */ (function () {
    function Stack() {
        this.stack = [];
    }
    Stack.prototype.push = function (_state) {
        this.stack.push(_state);
    };
    Stack.prototype.peek = function () {
        return this.stack[this.stack.length - 1];
    };
    Stack.prototype.pop = function () {
        if (this.stack.length === 0) {
            console.log("Stack is empty");
            return;
        }
        return this.stack.pop();
    };
    return Stack;
}());
