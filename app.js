var scores, roundScore, activePlayer, gamePlaying;

init();

document.querySelector('.btn-roll').addEventListener('click', function () {
    if (gamePlaying) {

        // 1. Create a dice random number
        var dice = Math.floor(Math.random() * 6) + 1;

        // 2. Display the result
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = './img/dice-' + dice + '.png';

        //3. Update the round score IF the rolled number was not 1
        if (dice !== 1) {
            roundScore += dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            //Next Player
            nextPlayer();
        }
    }
});


document.querySelector('.btn-hold').addEventListener('click', function () {
    if (gamePlaying) {
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
            gamePlaying = false;
        } else {
            //Next Player
            nextPlayer();

        }
    }
});

//Every time the current score = 1 it's the next player turn
//Also Every time the player holdes it's the next player turn
//So we implement the same logic in order to the  DRY principle
function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    document.getElementById('current-0').textContent = 0;
    document.getElementById('current-1').textContent = 0;

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    document.querySelector('.dice').style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click', init);

//Function to initalize (everything hapen before the game start)
function init() {

    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;

    document.querySelector('.dice').style.display = 'none';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.getElementById('name-0').textContent = 'Player1';
    document.getElementById('name-1').textContent = 'Player2';

    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}