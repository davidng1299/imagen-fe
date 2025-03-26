<script setup lang="ts">
  import NavBar from './components/NavBar.vue'
  import SideBar from './components/SideBar.vue'
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <header>
      <NavBar />
    </header>
    <div class="flex flex-1">
      <SideBar />
      <main class="flex-1 p-6 overflow-y-auto"></main>
    </div>
  </div>
</template>

<style scoped>
  header {
    line-height: 1.5;
  }

  .logo {
    display: block;
    margin: 0 auto 2rem;
  }
</style>
