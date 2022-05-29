let turnX;
let gameState = [, , , , , , , , ]
let gameStart = false;
let gameOver = false;
let turn = 0    
let player = 'o';
let p1Score = 0;
let p2Score = 0;

const modalParent = document.querySelector('.modal-parent');
const modalStart = document.getElementById('modal-start');
const modalWinner = document.getElementById('modal-winner');
const startButton = document.getElementById('start-game');
const replayButton = document.getElementById('replay-game');
const modalWinnertxt = document.getElementById('modal-winner-text')

const playNoughts = document.getElementById('play1');
const playCrosses = document.getElementById('play2');

const cells = document.querySelectorAll('[class="gamecell"]')

startButton.addEventListener('click', startTheGame);
replayButton.addEventListener('click', resetGame);


playCrosses.addEventListener('click', setPlayer);
playNoughts.addEventListener('click', setPlayer);

cells.forEach(cell => {cell.addEventListener('click', clickedCell)});

const Player = (name, id) => {
    const getName = () => name;
    const getId = () => id;

    return {getName, getId};
}

function startTheGame() {
        gameStart = true;
        modalParent.classList.add('modal-hide')
        playNoughts.classList.add('blinking')
        playCrosses.classList.add('blinking')
}

function resetGame() {
    console.log('reset')
    gameOver = false;
    
    gameState = [, , , , , , , , ];
    turn++
    modalParent.classList.add('modal-hide');
    startTheGame()
}

function setPlayer(e) {
    playNoughts.classList.remove('blinking')
    playCrosses.classList.remove('blinking')
    if (e.target.id == 'play1') {
        player = Player('player 1', 'O');
        turnX = false
    }
    if (e.target.id == 'play2') {
        player = Player('player 2', 'X');
        turnX = true
    }

    cells.forEach(cell => {cell.innerHTML = ''})
    gameState = [, , , , , , , , ]

    return player
}

function startGame(e) {
    const isVisible = "is-visible";

    
    const modalId = this.dataset.open;
    const modal = document.getElementById(modalId)
    
    modal.classList.add(isVisible);
    
    modal.addEventListener('click', function(e) {
        if (e.target == modal)
        modal.classList.remove(isVisible)
    });

    
}



function clickedCell(e) {
    let symbol = 'O'
    if (turnX) {
        symbol = 'X'
    }
    cell = document.querySelector(`[data-id=${e.target.dataset.id}]`);

    if (cell.innerText == '') {
        addSymbol(cell, symbol)
    if (checkWinner(symbol)) {
        modalWinnertxt.innerHTML = `<div id="modal-text">The winner is... ${symbol}'s!</div>`
        modalParent.classList.remove('modal-hide');
        modalStart.className = 'modal-hide';
        modalWinner.className = 'modal-show modal-text';
        gameOver = true
        if (symbol == 'x') {
            p2Score++} else {p1Score++}
        }
        
    }

    turnX = !turnX
    }
    




function addSymbol (cell, symbol) {
    
    let index = cell.dataset.id[4] - 1
    gameState[index] = symbol
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
            return cells[i].innerText == symbol
        })
    })

}
