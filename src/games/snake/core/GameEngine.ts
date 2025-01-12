import type { Point, GameState } from "./types";

export class GameEngine {
  private state: GameState;
  private gridCount: number;
  private gameLoop: number | null = null;

  constructor(gridCount: number = 20) {
    this.gridCount = gridCount;
    this.state = this.getInitialState();
  }

  private getInitialState(): GameState {
    return {
      snake: [
        { x: 3, y: 1 },
        { x: 2, y: 1 },
        { x: 1, y: 1 },
      ],
      snakeDirection: "right",
      food: this.generateFood(),
      score: 0,
      isGameOver: false,
    };
  }

  private generateFood(): Point {
    return {
      x: Math.floor(Math.random() * this.gridCount),
      y: Math.floor(Math.random() * this.gridCount),
    };
  }

  public moveSnake(direction: "up" | "down" | "left" | "right"): void {
    if (this.state.isGameOver) return;

    const head = { ...this.state.snake[0] };

    switch (direction) {
      case "up":
        head.y--;
        break;
      case "down":
        head.y++;
        break;
      case "left":
        head.x--;
        break;
      case "right":
        head.x++;
        break;
    }
    this.state.snakeDirection = direction;

    if (this.checkCollision(head)) {
      this.state.isGameOver = true;
      this.stop();
      return;
    }

    this.state.snake.unshift(head);

    if (head.x === this.state.food.x && head.y === this.state.food.y) {
      this.state.score += 10;
      this.state.food = this.generateFood();
    } else {
      this.state.snake.pop();
    }
  }

  private checkCollision(head: Point): boolean {
    return (
      head.x < 0 ||
      head.x >= this.gridCount ||
      head.y < 0 ||
      head.y >= this.gridCount ||
      this.state.snake.some(
        (segment) => segment.x === head.x && segment.y === head.y
      )
    );
  }

  public getState(): GameState {
    return this.state;
  }

  public start(): void {
    this.state = this.getInitialState();
    this.gameLoop = window.setInterval(() => {
      this.moveSnake(this.state.snakeDirection);
    }, 150);
  }

  public stop(): void {
    if (this.gameLoop) {
      clearInterval(this.gameLoop);
      this.gameLoop = null;
    }
  }
}
