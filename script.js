// Smooth scrolling effect
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});



// Your existing script.js

// Memory Matching Game

let memoryGame = {
    cards: ['A', 'B', 'C', 'D', 'A', 'B', 'C', 'D'],
    shuffledCards: [],
    flippedCards: [],
};

function startGame() {
    memoryGame.shuffledCards = shuffleArray(memoryGame.cards);
    createBoard();
}

function createBoard() {
    const memoryBoard = document.getElementById('memory-board');
    memoryBoard.innerHTML = '';

    memoryGame.shuffledCards.forEach((card, index) => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('memory-card');
        cardElement.dataset.index = index;
        cardElement.addEventListener('click', flipCard);
        memoryBoard.appendChild(cardElement);
    });
}

function flipCard() {
    const selectedCard = this;
    const index = selectedCard.dataset.index;

    if (memoryGame.flippedCards.length < 2 && !memoryGame.flippedCards.includes(index)) {
        selectedCard.textContent = memoryGame.shuffledCards[index];
        selectedCard.classList.add('active');
        memoryGame.flippedCards.push(index);

        if (memoryGame.flippedCards.length === 2) {
            setTimeout(checkMatch, 500);
        }
    }
}

function checkMatch() {
    const [card1, card2] = memoryGame.flippedCards;
    const cardElements = document.querySelectorAll('.memory-card');

    if (memoryGame.shuffledCards[card1] === memoryGame.shuffledCards[card2]) {
        // Match
        cardElements[card1].removeEventListener('click', flipCard);
        cardElements[card2].removeEventListener('click', flipCard);
    } else {
        // No match
        cardElements[card1].textContent = '';
        cardElements[card2].textContent = '';
        cardElements[card1].classList.remove('active');
        cardElements[card2].classList.remove('active');
    }

    memoryGame.flippedCards = [];
}
