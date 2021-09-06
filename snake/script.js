let canvas = document.getElementById('snake');
let context = canvas.getContext("2d");
let box = 32;
let snake = [];
snake[0] = {
    x: 8 * box,
    y: 8 * box
}
let direcao = 'right';

function criarBG(){
    context.fillStyle = 'lightgreen';
    context.fillRect(0, 0, 16 * box, 16 * box);
}

function criarCobra(){
    for(i = 0; i < snake.length; i++){
        context.fillStyle = 'black';
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}
let comida = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}

function comer(){
    
    context.fillStyle = 'red';
    context.fillRect(comida.x, comida.y, box, box)
}

document.addEventListener('keydown', update);

function update(event){
    if(event.keyCode == 37 && direcao != ' direita') direcao = 'left';
    if(event.keyCode == 38 && direcao != 'baixo') direcao = 'up';
    if(event.keyCode == 39 && direcao != 'esquerda') direcao = 'right';
    if(event.keyCode == 40 && direcao != 'cima') direcao = 'down';
}


function inciarJogo(){
    
    if(snake[0].x > 15 * box && direcao == 'right') snake[0].x = 0;
    if(snake[0].x < 0 && direcao == 'left') snake[0].x = 16 * box;
    if(snake[0].y > 15 * box && direcao == 'down') snake[0].y = 0;
    if(snake[0].y < 0  && direcao == 'up') snake[0].y = 16 * box;

    for(i = 1; i < snake.length; i++){
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            clearInterval(jogo);
            alert('Game Over')
        }
    }


    criarBG();
    criarCobra();
    comer();

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if(direcao == 'right') snakeX += box;
    if(direcao == 'left') snakeX -= box;
    if(direcao == 'up') snakeY -= box;
    if(direcao == 'down') snakeY += box;

    if(snakeX != comida.x || snakeY != comida.y){
        snake.pop();
    }
    else{
        comida.x = Math.floor(Math.random() * 15 + 1) * box;
        comida.y = Math.floor(Math.random() * 15 + 1) * box;
    }
    

    let novaCabeca = {
        x: snakeX,
        y: snakeY
    }
    snake.unshift(novaCabeca);
}

let jogo = setInterval(inciarJogo, 100);
