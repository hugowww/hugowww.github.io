export interface Cell {
  x: number
  y: number
  isMine: boolean
  isRevealed: boolean
  isFlagged: boolean
  neighborMines: number
}

export type CellState = 'hidden' | 'revealed' | 'flagged' 