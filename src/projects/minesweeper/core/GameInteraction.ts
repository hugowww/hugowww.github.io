import type { Board } from '../types/Board'

export class GameInteraction {
  constructor(private board: Board) {}

  revealCell(x: number, y: number): void {
    const cell = this.board.cells[y][x];
    if (cell.isFlagged || cell.isRevealed) return;

    cell.isRevealed = true;
    if (cell.isMine) {
      this.board.gameOver = true;
      return;
    }

    if (cell.neighborMines === 0) {
      this.revealNeighbors(x, y);
    }

    this.checkWinCondition();
  }

  toggleFlag(x: number, y: number): void {
    const cell = this.board.cells[y][x];
    if (!cell.isRevealed) {
      cell.isFlagged = !cell.isFlagged;
    }
  }

  private revealNeighbors(x: number, y: number): void {
    for (let dy = -1; dy <= 1; dy++) {
      for (let dx = -1; dx <= 1; dx++) {
        const ny = y + dy;
        const nx = x + dx;
        if (
          ny >= 0 && ny < this.board.height &&
          nx >= 0 && nx < this.board.width &&
          !this.board.cells[ny][nx].isRevealed
        ) {
          this.revealCell(nx, ny);
        }
      }
    }
  }

  private checkWinCondition(): void {
    this.board.won = this.board.cells.every(row =>
      row.every(cell =>
        cell.isMine ? !cell.isRevealed : cell.isRevealed
      )
    );
  }
} 