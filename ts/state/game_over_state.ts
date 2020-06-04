class GameOverState extends State {

    objects: GameObject[];

    constructor(_state_manager: StateManager) {
        super(_state_manager);
        this.objects = [];
        this.init();
    }

    init() {
        this.objects.push(new TextObject(100, 100, '50px serif', "Game Over", "White"));
        this.objects.push(new Button(300, 300, 100, 100, "Hello"));
    }

    update(progress: number) {
        this.objects.map(x => x.update(progress));
    }

    draw(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D): void {
        this.objects.map(x => x.draw(canvas, ctx));
    }

}