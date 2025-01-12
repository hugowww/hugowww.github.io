<template>
  <div class="home">
    <h1>首頁 | Home</h1>
    <p>歡迎來到我的網站 | Welcome to my website</p>

    <div class="flex-row border p-2">
      <router-link to="/minesweeper" class="btn btn-primary me-2"
        >踩地雷</router-link
      >
    </div>

    <div class="flex-row border p-2 mt-2">
      <h2>Todo List</h2>
      <router-link to="/snake" class="btn btn-success me-2"
        >貪食蛇</router-link
      >
      <router-link to="/page-c" class="btn btn-info me-2"
        >js worker</router-link
      >
      <router-link to="/page-c" class="btn btn-info me-2">openGL</router-link>
      <router-link to="/page-c" class="btn btn-info me-2">openGL-雪模擬</router-link>
      <router-link to="/page-c" class="btn btn-info me-2">d3</router-link>
    </div>
  </div>
</template>

<style scoped>
@import "../assets/styles/home.styl";
</style>
