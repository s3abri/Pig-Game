/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/


var scores = [0,0];
var roundScore = 0;
var activePlayer = 0;

document.querySelector('.dice').style.display = 'none';

document.getElementsById('score-0').textContent = '0';
document.getElementsById('score-1').textContent = '0';
document.getElementsById('current-0').textContent = '0';
document.getElementsById('current-1').textContent = '0';

document.querySelector('.btn-roll').addEventListener('click', function() {

    // 1. Create a dice random number
    var dice = Math.floor(Math.random() * 6) + 1;

    // 2. Display the result
    var diceDOM = document.querySelector('.dice');
    diceDOM.style.display = 'block';
    diceDOM.src = 'dice-' + doce + '.png';

    //3. Update the round score IF the rolled number was not 1
    if (dice !== 1) {
        roundScore += dice;
        document.querySelector('#current-' + activePlayer).textContent = roundScore;
    } else {
       //Next Player
       nextPlayer();
    }
});


document.querySelector('.btn-hold').addEventListener('click', function() {
    
    //1. Add current score to global score
    scores[activePlayer] += roundScore;

    //2. Update the UI
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

    //3. Check if player won the game
    if (scores[activePlayer] >= 100) {
        //Player won the Game
        document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
        document.querySelector('.dice').style.display = 'none';
        document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
        document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
    } else {
        //Next Player
        nextPlayer();

    }
});

//Every time the current score = 1 it's the next player turn
//Also Every time the player holdes it's the next player turn
//So we implement the same logic in order to the  DRY principle
function nextPlayer(){
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
        roundScore = 0;
        
        document.getElementById('current-0').textContent = 0;
        document.getElementById('current-1').textContent = 0;

        document.querySelector('.player-0-panel').classList.toggle('active');
        document.querySelector('.player-1-panel').classList.toggle('active');

        document.querySelector('.dice').style.display = none;
}