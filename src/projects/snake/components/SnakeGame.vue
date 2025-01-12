<template>
  <div class="snake-game">
    <h1>貪食蛇</h1>
    <canvas ref="gameCanvas" width="400" height="400" />
    <div class="controls">
      <button @click="startGame">開始遊戲</button>
      <div class="score">分數: {{ score }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onUnmounted } from "vue";
import { GameEngine } from "../core/GameEngine";
import { Renderer } from "../core/Renderer";
import { InputHandler } from "../core/InputHandler";

const gameCanvas = ref<HTMLCanvasElement | null>(null);
const score = ref(0);
let gameLoop: number | null = null;

onUnmounted(() => {
  if (gameLoop) {
    cancelAnimationFrame(gameLoop);
  }
});

const startGame = () => {
  if (!gameCanvas.value) return;

  // 初始化遊戲引擎、渲染器和輸入處理器
  var gameEngine = new GameEngine();
  var renderer = new Renderer(gameCanvas.value);
  new InputHandler((direction) => {
    gameEngine?.moveSnake(direction);
  });

  // 開始遊戲
  gameEngine.start();
  score.value = 0;

  // 更新遊戲狀態和渲染
  const update = () => {
    const state = gameEngine!.getState();
    renderer!.render(state);
    score.value = state.score;

    if (!state.isGameOver) {
      gameLoop = requestAnimationFrame(update);
    }
  };
  update();
};
</script>

<style scoped>
.snake-game {
  text-align: center;
  padding: 20px;
}

canvas {
  border: 2px solid #333;
  background: #f0f0f0;
  margin: 20px 0;
}

button {
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}

.score {
  margin-top: 10px;
  font-size: 20px;
}
</style>
