<template>
  <div class="home">
    <h1>首頁 | Home</h1>
    <p>歡迎來到我們的網站 | Welcome to our website</p>
    <div class="box">
        stylus test
    </div>
    
    <!-- Bootstrap 按鈕 -->
    <div class="nav-buttons">
      <router-link to="/page-a" class="btn btn-primary me-2">Page A</router-link>
      <router-link to="/page-b" class="btn btn-success me-2">Page B</router-link>
      <router-link to="/page-c" class="btn btn-info">Page C</router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'HomePage',
  // 組件邏輯可以在這裡添加 | Component logic can be added here
})
</script>

<style scoped>
@import '../assets/styles/home.styl';

.nav-buttons {
  margin-top: 20px;
  display: flex;
  gap: 10px;
  justify-content: center;
}

.nav-btn {
  padding: 8px 16px;
  background-color: #4CAF50;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.nav-btn:hover {
  background-color: #45a049;
}
</style> 