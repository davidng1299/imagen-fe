export interface OAImageGenerationRequest {
  prompt: string
  size: string
  style: string
  quality: string
}

export interface OAImageGenerationResponse {
  base64String: string
  size: string
}
