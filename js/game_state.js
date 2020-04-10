class GameState {

    constructor(obj_width, obj_height, number_of_tiles) {
        this.objects = [];
        this.player = null;
        this.obj_width = obj_width;
        this.obj_height = obj_height;
        this.threshold = 0.1;
        this.number_of_tiles = number_of_tiles;
        this.game_over = false;
    }

    addObject(obj) {
        if (obj.is_player === true) this.player = obj;
        this.objects.push(obj);
        console.log("Added object");
    }

    update(progress) {
        this.objects.map(x => x.update(progress));
    }

    draw(ctx, canvas) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        this.objects.map(x => x.draw(ctx));
    }

    collisionDetection() {
        this.objects = this.objects.filter(x => {
            // Always return player
            if (x.is_player) return true;
            const same_x = Math.abs(x.x - this.player.x) < 1;
            const below = (x.y + x.height) > this.player.y;
            // If object is vertically in the same position as the player 
            // AND the object is below the player, it should be removed.
            // Otherwise it should live to see another day
            if(same_x && below) {
                return false;
            }else {
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
        console.log(this.obj_width * rnd_tile)
        let x = this.obj_width * rnd_tile;
        let y = 0;
        let vx = 0;
        let vy = 5;
        let width = this.obj_width;
        let height = this.obj_height;
        let is_player = false;
        this.addObject(new GameObject(x, y, vx, vy, width, height, is_player));
    }
    
}