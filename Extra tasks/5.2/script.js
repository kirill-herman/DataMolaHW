/* eslint-disable max-len */
class Game {
  constructor() {
    this.player = 'X';
    this.computer = 'O';
    this.winCombinations = ['012', '345', '678', '036', '147', '258', '048', '246'];
    this.gameSection = document.querySelector('.game');
    this.gameOverSection = document.querySelector('.game-over');
    this.cells = document.querySelectorAll('.cell');
  }

  startGame() {
    for (let i = 0; i < 9; i += 1) {
      this.cells[i].dataset.cellId = i;
      this.cells[i].textContent = '';
    }
  }

  addListeners() {
    this.gameSection.addEventListener('click', (event) => {
      if (event.target.classList.contains('cell')) {
        const cell = event.target;
        if (cell.textContent === '') {
          cell.textContent = this.player;
          if (!this.checkWin()) {
            this.computerTurn();
          }
        }
      }
    });
    this.gameOverSection.addEventListener('click', (event) => {
      if (event.target.classList.contains('restart')) {
        this.gameOverSection.classList.toggle('hidden');
        this.startGame();
      }
    });
  }

  computerTurn() {
    const emptyCells = Array.from(this.cells).filter((cell) => cell.textContent === '');
    const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    randomCell.textContent = this.computer;
    this.checkWin();
  }

  checkWin() {
    const playerCells = Array.from(this.cells).filter((cell) => cell.textContent === this.player);
    const computerCells = Array.from(this.cells).filter((cell) => cell.textContent === this.computer);
    const playerCombination = playerCells.map((cell) => cell.dataset.cellId);
    const computerCombination = computerCells.map((cell) => cell.dataset.cellId);
    const playerWin = Array.from(this.winCombinations).some((combination) => combination.split('').every((cellId) => playerCombination.includes(cellId)));
    const computerWin = Array.from(this.winCombinations).some((combination) => combination.split('').every((cellId) => computerCombination.includes(cellId)));
    if (playerWin) {
      this.gameOver('Player');
    } else if (playerCells.length + computerCells.length === 9) {
      this.gameOver('Draw');
    } else if (computerWin) {
      this.gameOver('Computer');
    }
    return playerWin || computerWin || (playerCells.length + computerCells.length === 9);
  }

  gameOver(whoWins) {
    this.gameOverSection.classList.toggle('hidden');
    this.gameOverSection.querySelector('#text').innerHTML = `${whoWins} win!`;
    this.gameOverSection.querySelectorAll('.cell-over').forEach((cell, cellIndex) => {
      cell.textContent = this.cells[cellIndex].textContent;
    });
  }
}

const game = new Game();
game.startGame();
game.addListeners();
