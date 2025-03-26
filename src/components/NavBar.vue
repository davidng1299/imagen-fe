<script setup lang="ts">
  import Button from 'primevue/button'
</script>

<template>
  <div class="bg-color-primary h-14 flex justify-between items-center px-4">
    <div>ImaGen Logo</div>
    <div class="flex gap-2">
      <Button label="Log in" class="login-button" />
      <Button label="Sign up" class="login-button" />
    </div>
  </div>
</template>

<style scoped>
  .login-button {
    background-color: black;
    &:hover {
      background-color: var(--primary);
      color: black;
    }
  }
</style>
