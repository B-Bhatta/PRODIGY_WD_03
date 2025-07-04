let board = Array(9).fill(null);
let currentPlayer = 'X';
let gameActive = true;

const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
];

function makeMove(index) {
    if (!gameActive || board[index]) return;

    // Player's move
    board[index] = currentPlayer;
    document.querySelectorAll('.cell')[index].textContent = currentPlayer;

    if (checkWin(currentPlayer)) {
        document.getElementById('status').textContent = `You Wins!`;
        gameActive = false;
        return;
    }

    if (board.every(cell => cell)) {
        document.getElementById('status').textContent = "It's a Draw!";
        gameActive = false;
        return;
    }

   
    currentPlayer = 'O';
    document.getElementById('status').textContent = "AI's Turn (O)";
    setTimeout(aiMove, 500); 
}

function aiMove() {
   
    let availableSpots = board.map((cell, index) => cell === null ? index : null).filter(val => val !== null);
    if (availableSpots.length === 0) return;

    let aiIndex = availableSpots[Math.floor(Math.random() * availableSpots.length)];
    board[aiIndex] = 'O';
    document.querySelectorAll('.cell')[aiIndex].textContent = 'O';

    if (checkWin('O')) {
        document.getElementById('status').textContent = "AI (O) Wins!";
        gameActive = false;
        return;
    }

    if (board.every(cell => cell)) {
        document.getElementById('status').textContent = "It's a Draw!";
        gameActive = false;
        return;
    }

    currentPlayer = 'X';
    document.getElementById('status').textContent = "Your (X) Turn";
}

function checkWin(player) {
    return winningCombinations.some(combo => {
        return combo.every(index => board[index] === player);
    });
}

function resetGame() {
    board = Array(9).fill(null);
    currentPlayer = 'X';
    gameActive = true;
    document.getElementById('status').textContent = "Your (X) Turn";
    document.querySelectorAll('.cell').forEach(cell => (cell.textContent = ''));
}