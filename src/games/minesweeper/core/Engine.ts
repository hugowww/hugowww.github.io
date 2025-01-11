import { BoardGenerator } from "./BoardGenerator";
import { GameInteraction } from "./GameInteraction";
import type { Board } from "../types/Board";
import type { IEngine } from "./IEngine";

const DIFFICULTY = {
  EASY: {
    width: 9,
    height: 9,
    mines: 10,
  },
  MEDIUM: {
    width: 16,
    height: 16,
    mines: 40,
  },
  HARD: {
    width: 30,
    height: 16,
    mines: 99,
  },
};

export class MinesweeperEngine implements IEngine {
  private _board: Board;
  private _interaction: GameInteraction;

  constructor(level: "EASY" | "MEDIUM" | "HARD") {
    const { width, height, mines } = DIFFICULTY[level];
    const generator = new BoardGenerator(width, height, mines);
    this._board = generator.generate();
    this._interaction = new GameInteraction(this._board);
  }

  get board(): Board {
    return this._board;
  }

  revealCell(x: number, y: number): void {
    this._interaction.revealCell(x, y);
  }

  toggleFlag(x: number, y: number): void {
    this._interaction.toggleFlag(x, y);
  }
}
