<script setup lang="ts">
  import { ref } from 'vue'
  import { OAImageSizeOptions, OAImageStyleOptions } from './utils/constants'
  import { z } from 'zod'
  import { zodResolver } from '@primevue/forms/resolvers/zod'
  import Select from 'primevue/select'
  import type { FormSubmitEvent } from '@primevue/forms'
  import { useImageApi } from '@/composables/useImageApi'
  import ImageModal from '../ImageModal/ImageModal.vue'
  import TipsComponent from '../TipsComponent/TipsComponent.vue'
  import type { OAImageGenerationResponse } from '@/models/dtos/ImageGenerationDto'
  import { useToast } from 'primevue/usetoast'

  interface PromptInput {
    prompt: string
    size: string
    style: string
    quality: string
  }

  const { generateAiImage } = useImageApi()
  const toast = useToast()
  const loading = ref(false)
  const isOpen = ref(false)
  const isHD = ref(false)
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
        quality: isHD.value ? 'hd' : 'standard',
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

  const toggleHd = () => {
    isHD.value = !isHD.value
  }
</script>

<template>
  <Toast />
  <p class="text-2xl">Type your thoughts. Watch them become images.</p>
  <Form :initialValues :resolver @submit="onSubmit" class="w-full rounded-2xl border p-2 my-5">
    <div class="relative">
      <FormField name="size">
        <Textarea
          id="prompt"
          name="prompt"
          rows="3"
          class="w-full border-none shadow-none pr-12"
          style="resize: none"
          :disabled="loading"
          placeholder="Start describing your image..."
        ></Textarea>
      </FormField>

      <div class="flex justify-between">
        <div class="flex gap-2 items-center">
          <FormField name="size">
            <Select
              name="size"
              optionLabel="label"
              optionValue="value"
              :options="OAImageSizeOptions"
              :disabled="loading"
              class="w-[110px]"
              size="small"
              :pt="{
                label: 'pr-0',
                dropdown: 'w-8',
              }"
            >
              <template #header>
                <div class="text-sm px-3 py-1">
                  <b>Size</b>
                </div>
              </template>
            </Select>
          </FormField>

          <FormField name="style">
            <Select
              name="style"
              optionLabel="label"
              optionValue="value"
              :disabled="loading"
              :options="OAImageStyleOptions"
              size="small"
              class="w-[100px]"
              :pt="{
                label: 'pr-0',
                dropdown: 'w-8',
              }"
            >
              <template #header>
                <div class="text-sm px-3 py-1 flex justify-between items-center">
                  <b>Style</b>
                  <i
                    class="pi pi-info-circle"
                    v-tooltip.right="{
                      value:
                        'Vivid generates hyper-real and dramatic images. Natural produces more natural, less hyper-real looking images.',
                      pt: {
                        text: 'text-xs',
                      },
                      showDelay: 500,
                    }"
                  ></i>
                </div>
              </template>
            </Select>
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

      <Button
        :class="`${isHD ? 'toggle-on' : 'toggle-off'} text-black border-surface p-2 bg-transparent h-6 rounded-md text-xs border absolute top-0 right-0`"
        @click="toggleHd"
        v-tooltip.right="{
          value: 'HD creates images with finer details and greater consistency across the image.',
          pt: {
            text: 'text-xs',
          },
          showDelay: 500,
        }"
      >
        HD
      </Button>
    </div>
  </Form>
  <TipsComponent />

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

  .toggle-on {
    background-color: var(--primary-400);
    color: var(--primary);
  }
</style>
