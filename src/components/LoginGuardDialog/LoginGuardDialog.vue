<script setup lang="ts">
  import { useAuth0 } from '@auth0/auth0-vue'
  import { useConfirm } from 'primevue'

  const { loginWithRedirect } = useAuth0()
  const confirm = useConfirm()

  const show = () => {
    confirm.require({
      message: 'Please login to use this feature.',
      header: 'Login Required',
      rejectProps: {
        label: 'Cancel',
        severity: 'secondary',
        outlined: true,
      },
      acceptProps: {
        label: 'Login',
        class: 'bg-black border-none',
      },
      accept: async () => {
        await loginWithRedirect()
      },
      reject: () => {},
    })
  }
  defineExpose({ show })
</script>

<template>
  <ConfirmDialog></ConfirmDialog>
</template>

<style lang=""></style>
