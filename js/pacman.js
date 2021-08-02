'use strict'
const PACMAN = '😷';
var PACMAN_IMG = '<img src="img/pacman.png" class="pacman" />';

var gKilledGhosts = [];

var gPacman;
function createPacman(board) {
    gPacman = {
        location: {
            i: 3,
            j: 5
        },
        isSuper: false
    }
    board[gPacman.location.i][gPacman.location.j] = PACMAN;
}

function movePacman(ev) {

    if (!gGame.isOn) return;
    // console.log('ev', ev);
    var nextLocation = getNextLocation(ev);

    if (!nextLocation) return;
    // console.log('nextLocation', nextLocation);

    var nextCell = gBoard[nextLocation.i][nextLocation.j]
    // console.log('NEXT CELL', nextCell);

    if (nextCell === WALL) return;

    else if (nextCell === FOOD) {
        updateScore(1);
        gFoodCount--;
        console.log(gFoodCount);
        if (!gFoodCount) gameOver('win');
    }

    else if (nextCell === GHOST) {
        if (!gPacman.isSuper) {
            gameOver('lose');
            renderCell(gPacman.location, EMPTY)
            return;
        } else {
            for (var i = 0; i < gGhosts.length; i++) {
                var ghost = gGhosts[i];
                if (ghost.location.i === nextLocation.i && ghost.location.j === nextLocation.j) {
                    var killedGhost = gGhosts.splice(i, 1)[0];
                    gKilledGhosts.push(killedGhost);
                }
            }
        }
    } else if (nextCell === CHERRY) updateScore(10);

    else if (nextCell === SUPER_FOOD) {
        if (gPacman.isSuper) return;
        gPacman.isSuper = true;
        gFoodCount--;
        console.log(gFoodCount);
        if (!gFoodCount) gameOver('win');

        for (var i = 0; i < gGhosts.length; i++) {
            var ghost = gGhosts[i];
            renderCell(ghost.location, '<img src="img/scared.png" />')
        }

        setTimeout(function () {
            gPacman.isSuper = false;
            for (var i = 0; i < gKilledGhosts.length; i++) {
                var ghost = gKilledGhosts[i];
                gGhosts.push(ghost);
                renderCell(ghost.location, ghost.src);
            }
            gKilledGhosts = [];
        }, 5000);
    }

    // update the model
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY;

    // update the dom
    renderCell(gPacman.location, EMPTY);

    gPacman.location = nextLocation;

    // update the model
    gBoard[gPacman.location.i][gPacman.location.j] = PACMAN;
    // update the dom
    renderCell(gPacman.location, PACMAN_IMG);
}

function getNextLocation(eventKeyboard) {
    var nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j
    }
    // var pacmanImg = document.querySelector('.pacman');
    switch (eventKeyboard.code) {
        case 'ArrowUp':
            nextLocation.i--;
            // pacmanImg.classList.add('up');
            PACMAN_IMG = '<img src="img/pacman.png" class="up" />'
            break;
        case 'ArrowDown':
            nextLocation.i++;
            // pacmanImg.classList.add('down');
            PACMAN_IMG = '<img src="img/pacman.png" class="down" />'
            break;
        case 'ArrowLeft':
            nextLocation.j--;
            // pacmanImg.classList.add('left');
            PACMAN_IMG = '<img src="img/pacman.png" class="left" />'
            break;
        case 'ArrowRight':
            nextLocation.j++;
            // pacmanImg.classList.add('right');
            PACMAN_IMG = '<img src="img/pacman.png" class="right" />'
            break;
        default:
            return null;
    }
    return nextLocation;
}