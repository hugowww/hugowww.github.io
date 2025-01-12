import type { GameState } from './types'

export class Renderer {
  private canvas: HTMLCanvasElement
  private ctx: CanvasRenderingContext2D
  private gridSize: number

  constructor(canvas: HTMLCanvasElement, gridCount: number = 20) {
    this.canvas = canvas
    this.ctx = canvas.getContext('2d')!
    this.gridSize = canvas.width / gridCount
  }

  public render(state: GameState): void {
    this.clear()
    this.drawSnake(state.snake)
    this.drawFood(state.food)
  }

  private clear(): void {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
  }

  private drawSnake(snake: Array<{ x: number; y: number }>): void {
    this.ctx.fillStyle = '#4CAF50'
    snake.forEach(segment => {
      this.ctx.fillRect(
        segment.x * this.gridSize,
        segment.y * this.gridSize,
        this.gridSize - 1,
        this.gridSize - 1
      )
    })
  }

  private drawFood(food: { x: number; y: number }): void {
    this.ctx.fillStyle = '#FF5722'
    this.ctx.fillRect(
      food.x * this.gridSize,
      food.y * this.gridSize,
      this.gridSize - 1,
      this.gridSize - 1
    )
  }
} 