<script setup lang="ts">
  defineProps<{
    isOpen: boolean
    onClose: () => void
    base64_string: string
  }>()
</script>

<template>
  <Dialog :visible="isOpen" @update:visible="onClose" modal header="Your image is ready">
    <Image
      class="max-w-[512px]"
      :src="'data:image/jpeg;base64,' + base64_string"
      alt="Image"
      preview
    />
    <div class="flex justify-end gap-2">
      <Button icon="pi pi-download" label="Download" severity="contrast" @click="onClose"></Button>
      <Button icon="pi pi-bookmark" label="Save" @click="onClose"></Button>
    </div>
  </Dialog>
</template>

<style lang=""></style>
