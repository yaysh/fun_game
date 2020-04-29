class MenuState extends State {

    constructor (_state_manager) {
        super(_state_manager);
        this.objects = [];
        this.init();
    }

    // Menu should insert a DIV element with buttons
    // Important to remove the div when state is changed
    init() {

        // Clear html
        document.body.innerHTML = "";
        var div = document.createElement("div"); 

        var button = document.createElement("button");
        button.innerHTML = "Play again";

        div.appendChild(button);

        var push_game_state = function() {
            var game_state = new GameState(this.state_manager);
            this.state_manager.push(game_state);
        };

        button.addEventListener( 'click', push_game_state, false );

        var body = document.getElementsByTagName("body")[0];
        body.appendChild(div);
    }

    draw() {
        //Keep empty
    }

    update() {
        //Keep empty
    }

};