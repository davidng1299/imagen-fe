<script setup lang="ts">
  import Button from 'primevue/button'
</script>

<template>
  <aside class="w-16 bg-bg-primary border-r border-gray-200">
    <div class="bg-color-white flex flex-col justify-between items-center flex-1 gap-16 mt-8">
      <Button icon="pi pi-home !text-xl" rounded variant="text" aria-label="Home" />
      <Button icon="pi pi-compass !text-xl" rounded variant="text" aria-label="Browse" />
      <Button icon="pi pi-plus-circle !text-xl" rounded variant="text" aria-label="Create" />
    </div>
  </aside>
</template>

<style scoped></style>
