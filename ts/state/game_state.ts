/*

    Keeps track of what state the game is in. Also handles transitions
    between states based upon what input the user gives during the game
    loop. 


*/

// Game settings - can be changed to an object that controlls the different 
// settings probably?

// TODO: Should make sure that all objects are updated in size depending on screen size
// IE dynamically sized enemy objects

// TODO: Move settings to a settings object

class GameState extends State {


    objects: GameObject[];
    player: Player;
    number_of_tiles: number;
    obj_width: number;
    obj_height: number;
    threshold: number;
    score: number;
    score_text: string;
    user_input: UserInput;
    input_reset: boolean;
    pause: boolean;
    jump_dist: number;

    constructor (_state_manager: StateManager) {
        super(_state_manager);
        this.objects = [];
        this.number_of_tiles = 14;
        this.obj_width = window.innerWidth / this.number_of_tiles;
        this.obj_height = window.innerHeight / 10;
        this.threshold = 0.1;
        this.score = 0;
        this.score_text = "";
        this.user_input = new UserInput();
        this.input_reset = true;
        this.pause = false;
        this.jump_dist = 1;
        this.player = this.addPlayer();
        this.init();

    }

    init() {
        //Initialize with one enemy
        this.addObject(new Enemy(this.obj_width * 3, 0, 0, 5, this.obj_width, this.obj_height, 3));

        //Add text object that represents scoreboard.
        
        const font = "20pt sans-serif";

        const score_text = new TextObject(window.innerWidth - 100, 100, font, this.score.toString(), "red");
        this.score_text = score_text.toString();

        // User input 
        document.addEventListener("keydown", event => {
            this.user_input.keydown(event, this.player, this.state_manager.canvas, 
                this.input_reset, this.pause, this.jump_dist);
        });
        document.addEventListener("keyup", event => {
            this.user_input.keydown(event, this.player, this.state_manager.canvas, 
                this.input_reset, this.pause, this.jump_dist);
        });

    }


    addPlayer(): Player {
        const player = new Player(this.obj_width * 7, window.innerHeight - this.obj_height, 0, 0, this.obj_width, this.obj_height, 7);
        this.addObject(player);
        return player;
    }

    addObject(obj: GameObject) {
        this.objects.push(obj);
    }

    // Update positions of entities
    // Check collisions and handle collision
    // Handle generate new objects 
    update(progress: number) {
        
        if (this.pause) return;            

        // Ugly solution to fix dynamic sizes of sprites, where
        // should it actually happen? In the object
        this.objects.map(x => x.update(progress) );
        this.collisionDetection();
        this.generateObjects();
        this.score_text = this.score.toString();

        console.log(this.player.tile);
    }

    draw(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
        //Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        //Draw game objects
        this.objects.map(x => x.draw(canvas, ctx) );

        //TODO: Draw scoretext
    }

    collisionDetection() {
        this.objects = this.objects.filter(x => {
            // Always return player
            if (x instanceof Player) return true;

            // Check if the object is touching the player object
            if (!(x instanceof GameEntity)) {
                return false;
            }
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
                    document.removeEventListener("keydown", event => {
                        this.user_input.keydown(event, this.player, this.state_manager.canvas, 
                            this.input_reset, this.pause, this.jump_dist);
                    });
                    document.removeEventListener("keyup", event => {
                        this.user_input.keydown(event, this.player, this.state_manager.canvas, 
                            this.input_reset, this.pause, this.jump_dist);
                    });
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
        const rnd_tile = Math.floor(Math.random() * this.number_of_tiles);
        console.log("Generated at: ", rnd_tile);
        let x = this.obj_width * rnd_tile;
        let y = 0;
        let vx = 0;
        let vy = 5;
        let width = this.obj_width;
        let height = this.obj_height;
        this.addObject(new Enemy(x, y, vx, vy, width, height, rnd_tile));
    }
    
}