import api from '@/lib/api'
import type {
  GetImagesRequest,
  OAImageGenerationRequest,
  OAImageGenerationResponse,
  SaveImageRequest,
  SaveImageResponse,
} from '@/models/dtos/ImageDto'
import type { OAImage } from '@/models/Image'

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

  const getImages = async (data: GetImagesRequest): Promise<OAImage[]> => {
    const res = await api.get(`/api/v1/openai/images?userId=${data.userId}`)
    return res.data
  }

  return { generateAiImage, saveImage, getImages }
}
