let character;
let obstacles;
let coins;
let score = 0;
let gameInterval;
let obstacleSpeed = 5;
let coinSpeed = 4;
const characterWidth = 50;
const obstacleWidth = 50;
const coinWidth = 30;

function startGame() {
    character = document.getElementById('character');
    obstacles = document.getElementById('obstacles');
    coins = document.getElementById('coins');
    score = 0;
    document.getElementById('score').textContent = `Score: ${score}`;
    document.addEventListener('keydown', moveCharacter);
    gameInterval = setInterval(gameLoop, 20);
    createObstacles();
    createCoins();
}

function moveCharacter(event) {
    const left = parseInt(window.getComputedStyle(character).getPropertyValue('left'));
    if (event.key === 'ArrowUp' && left < window.innerWidth - characterWidth - 10) {
        character.style.left = `${left + 10}px`;
    }
    if (event.key === 'ArrowDown' && left > 10) {
        character.style.left = `${left - 10}px`;
    }
}

function createObstacles() {
    setInterval(() => {
        const obstacle = document.createElement('div');
        obstacle.classList.add('obstacle');
        obstacle.style.top = '0px';
        obstacle.style.left = `${Math.random() * (window.innerWidth - obstacleWidth)}px`;
        obstacles.appendChild(obstacle);
    }, 2000);
}

function createCoins() {
    setInterval(() => {
        const coin = document.createElement('div');
        coin.classList.add('coin');
        coin.style.top = '0px';
        coin.style.left = `${Math.random() * (window.innerWidth - coinWidth)}px`;
        coins.appendChild(coin);
    }, 1000);
}

function gameLoop() {
    const obstaclesArray = document.querySelectorAll('#obstacles .obstacle');
    const coinsArray = document.querySelectorAll('#coins .coin');

    obstaclesArray.forEach(obstacle => {
        let top = parseInt(window.getComputedStyle(obstacle).getPropertyValue('top'));
        if (top > window.innerHeight) {
            obstacle.remove();
        } else {
            obstacle.style.top = `${top + obstacleSpeed}px`;
            if (checkCollision(obstacle, character)) {
                gameOver();
            }
        }
    });

    coinsArray.forEach(coin => {
        let top = parseInt(window.getComputedStyle(coin).getPropertyValue('top'));
        if (top > window.innerHeight) {
            coin.remove();
        } else {
            coin.style.top = `${top + coinSpeed}px`;
            if (checkCollision(coin, character)) {
                score += 10;
                document.getElementById('score').textContent = `Score: ${score}`;
                coin.remove();
            }
        }
    });
}

function checkCollision(element1, element2) {
    const rect1 = element1.getBoundingClientRect();
    const rect2 = element2.getBoundingClientRect();
    return !(rect1.right < rect2.left || 
             rect1.left > rect2.right || 
             rect1.bottom < rect2.top || 
             rect1.top > rect2.bottom);
}

function gameOver() {
    clearInterval(gameInterval);
    document.removeEventListener('keydown', moveCharacter);
    alert('Game Over! Your score: ' + score);
}

function resetGame() {
    obstacles.innerHTML = '';
    coins.innerHTML = '';
    startGame();
}


 