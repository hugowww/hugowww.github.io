<template>
  <div class="minesweeper-board">
    <table>
      <tbody>
        <tr v-for="row in board.cells" :key="row[0].y">
          <td
            v-for="cell in row"
            :key="`${cell.x}-${cell.y}`"
            :class="{
              revealed: cell.isRevealed,
              mine: cell.isMine && cell.isRevealed,
              flagged: cell.isFlagged,
            }"
            @click="handleLeftClick(cell.x, cell.y)"
            @contextmenu.prevent="handleRightClick(cell.x, cell.y, $event)"
          >
            <template v-if="cell.isRevealed && !cell.isMine">
              {{ cell.neighborMines > 0 ? cell.neighborMines : "" }}
            </template>
            <template v-else-if="cell.isRevealed && cell.isMine"> 💣 </template>
            <template v-else-if="cell.isFlagged"> 🚩 </template>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { AddLog } from "../decorators/AddLog";
import { MinesweeperEngine } from "../core/Engine";
import { ref } from "vue";

const engine = new AddLog(new MinesweeperEngine("MEDIUM"));
const board = ref(engine.board);

const handleLeftClick = (x: number, y: number) => {
  engine.revealCell(x, y);
  board.value = { ...engine.board };
};

const handleRightClick = (x: number, y: number, event: Event) => {
  event.preventDefault();
  engine.toggleFlag(x, y);
  board.value = { ...engine.board };
};

</script>

<style scoped>
.minesweeper-board {
  display: inline-block;
}

table {
  border-collapse: collapse;
  background: #c0c0c0;
}

td {
  width: 30px;
  height: 30px;
  border: 1px solid #808080;
  text-align: center;
  vertical-align: middle;
  font-weight: bold;
  cursor: pointer;
  background: #c0c0c0;
}

td:not(.revealed) {
  border-top: 2px solid #fff;
  border-left: 2px solid #fff;
  border-right: 2px solid #808080;
  border-bottom: 2px solid #808080;
}

td.revealed {
  background: #e0e0e0;
  border: 1px solid #808080;
}

td.mine {
  background: #ff0000;
}
</style>
