
const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");

const restartBtn = document.getElementById("restartBtn");
const newGameBtn = document.getElementById("newGameBtn");

const scoreXDisplay = document.getElementById("scoreX");
const scoreODisplay = document.getElementById("scoreO");

let currentPlayer = "X";
let gameActive = true;

let gameState = ["", "", "", "", "", "", "", "", ""];

let scoreX = 0;
let scoreO = 0;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleCellClick(event) {

    const clickedCell = event.target;
    const clickedIndex = Number(clickedCell.dataset.index);

    if (gameState[clickedIndex] !== "" || !gameActive) {
        return;
    }

    gameState[clickedIndex] = currentPlayer;

    clickedCell.textContent = currentPlayer;
    clickedCell.classList.add(currentPlayer.toLowerCase());
    clickedCell.disabled = true;

    checkResult();
}

function checkResult() {

    let roundWon = false;
    let winningCombo = null;

    for (let condition of winningConditions) {

        const [a, b, c] = condition;

        if (
            gameState[a] !== "" &&
            gameState[a] === gameState[b] &&
            gameState[b] === gameState[c]
        ) {
            roundWon = true;
            winningCombo = condition;
            break;
        }
    }

    if (roundWon) {

        statusText.textContent =
            `🎉 Player ${currentPlayer} Wins!`;

        gameActive = false;

        winningCombo.forEach(index => {
            cells[index].classList.add("winner");
        });

        if (currentPlayer === "X") {
            scoreX++;
            scoreXDisplay.textContent = scoreX;
        } else {
            scoreO++;
            scoreODisplay.textContent = scoreO;
        }

        return;
    }

    if (!gameState.includes("")) {

        statusText.textContent = "It's a Draw! 🤝";
        gameActive = false;

        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";

    statusText.textContent =
        `Player ${currentPlayer}'s Turn`;
}

function restartRound() {

    currentPlayer = "X";
    gameActive = true;

    gameState = ["", "", "", "", "", "", "", "", ""];

    statusText.textContent = "Player X's Turn";

    cells.forEach(cell => {

        cell.textContent = "";
        cell.disabled = false;

        cell.classList.remove("x", "o", "winner");
    });
}

function newGame() {

    restartRound();

    scoreX = 0;
    scoreO = 0;

    scoreXDisplay.textContent = "0";
    scoreODisplay.textContent = "0";
}

cells.forEach(cell => {
    cell.addEventListener("click", handleCellClick);
});

restartBtn.addEventListener("click", restartRound);
newGameBtn.addEventListener("click", newGame);
