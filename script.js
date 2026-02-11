const cardsData = [
    "Beba Água 💧", "Beba Água 💧",
    "Use Protetor ☀️", "Use Protetor ☀️",
    "Não Dirija 🚗", "Não Dirija 🚗",
    "Cuide dos Amigos 👯", "Cuide dos Amigos 👯"
];

const gameBoard = document.getElementById("gameBoard");
const timerElement = document.getElementById("timer");
const scoreElement = document.getElementById("score");
const victoryMessage = document.getElementById("victoryMessage");

let firstCard = null;
let secondCard = null;
let lockBoard = false;
let score = 0;
let timer = 0;
let interval;
let matchedPairs = 0;

const matchSound = new Audio("https://assets.mixkit.co/sfx/preview/mixkit-achievement-bell-600.mp3");
const winSound = new Audio("https://assets.mixkit.co/sfx/preview/mixkit-winning-chimes-2015.mp3");

function shuffle(array) {
    return array.sort(() => 0.5 - Math.random());
}

function startTimer() {
    interval = setInterval(() => {
        timer++;
        timerElement.innerText = timer;
    }, 1000);
}

function createBoard() {
    gameBoard.innerHTML = "";
    shuffle(cardsData).forEach(text => {
        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
            <div class="front">${text}</div>
            <div class="back">🎭</div>
        `;

        card.dataset.value = text;
        card.addEventListener("click", flipCard);
        gameBoard.appendChild(card);
    });
}

function flipCard() {
    if (lockBoard || this.classList.contains("flip")) return;

    this.classList.add("flip");

    if (!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;
    checkMatch();
}

function checkMatch() {
    if (firstCard.dataset.value === secondCard.dataset.value) {
        matchSound.play();
        firstCard.classList.add("matched");
        secondCard.classList.add("matched");
        score += 10;
        matchedPairs++;
        scoreElement.innerText = score;

        if (matchedPairs === cardsData.length / 2) {
            clearInterval(interval);
            winSound.play();
            victoryMessage.style.display = "block";
        }

        resetTurn();
    } else {
        lockBoard = true;
        setTimeout(() => {
            firstCard.classList.remove("flip");
            secondCard.classList.remove("flip");
            resetTurn();
        }, 1000);
    }
}

function resetTurn() {
    firstCard = null;
    secondCard = null;
    lockBoard = false;
}

function restartGame() {
    clearInterval(interval);
    timer = 0;
    score = 0;
    matchedPairs = 0;
    timerElement.innerText = 0;
    scoreElement.innerText = 0;
    victoryMessage.style.display = "none";
    createBoard();
    startTimer();
}

createBoard();
startTimer();
