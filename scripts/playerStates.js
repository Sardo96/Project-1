const states = {
    SITTING: 0,
    RUNNING: 1,
    JUMPING: 2,
    FALLING: 3,
    ROLLING: 4,
    HIT: 5
}

class State {
    constructor(state) {
        this.state = state;
    }
}

export class Sitting extends State {
    constructor(player) {
        super('SITTING');
        this.player = player;
    }

    enter() {
        this.player.frameX = 0;
        //this.player.maxFrame = 4;
        //this.player.frameY = 5;
    }

    handleInput(input) {
        if(input.includes('ArrowLeft') || input.includes('ArrowRight')) {
            this.player.setState(states.RUNNING, 1);
        } else if (input.includes('q')) {
            this.player.setState(states.ROLLING, 2);
        }
    }
}

export class Running extends State {
    constructor(player) {
        super('RUNNING');
        this.player = player;
    }

    enter() {
        this.player.frameX = 0;
        //this.player.maxFrame = 8;
        //this.player.frameY = 3;
    }

    handleInput(input) {
        if(input.includes('ArrowDown')) {
            this.player.setState(states.SITTING, 0);
        } else if (input.includes('ArrowUp')) {
            this.player.setState(states.JUMPING, 1);
        } else if (input.includes('q')) {
            this.player.setState(states.ROLLING, 2);
        }
    }
}

export class Jumping extends State {
    constructor(player) {
        super('JUMPING');
        this.player = player;
    }

    enter() {
        if (this.player.onGround()) this.player.vy -= 20;
        this.player.frameX = 0;
        //this.player.maxFrame = 6;
        //this.player.frameY = 1;
    }

    handleInput(input) {
        if (this.player.vy > this.player.weight) {
            this.player.setState(states.FALLING, 1);
        } else if (input.includes('q')) {
            this.player.setState(states.ROLLING, 2);
        }
    }
}

export class Falling extends State {
    constructor(player) {
        super('FALLING');
        this.player = player;
    }

    enter() {
        this.player.frameX = 0;
        //this.player.maxFrame = 6;
        //this.player.frameY = 2;
    }

    handleInput(input) {
        if (this.player.onGround()) {
            this.player.setState(states.RUNNING, 1);
        }
    }
}

export class Rolling extends State {
    constructor(player) {
        super('ROLLING');
        this.player = player;
    }

    enter() {
        this.player.frameX = 0;
        //this.player.maxFrame = 6;
        //this.player.frameY = 6;
    }

    handleInput(input) {
        if (!input.includes('q') && this.player.onGround()) {
            this.player.setState(states.RUNNING, 1);
        } else if (!input.includes('q') && !this.player.onGround()) {
            this.player.setState(states.FALLING, 1);
        } else if (input.includes('q') && input.includes('ArrowUp') && this.player.onGround()) {
            this.player.vy -= 27;
        }
    }
}

export class Hit extends State {
    constructor(player) {
        super('HIT');
        this.player = player;
    }

    enter() {
        this.player.frameX = 0;
        this.player.maxFrame = 10;
        this.player.frameY = 4;
    }

    handleInput(input) {
        if (this.player.frameX >= 10 && this.player.onGround()) {
            this.player.setState(states.RUNNING, 1);
        } else if (this.player.frameX >= 10 && !this.player.onGround()) {
            this.player.setState(states.FALLING, 1);
        }
    }
}