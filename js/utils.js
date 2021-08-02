function printMat(mat, selector) {
  var strHTML = '<table border="0"><tbody>';
  for (var i = 0; i < mat.length; i++) {
    strHTML += '<tr>';
    for (var j = 0; j < mat[0].length; j++) {

      switch (mat[i][j]) {
        case GHOST:
          cell = GHOST_IMG;
          break;
        case PACMAN:
          cell = PACMAN_IMG;
          break;
        case FOOD:
          cell = FOOD;
          break;
        case WALL:
          cell = WALL;
          break;
        case SUPER_FOOD:
          cell = SUPER_FOOD;
          break;
      }

      var className = `cell cell${i}-${j}`;
      strHTML += `<td class="${className}"> ${cell} </td>`
    }
    strHTML += '</tr>'
  }
  strHTML += '</tbody></table>';
  var elContainer = document.querySelector(selector);
  elContainer.innerHTML = strHTML;
}

// location such as: {i: 2, j: 7}
function renderCell(location, value) {
  // Select the elCell and set the value
  var elCell = document.querySelector(`.cell${location.i}-${location.j}`);
  elCell.innerHTML = value;
}

function getRandomNum(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function getEmptyCell() {
  var emptyCells = [];
  for (var i = 0; i < gBoard.length; i++) {
    for (var j = 0; j < gBoard[0].length; j++) {
      var currCell = gBoard[i][j];
      if (currCell === EMPTY) emptyCells.push({ i, j });
    }
  }
  var randIdx = getRandomNum(0, emptyCells.length);
  return emptyCells[randIdx];
}