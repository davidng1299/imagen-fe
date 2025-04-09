import api from '@/lib/api'
import type {
  OAImageGenerationRequest,
  OAImageGenerationResponse,
  SaveImageRequest,
  SaveImageResponse,
} from '@/models/dtos/ImageGenerationDto'

export const useImageApi = () => {
  const generateAiImage = async (
    data: OAImageGenerationRequest,
  ): Promise<OAImageGenerationResponse> => {
    const res = await api.post('/api/v1/openai/images/generate', data)
    return res.data
  }

  const saveImage = async (data: SaveImageRequest): Promise<SaveImageResponse> => {
    const res = await api.post('/api/v1/openai/images/save', data)
    return res.data
  }

  return { generateAiImage, saveImage }
}
