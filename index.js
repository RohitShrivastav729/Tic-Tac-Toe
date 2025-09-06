
// getting workable elements
console.log("script file started")
const statusBar = document.getElementById("status");
const cells = document.querySelectorAll(".cell");
const resetButton = document.getElementById("reset");

let currentPlayer = "X";
let board = ["", "", "", "", "", "", "", "", ""];
let isGameActive = true;

// All possible winning combinations (rows, cols, diagonals)
const winningCombinations = [
    [0, 1, 2],  // top row
    [3, 4, 5],  // middle row
    [6, 7, 8],  // bottom row
    [0, 3, 6],  // left column
    [1, 4, 7],  // middle column
    [2, 5, 8],  // right column
    [0, 4, 8],  // diagonal (top-left to bottom-right)
    [2, 4, 6]   // diagonal (top-right to bottom-left)
];


// To handle cell click

cells.forEach(cell => {
    cell.addEventListener("click", handleCellClick);
})


function handleCellClick(event) {
    console.log("on cell click..")
    const cell = event.target;
    console.log("cell..", cell);
    const index = cell.dataset.index;

    if (board[index] !== "" || !isGameActive) {
        return;
    }

    board[index] = currentPlayer;
    cell.textContent = currentPlayer;

    // Switch player
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusBar.textContent = `Player ${currentPlayer}'s turn`;

    checkWinner();
}

function checkWinner() {
    for (const combo of winningCombinations) {
        const [a, b, c] = combo;

        if(board[a] && board[a] === board[b] && board[a] === board[c]){
            statusBar.textContent = `Player ${board[a]} wins!`;
            isGameActive = false;
            return;
        }

        // Draw Condition
        if(!board.includes("")){
            statusBar.textContent = "It's a Draw!";
            isGameActive = false;
            return;
        }

    }
}

resetButton.addEventListener("click", resetGame)

function resetGame(){
    cells.forEach(cell => {
        cell.textContent = "";
    })

    isGameActive = true;

    statusBar.textContent = `Player ${currentPlayer}'s Turn!`
}