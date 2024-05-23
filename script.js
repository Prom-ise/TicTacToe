// GAME PAGE

const xClass = 'x'
const oClass = 'o'
const xClasses = 'x'
const oClasses = 'o'
let xWins = 0;
let oWins = 0;

const winningCombo = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]
const winningCombos = [
  [0, 1, 2],
  [1, 2, 3],
  [2, 5, 8],
  [4, 5, 6],
  [5, 6, 7],
  [8, 9, 10],
  [9, 10, 11],
  [12, 13, 14],
  [13, 14, 15],
  [0, 4, 8],
  [1, 5, 9],
  [2, 6, 10],
  [3, 7, 11],
  [4, 8, 12],
  [5, 9, 13],
  [6, 10, 14],
  [7, 11, 15],
  [0, 5, 10],
  [1, 6, 11],
  [2, 7, 12],
  [3, 6, 9],
  [4, 9, 14],
  [5, 10, 15]
]
const cellElement = document.querySelectorAll('[data-cell]')
const cellsElement = document.querySelectorAll('[data-cells]')
const computerElement = document.querySelectorAll('[data-comp]');
const winningMsgTextElement = document.querySelector('[tic-wining-text]')
const xscoreTextElement = document.querySelector('[xscoreText]')
const oscoreTextElement = document.querySelector('[oscoreText]')
const winningMsgElement = document.querySelector('[winning-msg]')
const reststartButton = document.getElementById('restartbtn')
const tic = document.getElementById('tic')
const tic2 = document.getElementById('tic2')
let oturn = true
let oturns = true

startGame()

reststartButton.addEventListener('click', startGame)


// function computerGame() {
//   oturn = false;
//   computerElement.forEach(comp => {
//       comp.classList.remove(xClass);
//       comp.classList.remove(oClass);
//       comp.style.backgroundColor = '';
//       // Remove player click event listener
//       comp.removeEventListener('click', playerMove);
//       comp.addEventListener('click', playerMove, { once: true })
//   });
//   // Remove class indicating player's turn
//   tic.classList.remove(xClass);
//   tic.classList.remove(oClass);
//   setTicHoverClass();
//   winningMsgElement.classList.remove('show');
//   // Start with player's turn
//   oturn = false;
//   // Start the game loop
//   playGame();
// }

function playGame() {
  // If it's player's turn
  if (!oturn) {
      // Add event listener for player click
      computerElement.forEach(comp => {
          if (!comp.classList.contains(xClass) && !comp.classList.contains(oClass)) {
              comp.addEventListener('click', playerMove);
              
          }
      });
  } else {
      // If it's computer's turn
      computerElement.forEach(comp => {
          if (!comp.classList.contains(xClass) && !comp.classList.contains(oClass)) {
              comp.removeEventListener('click', playerMove);
          }
      });
      setTimeout(computerMove, 1000); // Delay computer move for 1 second for better UX
  }
}

function playerMove(e) {
  const comp = e.target;
  const computerClass = oturn ? oClass : xClass;
  placeMarking(comp, computerClass);
  if (computerWin(computerClass)) {
      endGamer(false);
  } else if (isDrawer()) {
      endGamer(true);
  } else {
      swapTurns();
      setTicHoverClass();
      playGame(); // Proceed to next move
  }
}

function computerMove() {
  // Disable player clicks during the computer's turn
  computerElement.forEach(comp => {
      comp.removeEventListener('click', playerMove);
  });
  
  const emptyComps = Array.from(computerElement).filter(comp => !comp.classList.contains(xClass) && !comp.classList.contains(oClass));
  const randomComp = emptyComps[Math.floor(Math.random() * emptyComps.length)];
  placeMarking(randomComp, oClass); // Computer places its mark randomly
  if (computerWin(oClass)) {
      endGamer(false);
  } else if (isDraw()) {
      endGamer(true);
  } else {
      swapTurns();
      setTicHoverClass();
      // Re-enable player clicks after the computer's move
      computerElement.forEach(comp => {
          if (!comp.classList.contains(xClass) && !comp.classList.contains(oClass)) {
              comp.addEventListener('click', playerMove);
          }
      });
  }
}

function updateScoreDisplay() {
  xscoreTextElement.innerText = `${xWins}`;
  oscoreTextElement.innerText = `${oWins}`;
}

function resetScores() {
  xWins = 0;
  oWins = 0;
  updateScoreDisplay();
}

function endGamer(drawing) {
  if (drawing) {
      winningMsgTextElement.innerText = `DRAW!`;
  } else {
      const computerClass = oturn ? oClass : xClass;
      winningMsgTextElement.innerText = `${oturn ? "You Loose!" : "You Win!"}`;
      if (oturn) {
        oWins++;
      } else {
        xWins++;
      }
      updateScoreDisplay();
      winningCombo.forEach(combo => {
          if (combo.every(index => computerElement[index].classList.contains(computerClass))) {
              combo.forEach(index => {
                  computerElement[index].style.backgroundColor = 'lime';
              });
          }
      });
  }
  winningMsgElement.classList.add('show');
}

function isDrawer() {
  return [...computerElement].every(comp => {
      return comp.classList.contains(xClass) || comp.classList.contains(oClass);
  });
}

function placeMarking(comp, computerClass) {
  comp.classList.add(computerClass);
}

// function swapTurns() {
//   oturn = !oturn;
// }

function setTicHoverClass() {
  if (oturn) {
      tic.classList.add(oClass);
      tic.classList.remove(xClass);
  } else {
      tic.classList.add(xClass);
      tic.classList.remove(oClass);
  }
}

function computerWin(computerClass) {
  return winningCombo.some(combo => {
      if (combo.every(index => computerElement[index].classList.contains(computerClass))) {
          return true;
      }
      return false;
  });
}









function startGame() {
  oturn = false
  oturns = false
  cellElement.forEach(cell => {
    cell.classList.remove(xClass)
    cell.classList.remove(oClass)
    cell.style.backgroundColor = '';
    cell.removeEventListener('click', handleClick)
    cell.addEventListener('click', handleClick, { once: true })
  })
  cellsElement.forEach(cells => {
    cells.classList.remove(xClasses)
    cells.classList.remove(oClasses)
    cells.style.backgroundColor = '';
    cells.removeEventListener('click', handleClicks)
    cells.addEventListener('click', handleClicks, { once: true })
  })
  computerElement.forEach(comp => {
    comp.classList.remove(xClass);
    comp.classList.remove(oClass);
    comp.style.backgroundColor = '';
    // Remove player click event listener
    comp.removeEventListener('click', playerMove);
    comp.addEventListener('click', playerMove, { once: true })
});
// Remove class indicating player's turn
tic.classList.remove(xClass);
tic.classList.remove(oClass);
// Start with player's turn
oturn = false;
// Start the game loop
playGame();

  setTicHoverClass()
  setTic2HoverClass()
  winningMsgElement.classList.remove('show')
  document.querySelector(".bg").style.left = "1em";
}

function handleClick(e) {
  // console.log("clicked");
  const cell = e.target
  const currentClass = oturn ? oClass : xClass

  //PLACING THE MARK
  placeMark(cell, currentClass)
  //CHECK FOR WIN
  if (checkWin(currentClass)) {
    console.log("winner");
    endGame(false)
  } else if (isDraw()) {
    endGame(true)
  } else {
    swapTurns()
    setTicHoverClass()
  }
  //CHECK FOR DRAW
  //SWITCH TURNS

}

function handleClicks(e) {
  // console.log("clicked");
  const cells = e.target
  const currentClasses = oturns ? oClasses : xClasses

  //PLACING THE MARK
  placeMarks(cells, currentClasses)
  //CHECK FOR WIN
  if (checkWins(currentClasses)) {
    console.log("winner");
    endGames(false)
  } else if (isDraws()) {
    endGames(true)
  } else {
    swapTurn()
    setTic2HoverClass()
  }
  //CHECK FOR DRAW
  //SWITCH TURNS

}

function endGame(draw) {
  if (draw) {
    winningMsgTextElement.innerText = `DRAW!`;
  } else {
    const currentClass = oturn ? oClass : xClass;
    winningMsgTextElement.innerText = `${oturn ? "O's" : "X's"} WINS!`;
    if (oturn) {
      oWins++;
    } else {
      xWins++;
    }

    // Display the count of wins for each player
    // console.log(`X has won ${xWins} time(s)`);
    // console.log(`O has won ${oWins} time(s)`);
    xscoreTextElement.innerText = `${xWins}`;
    oscoreTextElement.innerText = `${oWins}`;
    winningCombo.forEach(combo => {
      if (combo.every(index => cellElement[index].classList.contains(currentClass))) {
        // If the current combination contains all cells with the current class, color them green
        combo.forEach(index => {
          cellElement[index].style.backgroundColor = 'limegreen';
        });
        cellElement[combo[0]].classList.add('cell.o');
      }
    });
  }
  winningMsgElement.classList.add('show');
}
function endGames(draws) {
  if (draws) {
    winningMsgTextElement.innerText = `DRAW!`;
  } else {
    const currentClasses = oturns ? oClasses : xClasses;
    winningMsgTextElement.innerText = `${oturns ? "O's" : "X's"} WINS!`;
    if (oturns) {
      oWins++;
    } else {
      xWins++;
    }

    // Display the count of wins for each player
    // console.log(`X has won ${xWins} time(s)`);
    // console.log(`O has won ${oWins} time(s)`);
    xscoreTextElement.innerText = `${xWins}`;
    oscoreTextElement.innerText = `${oWins}`;
    winningCombos.forEach(combos => {
      if (combos.every(index => cellsElement[index].classList.contains(currentClasses))) {
        // If the current combination contains all cells with the current class, color them green
        combos.forEach(index => {
          cellsElement[index].style.backgroundColor = 'limegreen';
        });
        cellsElement[combos[0]].classList.add('cell.o');
      }
    });
  }
  winningMsgElement.classList.add('show');
}


function isDraw() {
  return [...cellElement].every(cell => {
    return cell.classList.contains(xClass) || cell.classList.contains(oClass)
  })
}
function isDraws() {
  return [...cellsElement].every(cells => {
    return cells.classList.contains(xClasses) || cells.classList.contains(oClasses)
  })
}
function placeMark(cell, currentClass) {
  cell.classList.add(currentClass)
}
function placeMarks(cells, currentClasses) {
  cells.classList.add(currentClasses)
}

function swapTurns() {
  oturn = !oturn; // Toggle the value of oturn

  // Use a conditional (ternary) operator to set the style based on oturn
  document.querySelector(".bg").style.left = oturn ? "6.16em" : "1em";
}

function swapTurn() {
  oturns = !oturns; // Toggle the value of oturn

  // Use a conditional (ternary) operator to set the style based on oturn
  document.querySelector(".bg").style.left = oturns ? "6.16em" : "1em";
}
function setTicHoverClass() {
  tic.classList.remove(xClass)
  tic.classList.remove(oClass)
  if (oturn) {
    tic.classList.add(oClass)
  } else {
    tic.classList.add(xClass)
  }
}
function setTic2HoverClass() {
  tic2.classList.remove(xClasses)
  tic2.classList.remove(oClasses)
  if (oturns) {
    tic2.classList.add(oClasses)
  } else {
    tic2.classList.add(xClasses)
  }
}
function checkWin(currentClass) {
  return winningCombo.some(combo => {
    if (combo.every(index => cellElement[index].classList.contains(currentClass))) {
      // If all cells in a combination have the current class, it's a win
      return true;
    }
    return false;
  });
}

function checkWins(currentClasses) {
  return winningCombos.some(combos => {
    if (combos.every(index => cellsElement[index].classList.contains(currentClasses))) {
      // If all cells in a combination have the current class, it's a win
      return true;
    }
    return false;
  });
}




// function endGaming(drawing) {
//     if (drawing) {
//       winningMsgTextElement.innerText = `DRAW!`;
//     } else {
//       const currentClasses = oturns ? oClasses : xClasses;
//       winningMsgTextElement.innerText = `${oturns ? "O's" : "X's"} WINS!`;
//       if (oturns) {
//         oWins++;
//       } else {
//         xWins++;
//       }
//       xscoreTextElement.innerText = `${xWins}`;
//       oscoreTextElement.innerText = `${oWins}`;
//       winningCombos.forEach(combos => {
//         if (combos.every(index => cellsElement[index].classList.contains(currentClasses))) {
//           // If the current combination contains all cells with the current class, color them green
//           combos.forEach(index => {
//             cellsElement[index].style.backgroundColor = 'limegreen';
//           });
//         }
//       });
//     }
//     winningMsgElement.classList.add('show');
// }



function thirdGrid(){
  const tic = document.querySelector('.tic');
  const tic2 = document.querySelector('.tic2');
  const tick = document.querySelector('.tick');
  const singleForth = document.querySelector('#singlePlayerBtn')
  const multiForth = document.querySelector('#multiplayerBtn')
  
  singleForth.style.display = 'block'
  singleForth.style.backgroundColor = 'pink'
  multiForth.style.display = 'block'
  multiForth.style.backgroundColor = 'lightcoral'
  tic.style.display = 'grid';
  tic2.style.display = 'none';
  tick.style.display = 'none';
}

function fourthGrid(){
  const tic = document.querySelector('.tic');
  const tic2 = document.querySelector('.tic2');
  const tick = document.querySelector('.tick');
  const singleForth = document.querySelector('#singlePlayerBtn')
  const multiForth = document.querySelector('#multiplayerBtn')
  
  singleForth.style.display = 'none'
  multiForth.style.display = 'none'
  tic.style.display = 'none';
  tic2.style.display = 'grid';
  tick.style.display = 'none';
  resetScores()
}


function singlePlayer(){
  const tic = document.querySelector('.tic');
  const tic2 = document.querySelector('.tic2');
  const tick = document.querySelector('.tick');
  const singleForth = document.querySelector('#singlePlayerBtn')
  const multiForth = document.querySelector('#multiplayerBtn')
  resetScores()
  startGame()

  singleForth.style.backgroundColor = 'lightcoral'
  multiForth.style.backgroundColor = 'pink'
  tic.style.display = 'none';
  tic2.style.display = 'none';
  tick.style.display = 'grid';
}

function multiPlayer(){
  const tic = document.querySelector('.tic');
  const tic2 = document.querySelector('.tic2');
  const tick = document.querySelector('.tick');
  const singleForth = document.querySelector('#singlePlayerBtn')
  const multiForth = document.querySelector('#multiplayerBtn')
  startGame()
  resetScores()

  singleForth.style.backgroundColor = 'pink'
  multiForth.style.backgroundColor = 'lightcoral'

  tick.style.display = 'none';
  tic2.style.display = 'none';
  tic.style.display = 'grid';
}




function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  const blurBackground = document.getElementById('blur-background');
  sidebar.classList.toggle('show');
  blurBackground.classList.toggle('show');
  const toggleCanc = document.querySelector('.toggle-btn2')
  const toggleBut = document.querySelector('.toggle-btn')

  toggleCanc.style.display = 'block';
  toggleBut.style.display = 'none';
}

function toggleSidebars() {
  const sidebar = document.getElementById('sidebar');
  const blurBackground = document.getElementById('blur-background');
  sidebar.classList.toggle('show');
  blurBackground.classList.toggle('show');

  const toggleCanc = document.querySelector('.toggle-btn2')
  const toggleBut = document.querySelector('.toggle-btn')

  toggleCanc.style.display = 'none';
  toggleBut.style.display = 'block';
}

// Create and add the blur background element to the body
const blurBackground = document.createElement('div');
blurBackground.id = 'blur-background';
blurBackground.className = 'blur-background';
blurBackground.onclick = toggleSidebar;
document.body.appendChild(blurBackground);



function endGameCompletely() {
  window.location.href = 'index.html';
}

