import type { Board } from '../types/Board'

// 定義 MinesweeperEngine 的介面
export interface IEngine {
  board: Board;
  revealCell(x: number, y: number): void;
  toggleFlag(x: number, y: number): void;
}
