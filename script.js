const cardsArray = [
    "Beba Água 💧",
    "Beba Água 💧",
    "Use Protetor ☀️",
    "Use Protetor ☀️",
    "Não Dirija 🚗",
    "Não Dirija 🚗",
    "Cuide dos Amigos 👯",
    "Cuide dos Amigos 👯"
];

let gameBoard = document.getElementById("gameBoard");
let firstCard = null;
let secondCard = null;
let lockBoard = false;

function shuffle(array) {
    return array.sort(() => 0.5 - Math.random());
}

function createBoard() {
    gameBoard.innerHTML = "";
    let shuffledCards = shuffle(cardsArray);

    shuffledCards.forEach(text => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.dataset.value = text;
        card.innerText = "🎭";

        card.addEventListener("click", flipCard);

        gameBoard.appendChild(card);
    });
}

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add("flipped");
    this.innerText = this.dataset.value;

    if (!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;
    checkMatch();
}

function checkMatch() {
    if (firstCard.dataset.value === secondCard.dataset.value) {
        firstCard.classList.add("matched");
        secondCard.classList.add("matched");
        resetTurn();
    } else {
        lockBoard = true;
        setTimeout(() => {
            firstCard.classList.remove("flipped");
            secondCard.classList.remove("flipped");
            firstCard.innerText = "🎭";
            secondCard.innerText = "🎭";
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
    resetTurn();
    createBoard();
}

createBoard();

