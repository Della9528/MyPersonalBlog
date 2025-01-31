const scoreArea = document.getElementById("score");
const gameContainer = document.getElementById("game-container");
const resultArea = document.getElementById("result-area");
const resetButton = document.getElementById("reset-button");
const specialFoodTimerArea = document.getElementById("special-food-timer");
let snake = [{x:10,y:10}];
let food = [{x:5,y:5}];
let specialFood = null;
let specialFoodTimeRemaining = 0;
let direction = {x:0,y:0};
let score = 0;
let gameStatus = 0;
let foodCounter = 0;


const createBlock = (x, y, type) => {
    const block = document.createElement("div");
    block.setAttribute("id", type);
    block.style.gridRowStart = y + 1; 
    block.style.gridColumnStart = x + 1; 
    return block;
}

const createSpecialFood = () => {
    specialFood = {
        x : Math.floor(Math.random()*20), 
        y : Math.floor(Math.random()*20)
    }

    specialFoodTimeRemaining = 10;
    let specialFoodTimer = null;
    specialFoodTimerArea.style.display = "block";
    specialFoodTimerArea.innerText = `Timer: ${specialFoodTimeRemaining}`;

    if (specialFoodTimer) clearInterval(specialFoodTimer);
    setInterval(() => {
        specialFoodTimeRemaining--;
        if(specialFoodTimeRemaining <= 0){
            specialFood = null;
            draw();
            timerBlock.remove()
        }
        specialFoodTimerArea.innerText = `Timer: ${specialFoodTimeRemaining}`;
    }, 1000)

}


const draw = () => {
    gameContainer.innerHTML="";

    snake.forEach((segment)=>{
        const snakeBlock = createBlock(segment.x, segment.y, "snake");
        gameContainer.appendChild(snakeBlock);
    }); 

    food.forEach((segment)=>{
        const foodBlock = createBlock(segment.x, segment.y, "food");
        gameContainer.appendChild(foodBlock); 
    }); 

    if(specialFood) {
        const specialFoodBlock = createBlock(specialFood.x, specialFood.y, "special-food");
        gameContainer.appendChild(specialFoodBlock);
    }
}

const moveSnake = () => {
    const headSnake = {
        x : snake[0].x + direction.x,
        y : snake[0].y + direction.y
    }
    snake.unshift(headSnake);

    snake.pop();
    eatFood();
    checkCollisions();
}

const addSnakeBlock = () => {
    let snakeBlock = {x:0,y:0};
    const index = snake.length - 1;
    if (direction.x === 0 && direction.y === 1){
        snakeBlock = {
            x : snake[index].x,
            y : snake[index].y - 1
        }
    } else if (direction.x === 0 && direction.y === -1){
        snakeBlock = {
            x : snake[index].x,
            y : snake[index].y + 1
        }
    }    if (direction.x === -1 && direction.y === 0){
        snakeBlock = {
            x : snake[index].x +1,
            y : snake[index].y
        }
    }    if (direction.x === 1 && direction.y === 0){
        snakeBlock = {
            x : snake[index].x-1,
            y : snake[index].y
        }
    }
    snake.push(snakeBlock);
}

const eatFood = () => {
    if (snake[0].x === food[0].x && snake[0].y === food[0].y){
        const newFood = {
            x : Math.floor(Math.random()*20), 
            y : Math.floor(Math.random()*20)
        }
        food.pop()
        food.push(newFood);
        addSnakeBlock();
        score++;
        foodCounter++;
        scoreArea.innerHTML = `Punteggio: ${score}`;

        if (foodCounter % 5 === 0){
            createSpecialFood();
        }
    }
    if (specialFood && snake[0].x === specialFood.x && snake[0].y === specialFood.y) {
        specialFood = null; 
        score += 3; 
        addSnakeBlock();
        scoreArea.innerHTML = `Punteggio: ${score}`;
        specialFoodTimerArea.style.display = "none";
    }
}

const gameOver = () => {
    resultArea.innerHTML = `Hai perso! Il tuo punteggio è ${score}. Premi Reset per giocare di nuovo`
    resultArea.style.display = "flex"
    resetButton.style.display = "block";
}

const checkCollisions = () => {
    if(snake[0].x < 0 || snake[0].y < 0 || snake[0].x > 19 || snake[0].y > 19){
        gameStatus = 0;
        gameOver();    
    }

    for (let i = 1; i < snake.length; i++){
        if (snake[0].x === snake[i].x && snake[0].y === snake[i].y ){
            gameStatus = 0;
            gameOver();   
        }
    }         
}

const resetGame = () => {
    snake = [{x:10,y:10}];
    food = [{x:5,y:5}];
    direction = {x:0,y:0};
    score = 0;
    scoreArea.innerHTML = "Punteggio: 0";
    resultArea.innerHTML = ""
    resetButton.style.display = "none";
    draw();
}

const gameLoop = () => {
    if (gameStatus === 1){
        moveSnake();
        draw();
    }
}

document.addEventListener('keydown', (evt) => {
    switch(evt.key){
        case "ArrowUp":
            if(direction.y === 0 && gameStatus === 1){
                direction = {x : 0, y : -1};
            }
            break;
        case "ArrowDown": 
        if(direction.y === 0 && gameStatus === 1){
            direction = {x : 0, y : 1};
        }
            break;
        case "ArrowLeft": 
        if(direction.x === 0 && gameStatus === 1){
            direction = {x : -1, y : 0};
        }
            break;
        case "ArrowRight": 
        if(direction.x === 0 && gameStatus === 1){
            direction = {x : 1, y : 0};
        }
            break;
        case " ":
            gameStatus = gameStatus === 0 ? 1 : 0; // Alterna tra pausa e gioco
            break;
    }
});

setInterval(gameLoop,200);


resetButton.addEventListener("click", resetGame);

