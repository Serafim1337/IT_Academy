const startButton = document.querySelector('.start-button');
const score1 = document.querySelector('.score-green');
const score2 = document.querySelector('.score-blue');
const gameField = document.querySelector('.game-field');

const player1 = document.querySelector('.player-green');
const player2= document.querySelector('.player-blue');
const ballElement = document.querySelector('.ball');

let gameState = 0;
// 0 - before start
// 1 - playing
// 2 - goal scored and game paused

const fieldCords = {
    height : gameField.offsetHeight,
    width: gameField.offsetWidth,
    topBorder : gameField.offsetTop,
    bottomBorder : gameField.offsetTop + gameField.offsetHeight,
    leftBorder : gameField.offsetLeft,
    rightBorder : gameField.offsetLeft + gameField.offsetWidth,
}

let ballDirectionX = null;
let ballDirectionY = null;

const ball = {
    x: 0,
    y: 0,
    elem : ballElement,
    height : ballElement.offsetHeight,
    width : ballElement.offsetWidth,
    speedX : 3,
    speedY : 3,
    update : function() {
        this.elem.style.left = this.x + 'px';
        this.elem.style.top = this.y + 'px';
    },
    reset : function () {
        this.x = fieldCords.width/2 - this.width/2;
        this.y = fieldCords.height/2 - this.height/2;
        ballDirectionX = Math.random() > 0.5 ? -1 : 1;
        this.speedX *= ballDirectionX;
        ballDirectionY = Math.random() > 0.5 ? -1 : 1;
        this.speedY *= ballDirectionY;
        this.update();
    },
}

ball.reset();

const p1 = {
    x: 0,
    y: 0,
    elem : player1,
    speed: 0,
    width: player1.offsetWidth,
    height : player1.offsetHeight,
    update : function() {
        this.elem.style.top = this.y + 'px';
    },
    reset : function() {
        this.y = fieldCords.height/2 - this.elem.offsetHeight/2;
        this.update();
    }
}

p1.reset();

const p2 = {
    x: 0,
    y: 0,
    elem: player2,
    speed: 0,
    width: player2.offsetWidth,
    height: player2.offsetHeight,
    update : function() {
        this.elem.style.left = this.x + 'px';
        this.elem.style.top = this.y + 'px';
    },
    reset : function() {
        this.x = fieldCords.width - this.elem.offsetWidth;
        this.y = fieldCords.height/2 - this.elem.offsetHeight/2;
        this.update();
    }
}

p2.reset();

const score = {
    p1 : 0,
    p2 : 0,
    add1 : function() {
        this.p1++;
        score1.textContent = this.p1;
    },
    add2 : function() {
        this.p2++;
        score2.textContent = this.p2;
    }
}

startButton.addEventListener('click', startGame);

function startGame(e) {
    switch (gameState) {
        case 0 : 
            tick();
            this.disabled = true;
            gameState = 1;
            break;
        case 2 : 
            ball.reset();
            p1.reset();
            p2.reset();
            this.disabled= true; 
            gameState = 1;
            tick();
            break;     
    }
}

document.addEventListener('keydown', moveStartHandler);
document.addEventListener('keyup', moveStopHandler); 

function moveStartHandler(e) {
    switch(e.code) {
        case "ArrowUp" :
            e.preventDefault(); 
            p2.speed = -5;
            break;
        case "ArrowDown" :
            e.preventDefault(); 
            p2.speed = 5;
            break;
        case "ShiftLeft" :
            e.preventDefault(); 
            p1.speed = -5;
            break;
        case 'ControlLeft' :
            e.preventDefault(); 
            p1.speed = 5;
            break;        
    }
}

function moveStopHandler(e) {
    switch(e.code) {
        case "ArrowUp" : 
        case "ArrowDown" :
            e.preventDefault(); 
            p2.speed = 0;
            break;
        case "ShiftLeft" :
        case 'ControlLeft' :
            e.preventDefault(); 
            p1.speed = 0;
            break;        
    }
}

function tick () {

    if(gameState == 2) {
        return;
    }

    playersMoveController();

    ballMoveController();

    wallCollisionController();

    playerCollisionController();

    window.requestAnimationFrame(tick);
}

function stopGame() {
    startButton.disabled = false;
    gameState = 2;
}

function playerLimit(player) {
    if(player.y < 0) {
        player.y = 0
    } else if(player.y > fieldCords.height - player.height) {
        player.y = fieldCords.height -player.height;
    }
}

function playersMoveController() {
    p1.y +=p1.speed;
    p2.y +=p2.speed;

    playerLimit(p1);
    playerLimit(p2);

    p1.update();    
    p2.update();
}

function ballMoveController() {
    ball.x +=ball.speedX;
    ball.y +=ball.speedY;
    ball.update();
}

function wallCollisionController() {
    if(ball.x < 0) {
        score.add2();
        ball.x = 0
        stopGame();
        return;

    } else if (ball.x > fieldCords.width - ball.width) {
        score.add1();
        ball.x = fieldCords.width - ball.width;
        stopGame();
        return;
    }

    if(ball.y < 0) {

        ball.y = 0
        ball.speedY = -ball.speedY;

    } else if (ball.y > fieldCords.height - ball.height) {

        ball.y = fieldCords.height - ball.height;
        ball.speedY = -ball.speedY;
    }
}

function playerCollisionController() {
    const player1Collision = {
        axis : ball.x < p1.x + p1.width,
        top : ball.y + ball.height > p1.y,
        bottom : ball.y < p1.y + p1.height,
    }

    const player2Collision = {
        axis : ball.x + ball.width > p2.x,
        top : ball.y + ball.height >p2.y,
        bottom : ball.y < p2.y + p2.height,
    }

    if(player1Collision.axis && player1Collision.top && player1Collision.bottom) {
        ball.speedX = -ball.speedX;
    }

    if(player2Collision.axis && player2Collision.top && player2Collision.bottom) {
        ball.speedX = -ball.speedX;
    }
}