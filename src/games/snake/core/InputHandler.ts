export class InputHandler {
  private currentDirection: 'up' | 'down' | 'left' | 'right' = 'right'
  private onDirectionChange: (direction: 'up' | 'down' | 'left' | 'right') => void

  constructor(onDirectionChange: (direction: 'up' | 'down' | 'left' | 'right') => void) {
    this.onDirectionChange = onDirectionChange
    this.setupEventListeners()
  }

  private setupEventListeners(): void {
    document.addEventListener('keydown', (e) => {
      const newDirection = this.getNewDirection(e.key)
      if (newDirection && this.isValidDirection(newDirection)) {
        this.currentDirection = newDirection
        this.onDirectionChange(newDirection)
      }
    })
  }

  private getNewDirection(key: string): 'up' | 'down' | 'left' | 'right' | null {
    const directions = {
      'ArrowUp': 'up',
      'ArrowDown': 'down',
      'ArrowLeft': 'left',
      'ArrowRight': 'right'
    } as const

    return directions[key as keyof typeof directions] || null
  }

  private isValidDirection(newDirection: 'up' | 'down' | 'left' | 'right'): boolean {
    const opposites = {
      'up': 'down',
      'down': 'up',
      'left': 'right',
      'right': 'left'
    } as const

    return opposites[newDirection] !== this.currentDirection
  }
} 