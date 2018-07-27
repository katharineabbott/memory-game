const deck = ["fa fa-diamond", "fa fa-diamond",
    "fa fa-paper-plane-o", "fa fa-paper-plane-o",
    "fa fa-anchor", "fa fa-anchor",
    "fa fa-bolt", "fa fa-bolt",
    "fa fa-cube", "fa fa-cube",
    "fa fa-leaf", "fa fa-leaf",
    "fa fa-bicycle", "fa fa-bicycle",
    "fa fa-bomb", "fa fa-bomb"];
let activeCards = [];
let moves = 0;
let time = 0;
let elapsedTime = 0;
let finalStars = 3;
let finalMoves = 0;

document.addEventListener("DOMContentLoaded", function (event) {
    // shuffles deck and creates html for shuffled deck using generateCard function
    function startGame() {
        let cardDeck = document.querySelector('.deck');
        let cardHTML = shuffle(deck).map(function (card) {
            return generateCard(card);
        });
        cardDeck.innerHTML = cardHTML.join('');
    }

    function generateCard(card) {
        return `<li class="card"><i class="${card}"></i></li>`;
    }

    function shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;
        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        return array;
    }

    // updates classes on selected cards when they match
    function match() {
        activeCards.forEach(function (card) {
            card.classList.remove('open', 'show');
            card.classList.add('match');
        });
    }

    // updates classes on selected cards when they don't match after a slight
    // delay and, if the gameIsWon function results in true, triggers the congratulations popup
    function notMatch() {
        setTimeout(function () {
            activeCards.forEach(function (card) {
                card.classList.remove('open', 'show');
            });
            activeCards = [];
            let cards = document.querySelectorAll('.card');
            if (gameIsWon(cards)) {
                congratsPopup.classList.remove('hide');
                window.clearInterval(gameTimer);
                finalMoves = moves;
                movesCount.innerText = finalMoves;
                starsCount.innerText = finalStars;
                finalTime.innerText = timer.innerText;
            }
        }, 350);
    }

    // updates remaining stars based on move count
    function starRating() {
        if (moves > 80) {
            stars[0].classList.remove('fa-star');
            stars[0].classList.add('fa-star-o');
            finalStars = 0;
        } else if (moves > 40) {
            stars[1].classList.remove('fa-star');
            stars[1].classList.add('fa-star-o');
            finalStars = 1;
        } else if (moves > 20) {
            stars[2].classList.remove('fa-star');
            stars[2].classList.add('fa-star-o');
            finalStars = 2;
        }
    }

    // determines what to do with a card when it is clicked
    function cardClick(card) {
        if (!card.classList.contains('open') && !card.classList.contains('show') && !card.classList.contains('match')) {
            card.classList.add('open', 'show');
            activeCards.push(card);
            moves = moves +1;
            moveCount.innerText = Math.floor(moves/2);
            if ((activeCards.length === 2) && (activeCards[0].childNodes[0].className === activeCards[1].childNodes[0].className)) {
                match();
            }
            if (activeCards.length === 2) {
                notMatch();
            }
        }
    }

    // checks to see if all cards have the 'match' class
    function gameIsWon(cards) {
        return ((cards[0].classList.contains('match')) && (cards[1].classList.contains('match')) && (cards[2].classList.contains('match')) && (cards[3].classList.contains('match')) && (cards[4].classList.contains('match')) && (cards[5].classList.contains('match')) && (cards[6].classList.contains('match')) && (cards[7].classList.contains('match')) && (cards[8].classList.contains('match')) && (cards[9].classList.contains('match')) && (cards[10].classList.contains('match')) && (cards[11].classList.contains('match')) && (cards[12].classList.contains('match')) && (cards[13].classList.contains('match')) && (cards[14].classList.contains('match')) && (cards[15].classList.contains('match')))
    }

    // adds event listener which calls the cardClick and starRating functions
    function registerCards(cards) {
        cards.forEach(function (card) {
            card.addEventListener("click", function (event) {
                cardClick(card);
                starRating();
            });
        });
    }

    // this is the timer
    let gameTimer = setInterval(function incrementTimer() {
        let timer = document.querySelector('.timer');
        elapsedTime = elapsedTime + 1;
        const minute = Math.floor(elapsedTime / 60);
        const seconds = (elapsedTime % 60);
        if (elapsedTime % 60 <= 9) {
            timer.innerText = `${minute}:0${seconds}`;
        } else {
            timer.innerText = time.innerText = `${minute}:${seconds}`;
        }
    }, 1000);

    startGame();
    let cards = document.querySelectorAll('.card');
    registerCards(cards);

    let moveCount = document.querySelector('.moves');
    let stars = document.querySelectorAll('.fa-star');
    let restartButton = document.querySelector('.restart');
    let starsCount = document.querySelector('.star-count');
    let movesCount = document.querySelector('.move-count');
    let congratsPopup = document.querySelector('.winner');
    let playAgain = document.querySelector('.play-again');
    let timer = document.querySelector('.timer');
    let finalTime = document.querySelector('.time-count');

    // when the restart button is clicked this resets the timer, resets the star rating, and resets the card deck/board
    restartButton.addEventListener("click", function () {
        elapsedTime = -1;
        moves = 0;
        moveCount.innerText = moves;
        let cards = document.querySelectorAll('.card');
        cards.forEach(function (card) {
            card.classList.remove('open', 'show', 'match');
        });
        startGame();
        activeCards = []
        cards = document.querySelectorAll('.card');
        registerCards(cards);
        stars[0].classList.remove('fa-star-o');
        stars[0].classList.add('fa-star');
        stars[1].classList.remove('fa-star-o');
        stars[1].classList.add('fa-star');
        stars[2].classList.remove('fa-star-o');
        stars[2].classList.add('fa-star');
        finalStars = 3;
    });

    playAgain.addEventListener("click", function () {
        congratsPopup.classList.add('hide');
        elapsedTime = -1;
        gameTimer = setInterval(function incrementTimer() {
            elapsedTime = elapsedTime + 1;
            if (elapsedTime % 60 <= 9) {
                timer.innerText = Math.floor(elapsedTime / 60) + ":0" + (elapsedTime % 60);
            } else {
                timer.innerText = Math.floor(elapsedTime / 60) + ":" + (elapsedTime % 60);
            }
        }, 1000);
        moves = 0;
        moveCount.innerText = moves;
        let cards = document.querySelectorAll('.card');
        cards.forEach(function (card) {
            card.classList.remove('open', 'show', 'match');
        });
        startGame();
        cards = document.querySelectorAll('.card');
        registerCards(cards);
        stars[0].classList.remove('fa-star-o');
        stars[0].classList.add('fa-star');
        stars[1].classList.remove('fa-star-o');
        stars[1].classList.add('fa-star');
        stars[2].classList.remove('fa-star-o');
        stars[2].classList.add('fa-star');
        finalStars = 3;
    });
});