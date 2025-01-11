<template>
  <div class="page-a">
    <h1>頁面 A | Page A</h1>
    <p>這是頁面 A | This is page A123</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'PageA'
})
</script>

<style scoped>
.page-a {
  padding: 20px;
  text-align: center;
}
</style> 