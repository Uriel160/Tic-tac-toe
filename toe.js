const cells = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const messageElement = document.getElementById('message');
let currentPlayer = 'X';  // Empieza el jugador X
let gameActive = true;
const winningCombinations = [
  [0, 1, 2],  // Fila superior
  [3, 4, 5],  // Fila media
  [6, 7, 8],  // Fila inferior
  [0, 3, 6],  // Columna izquierda
  [1, 4, 7],  // Columna central
  [2, 5, 8],  // Columna derecha
  [0, 4, 8],  // Diagonal
  [2, 4, 6]   // Diagonal
];

let boardState = Array(9).fill(null);  // Estado inicial vacío del tablero

cells.forEach(cell => {
  cell.addEventListener('click', handleCellClick, { once: true });
});

function handleCellClick(e) {
  const cell = e.target;
  const cellIndex = Array.from(cells).indexOf(cell);

  if (gameActive && !boardState[cellIndex]) {
    boardState[cellIndex] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add(currentPlayer === 'X' ? 'x' : 'o');

    if (checkWinner(currentPlayer)) {
      endGame(false);
    } else if (isDraw()) {
      endGame(true);
    } else {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';  // Cambiar de jugador
    }
  }
}

function checkWinner(player) {
  return winningCombinations.some(combination => {
    return combination.every(index => {
      return boardState[index] === player;
    });
  });
}

function isDraw() {
  return boardState.every(cell => cell !== null);
}

function endGame(draw) {
  gameActive = false;
  if (draw) {
    messageElement.textContent = 'Empate!';
  } else {
    messageElement.textContent = `¡${currentPlayer} gana!`;
  }
}

function restartGame() {
  boardState.fill(null);
  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('x', 'o');
    cell.addEventListener('click', handleCellClick, { once: true });
  });
  messageElement.textContent = '';
  gameActive = true;
  currentPlayer = 'X';
}
