import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_LOCAL_BACKEND_BASE_API,
  headers: {
    'Content-Type': 'application/json',
  },
})

export default api
