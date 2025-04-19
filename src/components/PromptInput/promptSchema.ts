import { z, ZodType } from 'zod'
import { AcceptedModel3Sizes } from './utils/constants'

interface PromptInput {
  prompt: string
  size: string
  style: string
  quality: string
}

export const PromptSchema: ZodType<PromptInput> = z
  .object({
    prompt: z.string().min(1, { message: 'Please enter a prompt' }),
    size: z.string(),
    style: z.string(),
    quality: z.string(),
  })
  .refine(
    (data) =>
      (data.quality === 'hd' || data.style === 'natural') &&
      !AcceptedModel3Sizes.includes(data.size),
    {
      message: 'Please select a different size',
    },
  )
