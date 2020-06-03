

abstract class State {

    state_manager: StateManager;

    constructor (_state_manager: StateManager) {
        this.state_manager = _state_manager;
    }

    abstract draw(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D): void;

    abstract update(progress: Number): void;

}