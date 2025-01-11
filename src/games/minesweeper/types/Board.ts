import type { Cell } from './Cell'

export interface Board {
  width: number
  height: number
  mines: number
  cells: Cell[][]
  gameOver: boolean
  won: boolean
} 