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

let activeCards = [];

let moves = 0;



document.addEventListener("DOMContentLoaded", function(event) { 
    startGame();

    function startGame() {
        let cardDeck = document.querySelector('.deck');
        let cardHTML = shuffle(deck).map(function(card){
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


    let cards = document.querySelectorAll('.card');
    let moveCount = document.querySelector('.moves');
    let stars = document.querySelectorAll('.fa-star');
    let restartButton = document.querySelector('.restart');


    

    cards.forEach(function(card) {
        card.addEventListener("click", function(event) {
            if (!card.classList.contains('open') && !card.classList.contains('show') && !card.classList.contains('match')) {
                card.classList.add('open', 'show');
                activeCards.push(card);
                moves = moves + 1;
                moveCount.innerText = moves;
                if ((activeCards.length === 2) && (activeCards[0].childNodes[0].className === activeCards[1].childNodes[0].className)){
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
    // restartButton.addEventListener("click", function(){
    //     cards.classList.remove('open', 'show', 'match');
    // });
    
});


