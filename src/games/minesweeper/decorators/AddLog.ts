import type { IEngine } from "../core/IEngine";
import type { Board } from "../types/Board";

export class AddLog implements IEngine {
  private _engine: IEngine;

  constructor(engine: IEngine) {
    this._engine = engine;
  }

  get board(): Board {
    return this._engine.board;
  }

  revealCell(x: number, y: number): void {
    console.log(`Revealing cell at (${x}, ${y})`);
    this._engine.revealCell(x, y);
  }

  toggleFlag(x: number, y: number): void {
    console.log(`Toggling flag at (${x}, ${y})`);
    this._engine.toggleFlag(x, y);
  }
}