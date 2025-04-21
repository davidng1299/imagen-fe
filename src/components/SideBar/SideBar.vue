<script setup lang="ts">
  import { useAuth0 } from '@auth0/auth0-vue'
  import { useRouter } from 'vue-router'
  import { ref } from 'vue'
  import LoginGuardDialog from '../LoginGuardDialog/LoginGuardDialog.vue'

  const { isAuthenticated, user } = useAuth0()
  const router = useRouter()
  const loginDialogRef = ref()

  const showDialog = () => {
    loginDialogRef.value.show() // Calls the child's function
  }
</script>

<template>
  <LoginGuardDialog ref="loginDialogRef"></LoginGuardDialog>
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
            if (!isAuthenticated || !user) {
              showDialog()
            } else {
              router.push('/gallery')
            }
          }
        "
      />
    </div>
  </aside>
</template>

<style scoped></style>
