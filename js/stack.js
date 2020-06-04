class Stack {

    constructor () {
        this.stack = [];
    }

    push(_state) {
        this.stack.push(_state);
    }

    peek() {
        return this.stack[this.stack.length - 1]
    }

    pop() {
        if(this.stack.length === 0) {
            return;
        }        
        return this.stack.pop();
    }

}