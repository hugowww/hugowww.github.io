<template>
  <div class="find-prime p-2">
    <h2>Find Prime Numbers</h2>

    <div class="card d-inline-block">
      <div class="card-header">Single Thread Mode</div>
      <div class="card-body">
        <div
          :class="['btn', 'btn-primary', isProcessing ? 'disabled' : '']"
          @click="startSingleThread">
          Start Finding Primes
        </div>
      </div>
    </div>
    <div class="card d-inline-block ms-2">
      <div class="card-header">Multi Thread Mode</div>
      <div class="card-body">
        <div
          v-for="threadCount in [1, 2, 4, 8, 16, 32]"
          :key="threadCount"
          :class="[
            'btn',
            'btn-primary',
            'me-2',
            isProcessing ? 'disabled' : '',
          ]"
          @click="startMultiThread(threadCount)">
          Start ({{ threadCount }} threads)
        </div>
      </div>
    </div>

    <div class="card mt-2">
      <div class="card-header">Results</div>
      <div class="card-body">
        <p>Time Cost: {{ time }}ms</p>
        <p>Last 10 Primes of {{ primeCount }} primes</p>
        <div class="prime" v-for="prime in last10primes" :key="prime">
          {{ prime }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { SingleThread } from "./core/SingleThread";
import { MultiThread } from "./core/multi/MultiThread";

// display setting
const isProcessing = ref(false);
const last10primes = ref<number[]>([]);
const time = ref(0);
const primeCount = ref(0);

// run setting
const length = 50000;
const startNumber = 100000000000;
const endNumber = startNumber + length;

// 開始測量
function startMeasure(): number {
  primeCount.value = 0;
  isProcessing.value = true;
  return performance.now();
}

// 結束測量
function endMeasure(startTime: number) {
  const endTime = performance.now();
  time.value = endTime - startTime;
  isProcessing.value = false;
}

// 更新結果
function updateResult(prime: number) {
  last10primes.value.push(prime);
  if (last10primes.value.length > 10) {
    last10primes.value.shift();
  }
  primeCount.value++;
}

// 單執行緒模式
const startSingleThread = () => {
  const findPrime = new SingleThread(startNumber, endNumber, updateResult);

  var startTime = startMeasure();

  findPrime.start();

  endMeasure(startTime);
};

// 多執行緒模式
const startMultiThread = (threadCount: number) => {
  const startTime = startMeasure();

  const findPrime = new MultiThread(
    startNumber,
    endNumber,
    threadCount,
    updateResult,
    () => {
      endMeasure(startTime);
    }
  );

  findPrime.start();
};
</script>
