class MenuState extends State {

    constructor (_state_manager) {
        super(_state_manager);
        this.objects = [];
        this.play_button = null;
        this.init();
    }

    // Menu should insert a DIV element with buttons
    // Important to remove the div when state is changed
    init() {
        this.addPlayAgainButton();
    }

    /* 
        Very sloppy solution, fix if possible...

        Grab the canvas element, then add a listener
        that listens for clicks on the button that was created.

        Needs statemanager to be able to pop
    */
    addPlayAgainButton() {
        var btn_x = 250;
        var btn_y = 250;
        var btn_height = 250;
        var btn_width = 250;
        var btn = new Button(btn_x, btn_y, btn_height, btn_width, "PLAY", this.state_manager);
        this.objects.push(btn);
        this.play_button = btn;
    }

    draw(canvas, ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        this.objects.map(x => x.draw(ctx));
    }

    update(progress) {
        // Check if play button has been clicked, in that case
        // pop state to resume game state
        if (this.play_button.button_clicked) {
            this.play_button.button_clicked = false;
            this.state_manager.push(new GameState(this.state_manager));
        }

        //Keep empty
        this.objects.map(x => { x.update(progress)});
    }

};