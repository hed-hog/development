import Axios from 'axios'
import { toast } from 'sonner'

export const axios = Axios.create({
  baseURL: 'http://localhost:3000',
})

axios.interceptors.response.use(null, function (error) {
  console.log('error', error)
  toast.error(error.message, { id: 'error' })
  return Promise.reject(error)
})
