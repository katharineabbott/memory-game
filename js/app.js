/*
* Create a list that holds all of your cards
*/

let deck = ["fa fa-diamond", "fa fa-diamond", 
"fa fa-paper-plane-o", "fa fa-paper-plane-o", 
"fa fa-anchor", "fa fa-anchor", 
"fa fa-bolt", "fa fa-bolt", 
"fa fa-cube", "fa fa-cube", 
"fa fa-leaf", "fa fa-leaf", 
"fa fa-bicycle", "fa fa-bicycle", 
"fa fa-bomb", "fa fa-bomb"];


/*
* Display the cards on the page
*   - shuffle the list of cards using the provided "shuffle" method below
*   - loop through each card and create its HTML
*   - add each card's HTML to the page
*/

// Shuffle function from http://stackoverflow.com/a/2450976
// function shuffle(array) {
//     var currentIndex = array.length, temporaryValue, randomIndex;

//     while (currentIndex !== 0) {
//         randomIndex = Math.floor(Math.random() * currentIndex);
//         currentIndex -= 1;
//         temporaryValue = array[currentIndex];
//         array[currentIndex] = array[randomIndex];
//         array[randomIndex] = temporaryValue;
//     }

//     return array;
// }


/*
* set up the event listener for a card. If a card is clicked:
*  - display the card's symbol (put this functionality in another function that you call from this one)
*  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
*  - if the list already has another card, check to see if the two cards match
*    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
*    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
*    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
*    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
*/

let cards = document.querySelectorAll('.card');
let activeCards = [];
let moves = 0;
let moveCount = document.querySelector('.moves');
let stars = document.querySelectorAll('.fa-star');

function startGame () {

}

//startGame();

document.addEventListener("DOMContentLoaded", function(event) { 
    cards.forEach(function(card) {
        card.addEventListener("click", function(event) {
            if (!card.classList.contains('open') && !card.classList.contains('show') && !card.classList.contains('match')) {
                card.classList.add('open', 'show');
                activeCards.push(card);
                moves = moves + 1;
                moveCount.innerText = moves;
                if ((activeCards.length === 2) && (activeCards[0].childNodes[1].className === activeCards[1].childNodes[1].className)){
                    activeCards.forEach(function(card) {
                        card.classList.remove('open', 'show');
                        card.classList.add('match');
                    });
                }
                if (activeCards.length === 2) {
                    setTimeout(function() {
                        activeCards.forEach(function(card) {
                            card.classList.remove('open', 'show');
                        });
                        activeCards = [];
                    }, 350);   
                } 
                if (moves > 40) {
                    stars[0].classList.remove('fa-star');
                    stars[0].classList.add('fa-star-o');
                } else if (moves > 20) {
                    stars[1].classList.remove('fa-star');
                    stars[1].classList.add('fa-star-o');
                } else if (moves > 12) {
                    stars[2].classList.remove('fa-star');
                    stars[2].classList.add('fa-star-o');
                } 
                else {

                }
                if ((cards[0].classList.contains('match')) && (cards[1].classList.contains('match')) && (cards[2].classList.contains('match')) && (cards[3].classList.contains('match')) && (cards[4].classList.contains('match')) && (cards[5].classList.contains('match')) && (cards[6].classList.contains('match')) && (cards[7].classList.contains('match')) && (cards[8].classList.contains('match')) && (cards[9].classList.contains('match')) && (cards[10].classList.contains('match')) && (cards[11].classList.contains('match')) && (cards[12].classList.contains('match')) && (cards[13].classList.contains('match')) && (cards[14].classList.contains('match')) && (cards[15].classList.contains('match'))) {
                    alert("game won!");
                }
            }  
        });
    });
});


