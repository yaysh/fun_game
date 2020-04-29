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
            console.log("Stack is empty");
            return;
        }        
        return this.stack.pop();
    }

}