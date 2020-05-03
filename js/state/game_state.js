/*

    Keeps track of what state the game is in. Also handles transitions
    between states based upon what input the user gives during the game
    loop. 


*/

// Game settings - can be changed to an object that controlls the different 
// settings probably?

// TODO: Should make sure that all objects are updated in size depending on screen size
// IE dynamically sized enemy objects



class GameState extends State {

    constructor (_state_manager) {
        super(_state_manager);
        this.objects = [];
        this.player = null;
        this.number_of_tiles = 15;
        this.obj_width = window.innerWidth / this.number_of_tiles;
        this.obj_height = window.innerHeight / 10;
        this.threshold = 0.1;
        this.score = 0;
        this.score_text = null;
        this.init();
    }

    init() {
        var player = new Player(this.obj_width * 7, window.innerHeight - this.obj_height, 0, 0, this.obj_width, this.obj_height, 7);
        this.addObject(new Enemy(this.obj_width * 3, 0, 0, 5, this.obj_width, this.obj_height, 3));
        this.addObject(player);

        //Add text object that represents scoreboard.
        
        var font = "20pt sans-serif";
        var score_text = new TextObject(window.innerWidth - 100, 100, font, this.score, "red");
        this.score_text = score_text;
    }

    addObject(obj) {
        if (obj instanceof Player) this.player = obj;
        this.objects.push(obj);
    }

    // Update positions of entities
    // Check collisions and handle collision
    // Handle generate new objects 
    update(progress) {
        
        if (PAUSE) return;            

        this.objects.map(x => x.update(progress));
        this.collisionDetection();
        this.generateObjects();
        this.score_text.text = this.score.toString();
        console.log(this.score_text.text);
    }

    draw(canvas, ctx) {
        //Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        //Draw game objects
        this.objects.map(x => x.draw(ctx) );

        //Draw score
        this.score_text.draw(ctx);
    }

    collisionDetection() {
        this.objects = this.objects.filter(x => {
            // Always return player
            if (x instanceof Player) return true;

            // Check if the object is touching the player object
            const same_x = (x.tile === this.player.tile) ;
            const below = (x.y + x.height) > this.player.y;

            // If object is vertically in the same position as the player 
            // AND the object is below the player, it should be removed.
            // Otherwise it should live to see another day.
            // PS returning false = its dead
            if(same_x && below) {
                this.score += 1;
                return false;
            }else {

                // First a quick check to see if the object is out
                // of bounds, i. e. outside of the screen. 
                // If it is, game over.
                if (x.y + x.height >= window.innerHeight) {
                    this.state_manager.pop();
                }

                return true;
            }        
        });
    }

    generateObjects() {
        // Generate number between 0 - 100. If the number is below or equal to the threshold,
        // generate an object.
        const rnd_number = Math.floor(Math.random() * 101);  
        if (rnd_number > this.threshold) return; // For test, change < to > for real run
        // Find the x value of the generated object.
        const rnd_tile = Math.floor(Math.random() * this.number_of_tiles+1);
        let x = this.obj_width * rnd_tile;
        let y = 0;
        let vx = 0;
        // let vy = 5;
        let vy = 0;
        let width = this.obj_width;
        let height = this.obj_height;
        this.addObject(new Enemy(x, y, vx, vy, width, height, rnd_tile));
    }
    
}