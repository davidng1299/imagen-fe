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
