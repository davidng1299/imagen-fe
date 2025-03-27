<script setup lang="ts">
  import { ref } from 'vue'
  import { OAImageSizeOptions, OAImageQualityOptions, OAImageStyleOptions } from './utils/constants'
  import { z } from 'zod'
  import { zodResolver } from '@primevue/forms/resolvers/zod'
  import Select from 'primevue/select'
  import type { FormSubmitEvent } from '@primevue/forms'
  import { usePromptApi } from '@/composables/usePromptApi'

  interface PromptInput {
    prompt: string
    size: string
    style: string
    quality: string
  }

  const { generateAiImage } = usePromptApi()

  const loading = ref(false)
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
      await generateAiImage({
        prompt: event.states.prompt.value,
        size: event.states.size.value,
        style: event.states.style.value,
        quality: event.states.quality.value,
      })
    } catch {
      console.log('Error!')
    } finally {
      loading.value = false
    }
  }
</script>

<template>
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
