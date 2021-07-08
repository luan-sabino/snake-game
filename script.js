let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let box = 32;
let snake = [];
snake[0] = {
    x: 8 * box,
    y: 8 * box
}
let direction = "right";
let comida = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}

let corBG = "black";
let corCobra = "white";
let corFruta = "gray";


function criarBG() {
    context.fillStyle = corBG;
    context.fillRect(0, 0, 16 * box, 16 * box);
}

function criarCobra() {
    for (i = 0; i < snake.length; i++) {
        context.fillStyle = corCobra;
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

function desenhaComida() {
    context.fillStyle = corFruta;
    context.fillRect(comida.x, comida.y, box, box);
}

document.addEventListener('keydown', moverCobra);

function moverCobra(event) {
    if (event.keyCode == 37 && direction != "right") direction = "left";
    if (event.keyCode == 38 && direction != "down") direction = "up";
    if (event.keyCode == 39 && direction != "left") direction = "right";
    if (event.keyCode == 40 && direction != "up") direction = "down";
}

function iniciarJogo() {

    for (i = 1; i < snake.length; i++) {
        if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
            clearInterval(jogo);
            alert("Fim de jogo");
            if (prompt("Quer jogar de novo?"
                + "Digite Sim ou Nao.") == "Sim") {
                document.location.reload();
            }
        }
    }

    if (snake[0].x >= 16 * box) snake[0].x = 0;
    if (snake[0].x < 0) snake[0].x = 16 * box;
    if (snake[0].y >= 16 * box) snake[0].y = 0;
    if (snake[0].y < 0) snake[0].y = 16 * box;

    criarBG();
    criarCobra();
    desenhaComida();

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (direction == "right") snakeX += box;
    if (direction == "left") snakeX -= box;
    if (direction == "up") snakeY -= box;
    if (direction == "down") snakeY += box;

    if (snakeX != comida.x || snakeY != comida.y) {
        snake.pop();
    } else {
        comida.x = Math.floor(Math.random() * 15 + 1) * box;
        comida.y = Math.floor(Math.random() * 15 + 1) * box;
    }

    let novaCabeca = {
        x: snakeX,
        y: snakeY
    }

    snake.unshift(novaCabeca);
}

let jogo = setInterval(iniciarJogo, 100);

let pag = document.getElementById("container");
let pagtext = document.getElementById("colortext");

function mudaTema() {
    if (corBG == "black") {
        corBG = "white";
        corCobra = "black";
        pag.style.background = "white";
        pagtext.style.color = "black";
    } else if (corBG == "white") {
        corBG = "black";
        corCobra = "white";
        pag.style.background = "black";
        pagtext.style.color = "white";

    }
}