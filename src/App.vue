<template>
  <div class="d-flex flex-column min-vh-100">
    <Navbar />
    <div class="flex-grow-1">
      <router-view></router-view>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Navbar from './layouts/Navbar.vue'

export default defineComponent({
  components: {
    Navbar
  }
})
</script>

<style lang="stylus">
.router-link-active {
  color: white !important;
}
</style>
