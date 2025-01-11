<template>
  <div class="page-b">
    <h1>頁面 B | Page B</h1>
    <p>這是頁面 B | This is page B</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'PageB'
})
</script>

<style scoped>
.page-b {
  padding: 20px;
  text-align: center;
}
</style> 