/*

Manages the different states of the game i. e. what screen is shown 
for the user. The states in this game are the following:
    - Play state (when the user plays the game)
    - Menu state (shows the menu before the player starts to play)
    - Pause state (same as play state but no updates to positions of game objects)
*/

class StateManager {

    stack: Stack;
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D | null;

    constructor () {
        this.stack = new Stack();
        this.canvas = document.createElement('canvas');
        this.canvas.id = "canvas";
        this.ctx = this.canvas.getContext("2d");
        if (!(this.ctx = this.canvas.getContext("2d"))) {
            throw new Error('2d context not supported or canvas already initialized');
        }
        this.init();
    }

    init(): void {
        document.body.appendChild(this.canvas);
    }

    update(progress: Number): void {
        // if (GAME_OVER) this.push(new GameOverState());
        this.stack.peek().update(progress);
    }

    draw(): void {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.stack.peek().draw(this.canvas, this.ctx);
    }

    push(_state: State): void {
        this.stack.push(_state);
    }

    pop(): void {
        var old_state = this.stack.pop();
    }

}