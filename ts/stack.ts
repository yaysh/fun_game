class Stack {

    stack: State[];

    constructor () {
        this.stack = [];
    }

    push(_state: State) {
        this.stack.push(_state);
    }

    peek(): State {
        return this.stack[this.stack.length - 1]
    }

    pop() {
        if(this.stack.length === 0) {
            return;
        }        
        return this.stack.pop();
    }

}