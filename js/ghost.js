'use strict'
const GHOST = '&#9781;';
var GHOST_IMG = '<img src="img/1.png" />';

var gGhosts = []
var gIntervalGhosts;

function createGhost(board, id) {
    var ghost = {
        location: {
            i: 3,
            j: 3
        },
        currCellContent: FOOD,
        src: `<img src="img/${id}.png" />`
    }
    gGhosts.push(ghost);
    board[ghost.location.i][ghost.location.j] = GHOST;
}

function createGhosts(board) {
    gGhosts = [];
    createGhost(board, 1);
    createGhost(board, 2);
    createGhost(board, 3);
    gIntervalGhosts = setInterval(moveGhosts, 1000);
}

function moveGhosts() {
    for (var i = 0; i < gGhosts.length; i++) {
        var ghost = gGhosts[i];
        moveGhost(ghost);
    }
}

function moveGhost(ghost) {
    var moveDiff = getMoveDiff();
    var nextLocation = {
        i: ghost.location.i + moveDiff.i,
        j: ghost.location.j + moveDiff.j
    }
    var nextCell = gBoard[nextLocation.i][nextLocation.j]
    if (nextCell === WALL) return;
    if (nextCell === GHOST) return;
    if (nextCell === PACMAN) {
        if (!gPacman.isSuper) {
            gameOver();
            return;
        }
    }

    // model
    gBoard[ghost.location.i][ghost.location.j] = ghost.currCellContent
    // dom
    var charToRender = ghost.currCellContent === PACMAN ? EMPTY : ghost.currCellContent;
    renderCell(ghost.location, charToRender)

    // model
    ghost.location = nextLocation;
    ghost.currCellContent = gBoard[ghost.location.i][ghost.location.j]
    gBoard[ghost.location.i][ghost.location.j] = GHOST;
    // dom
    var src = gPacman.isSuper ? '<img src="img/scared.png" />' : ghost.src;
    renderCell(ghost.location, src);
}

function getMoveDiff() {
    var randNum = getRandomNum(0, 100);
    if (randNum < 25) {
        return { i: 0, j: 1 }
    } else if (randNum < 50) {
        return { i: -1, j: 0 }
    } else if (randNum < 75) {
        return { i: 0, j: -1 }
    } else {
        return { i: 1, j: 0 }
    }
}


// function getGhostHTML(ghost) {
//     return `<span>${GHOST}</span>`
// }