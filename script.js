// Costanti e variabili
let input = {x: 0, y: 0}; 
const ciboSound = new Audio('sound/food.mp3');
const gameOverSound = new Audio('sound/gameover.mp3');
const moveSound = new Audio('sound/move.mp3');
const musicaSound = new Audio('sound/music.mp3');
let velocita = 10;
let punti = 0;
let ultimoPaint = 0;
let snakeArr = [
    {x: 13, y: 15}
];

cibo = {x: 6, y: 7};

// Funzione di refresh
function main(ctime) {
    window.requestAnimationFrame(main);
    if((ctime - ultimoPaint)/1000 < 1/velocita){
        return;
    }
    ultimoPaint = ctime;
    gameEngine();
}

// Funzione per le collisioni
function collide(snake) {
    // Se ti scontri con te stesso 
    for (let i = 1; i < snakeArr.length; i++) {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }
    // Se ti scontri con il muro
    if(snake[0].x >= 18 || snake[0].x <=0 || snake[0].y >= 18 || snake[0].y <=0){
        return true;
    }    
    return false;
}

// Funzioni del gioco
function gameEngine(){
    // Funzione 1: aggiornare l'array del serpente e del cibo
    if(collide(snakeArr)){
        gameOverSound.play();
        musicaSound.pause();
        input =  {x: 0, y: 0}; 
        alert("Game Over! Ti sei scontrato!");
        snakeArr = [{x: 13, y: 15}];
        musicaSound.play();
        punti = 0; 
    }

    // Aumentare il punteggio e rigenerare il cibo se mangiato
    if(snakeArr[0].y === cibo.y && snakeArr[0].x === cibo.x){
        ciboSound.play();
        punti += 1;
        if(punti > hiscoreval){
            hiscoreval = punti;
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
            hiscoreBox.innerHTML = "Migliore: " + hiscoreval;
        }
        scoreBox.innerHTML = "Punti: " + punti;
        snakeArr.unshift({x: snakeArr[0].x + input.x, y: snakeArr[0].y + input.y});
        let a = 2;
        let b = 16;
        cibo = {x: Math.round(a + (b-a)* Math.random()), y: Math.round(a + (b-a)* Math.random())}
    }

    // Muovere il serpente
    for (let i = snakeArr.length - 2; i >= 0; i--) { 
        snakeArr[i + 1] = {...snakeArr[i]};
    }

    snakeArr[0].x += input.x;
    snakeArr[0].y += input.y;

    // Funzione 2: Mostrare il serpente e il cibo
    // Mostrare il serpente
    board.innerHTML = "";
    snakeArr.forEach((e, index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;

        if(index === 0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });
    // Mostrare il cibo
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = cibo.y;
    foodElement.style.gridColumnStart = cibo.x;
    foodElement.classList.add('food')
    board.appendChild(foodElement);


}


// Logica del gioco
musicaSound.play();
let hiscore = localStorage.getItem("hiscore");
if(hiscore === null){
    hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
}
else{
    hiscoreval = JSON.parse(hiscore);
    hiscoreBox.innerHTML = "Migliore: " + hiscore;
}

window.requestAnimationFrame(main);
window.addEventListener('keydown', e =>{
    input = {x: 0, y: 1} // Start the game
    moveSound.play();
    switch (e.key) {
        case "ArrowUp":
            input.x = 0;
            input.y = -1;
            break;

        case "ArrowDown":
            input.x = 0;
            input.y = 1;
            break;

        case "ArrowLeft":
            input.x = -1;
            input.y = 0;
            break;

        case "ArrowRight":
            input.x = 1;
            input.y = 0;
            break;
        default:
            break;
    }

});