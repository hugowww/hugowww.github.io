import type { Board } from '../types/Board'
import type { Cell } from '../types/Cell'

export class BoardGenerator {
  constructor(
    private width: number,
    private height: number,
    private mines: number
  ) {}

  generate(): Board {
    const cells = this.createEmptyCells();
    this.placeMines(cells);
    this.calculateNeighbors(cells);
    
    return {
      width: this.width,
      height: this.height,
      mines: this.mines,
      cells,
      gameOver: false,
      won: false
    };
  }

  private createEmptyCells(): Cell[][] {
    return Array(this.height)
      .fill(null)
      .map((_, y) =>
        Array(this.width)
          .fill(null)
          .map((_, x) => ({
            x,
            y,
            isMine: false,
            isRevealed: false,
            isFlagged: false,
            neighborMines: 0,
          }))
      );
  }

  private placeMines(cells: Cell[][]): void {
    const positions = this.getRandomMinePositions();
    positions.forEach(({ x, y }) => {
      cells[y][x].isMine = true;
    });
  }

  private calculateNeighbors(cells: Cell[][]): void {
    cells.forEach((row, y) => {
      row.forEach((cell, x) => {
        cell.neighborMines = this.countNeighborMines(cells, x, y);
      });
    });
  }

  private getRandomMinePositions(): { x: number; y: number }[] {
    const positions: { x: number; y: number }[] = [];
    while (positions.length < this.mines) {
      const x = Math.floor(Math.random() * this.width);
      const y = Math.floor(Math.random() * this.height);
      if (!positions.some(pos => pos.x === x && pos.y === y)) {
        positions.push({ x, y });
      }
    }
    return positions;
  }

  private countNeighborMines(cells: Cell[][], x: number, y: number): number {
    let count = 0;
    for (let dy = -1; dy <= 1; dy++) {
      for (let dx = -1; dx <= 1; dx++) {
        const ny = y + dy;
        const nx = x + dx;
        if (
          ny >= 0 && ny < this.height &&
          nx >= 0 && nx < this.width &&
          cells[ny][nx].isMine
        ) {
          count++;
        }
      }
    }
    return count;
  }
} 