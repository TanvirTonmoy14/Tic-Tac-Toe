const cells = document.querySelectorAll('.cell');
const restartButton = document.getElementById('restart-btn');
const statusText = document.getElementById('status');
const overlay = document.getElementById('overlay');
const overlayContent = document.getElementById('overlay-content');
const resultText = document.getElementById('result');
const restartOverlayButton = document.getElementById('restart-overlay-btn');
let currentPlayer = 'X';
let gameActive = true;

function handleCellClick(e) {
    const cell = e.target;
    const cellIndex = cell.id;

    if (cell.textContent !== '' || !gameActive) return;

    cell.textContent = currentPlayer;
    checkGameStatus();
    togglePlayer();
}

function togglePlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusText.textContent = `${currentPlayer}'s turn`;
}

function checkGameStatus() {
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

    for (let condition of winningConditions) {
        const [a, b, c] = condition;
        if (cells[a].textContent && cells[a].textContent === cells[b].textContent && cells[a].textContent === cells[c].textContent) {
            gameActive = false;
            statusText.textContent = '';
            resultText.textContent = `${currentPlayer} wins!`;
            overlay.style.display = 'block';
            return;
        }
    }

    if (![...cells].some(cell => cell.textContent === '')) {
        gameActive = false;
        statusText.textContent = '';
        resultText.textContent = `It's a draw!`;
        overlay.style.display = 'block';
        return;
    }
}

function handleRestart() {
    cells.forEach(cell => {
        cell.textContent = '';
    });
    statusText.textContent = `${currentPlayer}'s turn`;
    gameActive = true;
    overlay.style.display = 'none';
}

cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

restartButton.addEventListener('click', handleRestart);
restartOverlayButton.addEventListener('click', handleRestart);
