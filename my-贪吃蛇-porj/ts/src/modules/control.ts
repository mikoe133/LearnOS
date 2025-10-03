import Snake from "./Snake";
import Food from "./Food";
import Score from "./Score";

export default class Control {
    snake: Snake;
    food: Food;
    score: Score;
    direction: string = ''; // 蛇的移动方向
    islive: boolean = true;

    constructor() {
        this.snake = new Snake();
        this.food = new Food();
        this.score = new Score();
        this.direction = '';
        this.islive = true;
        this.init();
    }

    init() {
        document.addEventListener('keydown', this.keydownHandler.bind(this));
        this.run();
    }

    keydownHandler(event: KeyboardEvent) {
        this.direction = event.key;
    }

    run() {
        let X = this.snake.X;
        let Y = this.snake.Y;
        switch (this.direction) {
            case 'ArrowUp':
            case 'Up':
                Y -= 10;
                break;

            case 'ArrowDown':
            case 'Down':
                Y += 10;
                break;

            case 'ArrowLeft':
            case 'Left':
                X -= 10;
                break;

            case 'ArrowRight':
            case 'Right':
                X += 10;
                break;
        }
        this.checkEat(X, Y);
        try{
            this.snake.X = X;
            this.snake.Y = Y;
        }catch(e){
            this.islive = false;
            alert('Game Over! Your score is ' + this.score.level);
            // this.score.showScore();
            return;
        }
       
        this.islive && setTimeout(this.run.bind(this), 300 - (this.score.level - 1) * 30);
    }
    checkEat(X: number, Y: number) {
        if (X === this.food.X && Y === this.food.Y) {
            this.food.change();
            this.score.addScore();
            this.snake.addBody();
    }
}
}
