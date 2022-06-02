const gameBoard = (() => {
    
    let turnX;
    let gameState = [, , , , , , , , ]
    let gameStart = false;
    let gameOver = false;
    let turn = 0;
    let round = 0;    
    let player = 'o';
    let p1Score = 0;
    let p2Score = 0;

    const modalParent = document.querySelector('.modal-parent');
    const modalStart = document.getElementById('modal-start');
    const modalWinner = document.getElementById('modal-winner');
    const startButton = document.getElementById('start-game');
    const replayButton = document.getElementById('replay-game');
    const modalWinnertxt = document.getElementById('modal-winner-text')
    const choosePlayerText = document.querySelector('.choose-player');
    const statsP1 = document.querySelector('.stats-p1');
    const statsP2 = document.querySelector('.stats-p2');
    const playNoughts = document.getElementById('play1');
    const playCrosses = document.getElementById('play2');
    const cells = document.querySelectorAll('[class="gamecell"]')

    startButton.addEventListener('click', startTheGame);
    replayButton.addEventListener('click', resetGame);
    playCrosses.addEventListener('click', setPlayer);
    playNoughts.addEventListener('click', setPlayer);


    cells.forEach(cell => {cell.addEventListener('click', clickedCell)});

    return {modalParent, modalStart, modalWinner, modalWinnertxt, 
            choosePlayerText, playCrosses, playNoughts, gameStart,
            gameOver, round, turn, turnX, cells, statsP1, statsP2, player,
            p1Score, p2Score}
})();



const Player = (name, id) => {
    let score = 0;
    const getName = () => name;
    const getId = () => id;
    const getScore = () => score;
    const winGame = () => {
        score++
        return score}

    return {getName, getId, getScore, winGame};
}


function startTheGame() {
        gameStart = true;
        gameBoard.modalParent.classList.add('modal-hide')
        gameBoard.playNoughts.classList.add('blinking')
        gameBoard.playCrosses.classList.add('blinking')
        gameBoard.round++
}

function resetGame() {
    
    gameBoard.gameOver = false;
    
    gameBoard.gameState = [, , , , , , , , ];
    
    gameBoard.modalParent.classList.add('modal-hide');
    startTheGame()
}




function setPlayer(e) {
    gameBoard.turn = 0;
    gameBoard.playNoughts.classList.remove('blinking')
    gameBoard.playCrosses.classList.remove('blinking')
    gameBoard.choosePlayerText.innerHTML = `-- Round ${gameBoard.round} --`
    if (e.target.id == 'play1') {
        player = Player('player 1', 'O');
        turnX = false
    }
    if (e.target.id == 'play2') {
        player = Player('player 2', 'X');
        turnX = true
    }

    gameBoard.cells.forEach(cell => {cell.innerHTML = ''})
    gameBoard.gameState = [, , , , , , , , ]

    return player
}



function clickedCell(e) {
    let symbol = 'O'
    if (turnX) {
        symbol = 'X'
    }
    let cell = document.querySelector(`[data-id=${e.target.dataset.id}]`);

    if (cell.innerText == '') {
        addSymbol(cell, symbol)
    
    
    if (checkWinner(symbol)) {
        gameBoard.modalWinnertxt.innerHTML = `<div id="modal-text">The winner is... ${symbol}'s!</div>`
        gameBoard.modalParent.classList.remove('modal-hide');
        gameBoard.modalStart.className = 'modal-hide';
        gameBoard.modalWinner.className = 'modal-show modal-text';
        gameBoard.gameOver = true
        if (symbol == 'X') {
            gameBoard.p2Score++} else {gameBoard.p1Score++}
        gameBoard.statsP1.innerHTML = `Noughts: ${gameBoard.p1Score}`;
        gameBoard.statsP2.innerHTML = `Crosses: ${gameBoard.p2Score}`;
        }
        
    }

    turnX = !turnX;
    gameBoard.turn++;

    if (gameBoard.turn == 9) {
        gameBoard.modalWinnertxt.innerHTML = `<div id="modal-text">Looks like it's a draw!</div>`
        gameBoard.modalParent.classList.remove('modal-hide');
        gameBoard.modalStart.className = 'modal-hide';
        gameBoard.modalWinner.className = 'modal-show modal-text';
        gameBoard.gameOver = true
    }


    }
    




function addSymbol (cell, symbol) {
    
    let index = cell.dataset.id[4] - 1
    gameBoard.gameState[index] = symbol
    cell.innerHTML = symbol;
    
}

function checkWinner(symbol) {
    const winningCombinations = [[0, 1, 2],
                                [3, 4, 5],
                                [6, 7, 8],
                                [0, 3, 6],
                                [1, 4, 7],
                                [2, 5, 8],
                                [0, 4, 8],
                                [2, 4, 6],]

    return winningCombinations.some((combination) => {
        return combination.every((i) => {
            return gameBoard.cells[i].innerText == symbol
        })
    })

}
