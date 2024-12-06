const board = document.getElementById('board');
const cells = document.querySelectorAll('[data-cell]');
const message = document.getElementById('message');
const resetButton = document.getElementById('reset');

let currentPlayer = 'X';
let gameActive = true;

// Winning combinations
const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// Place symbol on a cell
const handleCellClick = (e) => {
  const cell = e.target;
  if (!gameActive || cell.classList.contains('taken')) return;

  cell.textContent = currentPlayer;
  cell.classList.add('taken');

  if (checkWinner()) {
    message.textContent = `Player ${currentPlayer} wins!`;
    gameActive = false;
    return;
  }

  if (isDraw()) {
    message.textContent = "It's a draw!";
    gameActive = false;
    return;
  }

  // Switch player
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  message.textContent = `Player ${currentPlayer}'s turn`;
};

// Check for a winner
const checkWinner = () => {
  return winningCombos.some(combo => {
    return combo.every(index => {
      return cells[index].textContent === currentPlayer;
    });
  });
};

// Check for a draw
const isDraw = () => {
  return [...cells].every(cell => cell.textContent !== '');
};

// Reset the game
const resetGame = () => {
  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('taken');
  });
  currentPlayer = 'X';
  gameActive = true;
  message.textContent = "Player X's turn";
};

// Add event listeners
cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);
