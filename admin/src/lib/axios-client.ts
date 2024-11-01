import Axios from 'axios'
import { toast } from 'sonner'
import { getBaseURL } from './get-base-url'

export const axios = Axios.create({
  baseURL: getBaseURL(),
})

axios.interceptors.response.use(null, function (error) {
  console.log('error', error)
  toast.error(error.message, { id: 'error' })
  return Promise.reject(error)
})
