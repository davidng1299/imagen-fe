<script setup lang="ts">
  import { useImageApi } from '@/composables/useImageApi'
  import { getDbUserId } from '@/utils/helpers'
  import { useAuth0 } from '@auth0/auth0-vue'
  import { useToast } from 'primevue'
  import { ref } from 'vue'
  import { getFullImageBase64String } from '@/utils/helpers'
  import type { SaveImageResponse } from '@/models/dtos/ImageDto'
  import LoginGuardDialog from '../LoginGuardDialog/LoginGuardDialog.vue'

  const props = defineProps<{
    isOpen: boolean
    onClose: () => void
    base64String: string
    size: string
  }>()

  const { isAuthenticated, user } = useAuth0()
  const toast = useToast()
  const loading = ref(false)
  const response = ref<SaveImageResponse | undefined>(undefined)
  const loginDialogRef = ref()
  const { saveImage } = useImageApi()

  const showDialog = () => {
    loginDialogRef.value.show()
  }

  const onSave = async () => {
    try {
      loading.value = true

      response.value = await saveImage({
        base64String: props.base64String,
        userId: getDbUserId(user.value?.sub),
        size: props.size,
      })

      toast.add({
        severity: 'success',
        summary: 'Success',
        detail: 'This image has been added to your collection!',
        life: 3000,
      })
    } catch {
      toast.add({
        severity: 'error',
        summary: 'Error',
        detail: 'An error has occurred, please try again.',
        life: 3000,
      })
    } finally {
      loading.value = false
    }
  }

  const onDownload = () => {
    const imageUrl = getFullImageBase64String(props.base64String, 'png')
    const link = document.createElement('a')
    link.href = imageUrl
    link.download = 'downloaded-image.png'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // Store image in localStorage to preserve the state after login
  const onLogin = () => {
    const imgObj = {
      base64String: props.base64String,
      size: props.size
    }
    localStorage.setItem("unsavedImgObj", JSON.stringify(imgObj))
  }
</script>

<template>
  <LoginGuardDialog ref="loginDialogRef" :callback="onLogin"/>
  <Dialog
    :visible="isOpen"
    @update:visible="onClose"
    modal
    header="Your image is ready!"
    :pt="{
      content: 'flex flex-col items-center max-w-full',
    }"
  >
    <Image
      class="flex items-center justify-center"
      :src="getFullImageBase64String(base64String, 'png')"
      alt="Image"
      preview
    />
    <div class="flex justify-between gap-2 pt-2 w-full">
      <Button
        icon="pi pi-download"
        label="Download"
        severity="contrast"
        @click="onDownload"
        :disabled="loading"
      ></Button>
      <Button
        :icon="response ? 'pi pi-check' : 'pi pi-bookmark'"
        :label="response ? 'Saved' : 'Save'"
        @click="
          () => {
            if (!isAuthenticated || !user) {
              showDialog()
            } else {
              onSave()
            }
          }
        "
        :disabled="loading || !!response"
      ></Button>
    </div>
  </Dialog>
</template>

<style lang=""></style>
