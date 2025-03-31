<script setup lang="ts">
  import { ref } from 'vue'
  import { OAImageSizeOptions, OAImageQualityOptions, OAImageStyleOptions } from './utils/constants'
  import { z } from 'zod'
  import { zodResolver } from '@primevue/forms/resolvers/zod'
  import Select from 'primevue/select'
  import type { FormSubmitEvent } from '@primevue/forms'
  import { usePromptApi } from '@/composables/usePromptApi'
  import ImageModal from '../ImageModal/ImageModal.vue'
  import type { OAImageGenerationResponse } from '@/models/dtos/ImageGenerationDto'
  import { useToast } from 'primevue/usetoast'

  interface PromptInput {
    prompt: string
    size: string
    style: string
    quality: string
  }

  const { generateAiImage } = usePromptApi()
  const toast = useToast()
  const loading = ref(false)
  const isOpen = ref(false)
  const response = ref<OAImageGenerationResponse | undefined>(undefined)
  const initialValues = ref<PromptInput>({
    prompt: '',
    size: '256x256',
    style: 'vivid',
    quality: 'standard',
  })

  const resolver = zodResolver(
    z.object({
      prompt: z.string().min(1, { message: 'Please enter a prompt' }),
    }),
  )

  const onSubmit = async (event: FormSubmitEvent) => {
    try {
      loading.value = true
      response.value = await generateAiImage({
        prompt: event.states.prompt.value,
        size: event.states.size.value,
        style: event.states.style.value,
        quality: event.states.quality.value,
      })
      isOpen.value = true
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

  const onClose = () => {
    isOpen.value = false
  }
</script>

<template>
  <Toast />
  <Form :initialValues :resolver @submit="onSubmit" class="w-full rounded-2xl border p-2">
    <div>
      <FormField name="size">
        <Textarea
          id="prompt"
          name="prompt"
          rows="3"
          class="w-full border-none shadow-none"
          style="resize: none"
          placeholder="Ask anything..."
        ></Textarea>
      </FormField>

      <div class="flex justify-between">
        <div class="flex gap-2">
          <FormField name="size">
            <Select
              name="size"
              optionLabel="label"
              optionValue="value"
              :options="OAImageSizeOptions"
              :disabled="loading"
              class="w-[130px]"
              :pt="{
                label: 'pr-0',
              }"
            />
          </FormField>
          <FormField name="style">
            <Select
              name="style"
              optionLabel="label"
              optionValue="value"
              :disabled="loading"
              :options="OAImageStyleOptions"
              class="w-[110px]"
              :pt="{
                label: 'pr-0',
              }"
            />
          </FormField>
          <FormField name="quality">
            <Select
              name="quality"
              optionLabel="label"
              optionValue="value"
              :options="OAImageQualityOptions"
              :disabled="loading"
              class="w-[80px]"
              :pt="{
                label: 'pr-0',
              }"
            />
          </FormField>
        </div>
        <Button
          type="submit"
          icon="pi pi-search"
          :loading="loading"
          class="generate-button"
          variant="text"
          aria-label="Generate"
        />
      </div>
    </div>
  </Form>

  <ImageModal
    v-if="response?.base64String"
    :base64_string="response?.base64String"
    :isOpen="isOpen"
    :onClose="onClose"
  />
</template>

<style scoped>
  .generate-button {
    background-color: black;
    color: var(--primary);
    &:hover {
      opacity: 0.6;
    }
  }

  .p-togglebutton-content {
    padding: 0;
  }
</style>
