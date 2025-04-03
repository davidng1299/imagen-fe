import api from '@/lib/api'
import type { UserLoginRequest } from '@/models/dtos/UserDto'

export const useAuth = () => {
  const getUser = async (data: UserLoginRequest) => {
    const res = await api.post(`/api/v1/users/login`, data)
    return res.data
  }

  return { getUser }
}
