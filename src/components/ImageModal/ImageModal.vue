<script setup lang="ts">
  import { useImageApi } from '@/composables/useImageApi'
  import { getDbUserId } from '@/utils/helpers'
  import { useAuth0 } from '@auth0/auth0-vue'
  import { useToast } from 'primevue'
  import { ref } from 'vue'
  import { getFullImageBase64String } from '@/utils/helpers'
  import type { SaveImageResponse } from '@/models/dtos/ImageGenerationDto'

  const props = defineProps<{
    isOpen: boolean
    onClose: () => void
    base64_string: string
  }>()

  const { user } = useAuth0()
  const toast = useToast()
  const loading = ref(false)
  const response = ref<SaveImageResponse | undefined>(undefined)
  const { saveImage } = useImageApi()

  const onSave = async () => {
    try {
      loading.value = true

      response.value = await saveImage({
        base64String: props.base64_string,
        userId: getDbUserId(user.value?.sub),
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
    const imageUrl = getFullImageBase64String(props.base64_string, 'png')
    const link = document.createElement('a')
    link.href = imageUrl
    link.download = 'downloaded-image.png'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }
</script>

<template>
  <Dialog
    :visible="isOpen"
    @update:visible="onClose"
    modal
    header="Your image is ready!"
    :pt="{
      content: 'flex flex-col items-center',
    }"
  >
    <Image
      class="min-w-[500px] max-w-4xl flex items-center justify-center p-6"
      :src="getFullImageBase64String(base64_string, 'png')"
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
        @click="onSave"
        :disabled="loading || !!response"
      ></Button>
    </div>
  </Dialog>
</template>

<style lang=""></style>
