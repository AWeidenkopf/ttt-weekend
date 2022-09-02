/*-------------------------------- Constants --------------------------------*/

const winningCombos = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]
]

/*---------------------------- Variables (state) ----------------------------*/

let board, winner, turn, player

/*------------------------ Cached Element References ------------------------*/


const messageEl = document.getElementById("message")
const squareEls = Array.from(document.querySelectorAll("div"))
const resetBtnEl = document.getElementById("resetBtn")


//to create an array from the elements just use the Array.from and then we get the divs elements
//if we get the .section we would get array with a singular element. Te entire container
/*----------------------------- Event Listeners -----------------------------*/

document.querySelector(".board").addEventListener("click", handleClick)
resetBtnEl.addEventListener("click", init)

/*-------------------------------- Functions --------------------------------*/

init()

function init() {
  board = new Array(9).fill(null);
  turn = 1
  winner = null
  messageEl.style.color = "aliceblue";
  squareEls.forEach((div => div.style.color = "aliceblue"))
  render()
}

function render() {
  for (idx in board) {
    if (board[idx] === 1) {
      squareEls[idx].textContent = "x";
    } else if (board[idx] === -1) {
      squareEls[idx].textContent = "o";
    } else if (board[idx] === null)
      squareEls[idx].textContent = "";
  }

  if (turn === 1) {
    player = "Player 1 (x)"
  } else {
    player = "Player 2 (o)"
  }

  if (winner === null) {
    messageEl.textContent = `${player} is your turn!`
  } else if (winner === "T") {
    messageEl.textContent = `It's a tie!`
  } else if (winner === -1) {
    messageEl.textContent = `Congratulations, Player 2 (o), you won!`
  } else {
    messageEl.textContent = `Congratulations, Player 1 (x), you won!`
  }
}


function handleClick(evt) {
  let sqIdx = parseInt(evt.target.id.replace("sq", ""))
  if (board[sqIdx] !== null || winner !== null) {
    return
  }
  board[sqIdx] = turn;
  turn *= -1;
  getWinner()
  render()
}

function getWinner() {
  for (i = 0; i < winningCombos.length; i++) {
    let sum = Math.abs(board[winningCombos[i][0]] + board[winningCombos[i][1]] + board[winningCombos[i][2]])
    if (sum === 3) {
      squareEls[winningCombos[i][0]].style.color = "#A3EBB1"
      squareEls[winningCombos[i][1]].style.color = "#A3EBB1"
      squareEls[winningCombos[i][2]].style.color = "#A3EBB1"
      messageEl.style.color = "#A3EBB1"
      return winner = board[winningCombos[i][0]];
    }
  }

  if (!board.includes(null)) {
    return winner = "T"
  }
}

// to make a computer turn 
// create a fn that get a random num within the range of my board
//check if that board[ranNum] is already taken
//if not, assign e "o" to the board[ranNum]
// if it is I need to get a diferent number
//maybe store the numbers taken and exclude them from the search?

//if the turn is -1 then is computers turn and I would need to call the 
// computer turn fn

// now I need to flip the turn again so it's player's one turn
