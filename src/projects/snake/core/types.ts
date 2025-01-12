export interface Point {
  x: number;
  y: number;
}

export interface GameState {
  snake: Point[];
  snakeDirection: 'up' | 'down' | 'left' | 'right';
  food: Point;
  score: number;
  isGameOver: boolean;
} 