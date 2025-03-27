import api from '@/lib/api'
import type { OAImageGenerationRequest } from '@/models/dtos/ImageGenerationRequestDto'

export const usePromptApi = () => {
  const generateAiImage = async (data: OAImageGenerationRequest) => {
    const res = await api.post('/api/v1/openai/images/generate', data)
    return res.data
  }

  return { generateAiImage }
}
