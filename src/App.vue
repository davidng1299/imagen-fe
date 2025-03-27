<script setup lang="ts">
  import NavBar from './components/NavBar/NavBar.vue'
  import SideBar from './components/SideBar/SideBar.vue'
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <header>
      <NavBar />
    </header>
    <div class="flex flex-1">
      <SideBar />
      <main class="flex-1 p-6 overflow-y-auto flex justify-center">
        <router-view />
      </main>
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
