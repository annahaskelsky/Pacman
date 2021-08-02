'use strict'
const WALL = '⬜';
const FOOD = '.';
const SUPER_FOOD = '🍬';
const CHERRY = '🍒';
const EMPTY = ' ';

var gBoard;
var gFoodCount;
var gGame = {
    score: 0,
    isOn: false
}

var gCherryInterval;

function init() {
    gBoard = buildBoard();
    gFoodCount = 60;
    createPacman(gBoard);
    createGhosts(gBoard);
    printMat(gBoard, '.board-container')
    gGame.isOn = true;
    gGame.score = 0;
    var elSpan = document.querySelector('h2 span');
    elSpan.innerText = gGame.score;
    var elModal = document.querySelector('.modal');
    elModal.style.display = 'none';
    gCherryInterval = setInterval(addCherry, 15000);
    console.log(gFoodCount);
}

function buildBoard() {
    var SIZE = 10;
    var board = [];
    for (var i = 0; i < SIZE; i++) {
        board.push([]);
        for (var j = 0; j < SIZE; j++) {
            board[i][j] = FOOD;
            if (i === 0 || i === SIZE - 1 ||
                j === 0 || j === SIZE - 1 ||
                (j === 3 && i > 4 && i < SIZE - 2)) {
                board[i][j] = WALL;
            }
            if ((i === 1 && j === 1) || (i === SIZE - 2 && j === 1) ||
                (i === 1 && j === SIZE - 2) || (i === SIZE - 2 && j === SIZE - 2)) {
                board[i][j] = SUPER_FOOD;
            }
        }
    }
    return board;
}

function updateScore(diff) {
    gGame.score += diff;
    document.querySelector('h2 span').innerText = gGame.score
}

function addCherry() {
    var location = getEmptyCell();
    // Model
    gBoard[location.i][location.j] = CHERRY;
    // DOM
    renderCell(location, CHERRY);
}

function closeModal() {
    var elModal = document.querySelector('.modal');
    elModal.style.display = 'none';
}

function gameOver(trigger) {
    gGame.isOn = false;
    clearInterval(gIntervalGhosts);
    clearInterval(gCherryInterval);
    var elModal = document.querySelector('.modal');
    var elModalContent = document.querySelector('.modal p');
    var msg = (trigger === 'win') ? 'YOU WIN!' : 'GAME OVER';
    elModalContent.innerText = msg;
    elModal.style.display = 'block';
}

