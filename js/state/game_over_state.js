class GameOverState extends State {

    constructor() {
        super();
        this.objects = [];
        this.init();
    }

    init() {
        this.objects.push(new TextObject(100, 100, '50px serif', "Game Over"));
        this.objects.push(new Button(300, 300, 100, 100));
    }

    update(progress) {
        this.objects.map(x => x.update(progress));
    }

    draw(ctx) {
        this.objects.map(x => x.draw(ctx));
    }

}