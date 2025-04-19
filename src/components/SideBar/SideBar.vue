<script setup lang="ts">
  import { useAuth0 } from '@auth0/auth0-vue'
  import { useRouter } from 'vue-router'

  const router = useRouter()
  const { isAuthenticated, user } = useAuth0()
</script>

<template>
  <aside class="w-16 bg-bg-primary border-r border-gray-200">
    <div class="bg-color-white flex flex-col justify-between items-center flex-1 gap-16 mt-8">
      <Button
        icon="pi pi-comment text-xl"
        rounded
        variant="text"
        v-tooltip.right="{
          value: 'Create image',
          pt: {
            text: 'text-xs',
          },
          showDelay: 500,
        }"
        @click="
          () => {
            router.push('/')
          }
        "
      />
      <Button
        icon="pi pi-images text-xl"
        v-if="!!isAuthenticated && !!user"
        rounded
        variant="text"
        v-tooltip.right="{
          value: 'Gallery',
          pt: {
            text: 'text-xs',
          },
          showDelay: 500,
        }"
        @click="
          () => {
            router.push('/gallery')
          }
        "
      />
    </div>
  </aside>
</template>

<style scoped></style>
