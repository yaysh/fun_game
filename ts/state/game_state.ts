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
    score_text: TextObject;
    user_input: UserInput;
    pause: boolean;
    jump_dist: number;
    latest_generated_tile: number;
    enemy_color: string;
    player_color: string;


    constructor(_state_manager: StateManager) {
        super(_state_manager);
        this.objects = [];
        this.number_of_tiles = 14;
        this.obj_width = window.innerWidth / this.number_of_tiles;
        this.obj_height = window.innerHeight / 10;
        this.threshold = 1;
        this.pause = false;
        this.jump_dist = 1;
        this.latest_generated_tile = 3;
        this.enemy_color = "black";
        this.player_color = "red";
        this.user_input = new UserInput();
        this.score_text = this.generateScoreTextObject();
        this.player = this.addPlayer();
        this.init();
    }

    init() {
        //Initialize with one enemy
        this.addObject(new Enemy(this.obj_width * 3, 0, 0, 5, this.enemy_color, this.obj_width, this.obj_height, this.latest_generated_tile));

        // User input 
        document.addEventListener("keydown", event => {
            this.user_input.keydown(event, this.player, this.state_manager.canvas,
                this.pause, this.jump_dist);
        });
        document.addEventListener("keyup", event => {
            this.user_input.keyup(event);
        });

        // Supporting lines that show the lanes
        this.addLines();
    }

    addLines() {
        for(let i = 0; i < this.number_of_tiles; i++) {

            const x: number = this.obj_width / 2 + (i * this.obj_width);
            const y: number = 0;
            const x_too: number = x;
            const y_too: number = window.innerHeight;
            const line = new Line(x, y, x_too, y_too);
            this.addObject(line);
        }
    }


    generateScoreTextObject(): TextObject {
        const x: number = window.innerWidth - 100;
        const score_text_object: TextObject = new TextObject(x, 50, "40pt sans-serif", "0", "red");
        this.addObject(score_text_object);
        return score_text_object;
    }


    addPlayer(): Player {
        const player = new Player(this.obj_width * 7, window.innerHeight - this.obj_height, 0, 0, this.player_color, this.obj_width, this.obj_height, 7);
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
        this.objects.map(x => x.update(progress));
        this.collisionDetection();
        this.generateObjects();
    }

    draw(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
            
        //Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        //Draw game objects
        this.objects.map(x => x.draw(canvas, ctx)); 
    }

    collisionDetection() {
        this.objects = this.objects.filter(x => {
            // Always return player
            if (x instanceof Player) return true;

            // Check if the object is touching the player object
            if (!(x instanceof GameEntity)) {
                return true;
            }
            const same_x = (x.tile === this.player.tile);
            const below = (x.y + x.height) > this.player.y;

            // If object is vertically in the same position as the player 
            // AND the object is below the player, it should be removed.
            // Otherwise it should live to see another day.
            // PS returning false = its dead
            if (same_x && below) {
                const new_score = parseInt(this.score_text.text) + 1;
                if (new_score % 10 === 0) {
                    this.threshold *= 2;
                }
                this.score_text.text = new_score.toString();
                return false;
            } else {

                // First a quick check to see if the object is out
                // of bounds, i. e. outside of the screen. 
                // If it is, game over.
                if (x.y + x.height >= window.innerHeight) {
                    document.removeEventListener("keydown", event => {
                        this.user_input.keydown(event, this.player, this.state_manager.canvas,
                            this.pause, this.jump_dist);
                    });
                    document.removeEventListener("keyup", event => {
                        this.user_input.keydown(event, this.player, this.state_manager.canvas,
                            this.pause, this.jump_dist);
                    });
                    this.state_manager.pop();
                }

                return true;
            }
        });
    }

    getTileWithinXTiles(dist: number, latest_generated_tile: number): number {
        while (true) {
            const rnd_tile = Math.floor(Math.random() * this.number_of_tiles);
            if (Math.abs(rnd_tile - latest_generated_tile) <= dist) {
                this.latest_generated_tile = rnd_tile;
                return rnd_tile;
            } 
        }
    }

    generateObjects() {
        // Generate number between 0 - 100. If the number is below or equal to the threshold,
        // generate an object.
        const rnd_number: number = Math.floor(Math.random() * 101);
        if (rnd_number > this.threshold) return; // For test, change < to > for real run
        // Find the x value of the generated object.
        const rnd_tile: number = this.getTileWithinXTiles(5, this.latest_generated_tile);
        const x = this.obj_width * rnd_tile;
        const y = 0;
        const vx = 0;
        const vy = 5;
        const width = this.obj_width;
        const height = this.obj_height;
        this.addObject(new Enemy(x, y, vx, vy, this.enemy_color, width, height, rnd_tile));
    }

}