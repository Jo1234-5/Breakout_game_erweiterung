

const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

let ballRadius;
let x;
let y;
let dx;
let dy;
let paddleHeight = 10;
let paddleWidth = 75;
let paddleX = (canvas.width - paddleWidth) / 2;
let rightPressed = false;
let leftPressed = false;
let brickRowCount;
let brickColumnCount;
let brickWidth;
let brickHeight;
let brickPadding = 10;
let brickOffsetTop = 30;
let brickOffsetLeft = 50;
let score = 0;
let lives = "-";
let speed;
let color;
let difficulty = "easy";
let bricks = [];
let startTime = Date.now();
let effect;
let playerNameInput = document.getElementById("playerName");
let startGameButton = document.getElementById("startGame");
let playerName;

startGameButton.addEventListener("click", () => {
    playerName = playerNameInput.value;
    if (playerName.trim() !== "") {
        playerNameInput.disabled = true;
        startGameButton.disabled = true;
        setDifficulty(difficulty);
    }
});

const easyBtn = document.getElementById("easyBtn");
const mediumBtn = document.getElementById("mediumBtn");
const hardBtn = document.getElementById("hardBtn");

easyBtn.addEventListener("click", () => {
    setDifficulty("easy");
});

mediumBtn.addEventListener("click", () => {
    setDifficulty("medium");
});

hardBtn.addEventListener("click", () => {
    setDifficulty("hard");
});

function setDifficulty(difficulty) {
    let color = "#0095DD";
    switch (difficulty) {
        case "easy":
            ballRadius = 10;
            brickRowCount = 4;
            brickColumnCount = 4;
            brickWidth = 90;
            brickHeight = 25;
            brickPadding = 20;
            paddleHeight = 15;
            brickOffsetTop = 30 + paddleHeight + brickPadding;
            paddleWidth = 100;
            lives = 3;
            speed = 1;
            break;
        case "medium":
            ballRadius = 8;
            brickRowCount = 6;
            brickColumnCount = 6;
            brickWidth = 70;
            brickHeight = 20;
            brickPadding = 10;
            brickOffsetTop = 30 + paddleHeight + brickPadding;
            brickOffsetLeft = 15;
            paddleHeight = 12;
            paddleWidth = 80;
            lives = 2;
            speed = 2;
            break;
        case "hard":
            ballRadius = 6;
            brickRowCount = 8;
            brickColumnCount = 8;
            brickWidth = 60;
            brickHeight = 15;
            brickPadding = 5;
            brickOffsetTop = 30 + paddleHeight + brickPadding;
            brickOffsetLeft = 0;
            paddleHeight = 10;
            paddleWidth = 60;
            lives = 1;
            speed = 3;
            break;
        default:
            console.error("Invalid difficulty");
            return;
    }

    x = canvas.width / 2;
    y = canvas.height - 30;
    dx = 2;
    dy = -2;
    paddleX = (canvas.width - paddleWidth) / 2;
    rightPressed = false;
    leftPressed = false;
    score = 0;
    bricks = [];
    for (let c = 0; c < brickColumnCount; c++) {
        bricks[c] = [];
        for (let r = 0; r < brickRowCount; r++) {
            bricks[c][r] = { x: 0, y: 0, status: 1, effect: "normal" };
        }
    }

    draw();
}

function drawBricks() {
    for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
            if (bricks[c][r].status === 1 && bricks[c][r].effect !== "none") {
                const brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
                const brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = color;
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    if (lives == 0) {
        ctx.fillStyle = "antiquewhite";
    } else {
        ctx.fillStyle = "#0095DD";
    }
    ctx.fill();
    ctx.closePath();
}

function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Score: " + score, 8, 20);
}

function drawLives() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    if (lives <= 0) {
        lives == 0;
    }
    ctx.fillText("Leben: " + lives, canvas.width - 80, 20);
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPaddle();
    drawBricks();
    drawBall();
    drawLives();
    drawTime();
    drawHighscore();
    drawScore();
    collisionDetection();

    if (rightPressed && paddleX < canvas.width - paddleWidth) {
        paddleX += 7;
    } else if (leftPressed && paddleX > 0) {
        paddleX -= 7;
    }

    x += dx;
    y += dy;

    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        //playSound();
        dx = -dx;
    }
    if (y + dy < ballRadius) {
        //playSound();
        dy = -dy;
    } else if (y + dy > canvas.height - ballRadius) {
        if (x > paddleX && x < paddleX + paddleWidth) {
            //playSound();
            dy = -dy;
        } else {
            lives--;
            drawLives();
            if (lives <= 0) {
                lives = 0;
                drawLives();
                displayGameOverMessage();
                DrawRemovedBricks();
                return; // Das Spiel ist vorbei, keine Aktualisierung mehr notwendig
            } else {
                x = canvas.width / 2;
                y = canvas.height - 30;
                dx = 2;
                dy = -2;
                paddleX = (canvas.width - paddleWidth) / 2;
            }
        }
    }

    if (score === brickRowCount * brickColumnCount) {
        displayWinMessage();
        DrawRemovedBricks();
        return; // Das Spiel ist vorbei, keine Aktualisierung mehr notwendig
    }

    requestAnimationFrame(draw);
}


// 'function playSound() {
//     const audio = new Audio('Sound/jump.wav');
//     audio.play();
// }'

function keyDownHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight") {
        rightPressed = true;
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight") {
        rightPressed = false;
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
        leftPressed = false;
    }
}

function mouseMoveHandler(e) {
    const relativeX = e.clientX - canvas.offsetLeft;
    if (relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX - paddleWidth / 2;
    }
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);

function Sleep(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}

let words = ['normal', 'speed', 'normal', 'slow', 'normal', 'extra-life', 'normal'];

function collisionDetection() {
    for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
            const b = bricks[c][r];
            if (b.status === 1) {
                if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
                    dy = -dy;
                    //playSoundCollect();

                    const randomIndex = Math.floor(Math.random() * words.length);
                    effect = words[randomIndex];
                    b.status = 0; // Setze den Status des getroffenen Bricks auf 0, um ihn als getroffen zu markieren
                    score++;

                    if (score === brickRowCount * brickColumnCount) {
                        displayWinMessage();
                        DrawRemovedBricks();
                    }
                }
            }
        }
    }
}


// function playSoundCollect() {
//     var sounds = [
//         'Sound/coin.mp3',
//     ];
//     var randomIndex = Math.floor(Math.random() * sounds.length);
//     var randomSound = sounds[randomIndex];
//     const audio = new Audio(randomSound);
//     audio.play();
// }

function getTimeElapsed() {
    return Math.floor((Date.now() - startTime) / 1000);
}

function drawTime() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    const timeElapsed = getTimeElapsed();
    const timeString = `Spielzeit: ${timeElapsed} s`;
    const textWidth = ctx.measureText(timeString).width;
    ctx.fillText(timeString, canvas.width / 2 - textWidth / 2, 20);
}

function displayWinMessage() {
    ctx.font = "30px Arial";
    ctx.fillStyle = "green";
    ctx.fillText("Gratulation Sie haben gewonnen", canvas.width / 2 - 100, canvas.height / 2);
    alert("Gratulation! Sie haben gewonnen");
    saveHighscore(playerName, score);
    displayHighscore();
}

function displayGameOverMessage() {
    ctx.font = "30px Arial";
    ctx.fillStyle = "red";
    ctx.fillText("Game Over", canvas.width / 2 - 100, canvas.height / 2);
    saveHighscore(playerName, score);
    displayHighscore();
}

function saveHighscore(playerName, score) {
    
    const apiUrl = 'http://localhost:3000/saveHighscore'; 
    fetch('http://localhost:3000/saveHighscore', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ playerName, score }),
    })
        .then((response) => response.json())
        .then((data) => {
            console.log(data.message); // Serverantwort anzeigen
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

function displayHighscore() {
    const apiUrl = 'http://localhost:3000/getHighscores'; //. ist dieses Verzeichnis
    fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
            
            console.log('Highscores:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

function drawHighscore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";

    // Abrufen des Highscores vom Server
     fetch('http://localhost:3000/getHighscores')
      .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
             }
             return response.json();
        })
        .then((highscores) => { 
            if (highscores.length >= 1) {
                console.log("test" + highscores[0].score)
                const topHighscore = highscores[0].score;
                const highscoreText = "Highscore: " + topHighscore;
                ctx.fillText(highscoreText, canvas.width - 108, 40);
            } else {
                // Keine Highscores vorhanden
                ctx.fillText("Highscore: 0", canvas.width - 108, 40);
            }

            // Hier können Sie die Highscore-Liste erstellen und anzeigen
            const highscoreList = document.getElementById("highscore-list");
            highscoreList.innerHTML = ""; // Löschen Sie vorherige Einträge
            //Die bestenliste wird immer am ende der Runde vollständig angezeigt
            // Zeige die Top-5-Spieler an, wobei der aktuelle Highscore-Träger an erster Stelle steht, kann auch erhöht werden
            for (let i = 0; i < Math.min(5, highscores.length)-1; i++)
             {
                const row = document.createElement("tr");
                row.innerHTML = `
                <td>${i + 1}</td>
                <td>${highscores[i].playerName}</td>
                <td>${highscores[i].score}</td>
        `;
        highscoreList.appendChild(row);
    }
        })
        .catch((error) => {
            console.error('Fehler beim Abrufen des Highscores:', error);
            
        });
}




function DrawRemovedBricks() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
   
}

draw();
