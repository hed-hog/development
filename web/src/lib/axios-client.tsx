import Axios from 'axios'
import { toast } from 'sonner'

export const axios = Axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
})

axios.interceptors.response.use(null, function (error) {
  console.log('error', error)
  toast.error(error.message, { id: 'error' })
  return Promise.reject(error)
})
