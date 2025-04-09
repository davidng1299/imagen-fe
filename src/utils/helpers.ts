import type { ImageFormats } from './types'

export const isNotEmpty = (obj?: object): boolean => {
  if (!obj) return false
  return Object.keys(obj).length > 0
}

export const getDbUserId = (auth0_user_id?: string) => {
  if (!auth0_user_id) {
    return ''
  }
  return auth0_user_id.replace('auth0|', '')
}

export const getFullImageBase64String = (base64: string, image_format: ImageFormats) => {
  return `data:image/${image_format};base64,${base64}`
}
