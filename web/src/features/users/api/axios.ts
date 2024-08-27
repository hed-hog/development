import { axios } from '@/lib/axios-client'

export async function getUsers() {
  return axios.get<any>('/users').then((res) => res.data)
}

export async function getItems(start: number, end: number) {
  return axios
    .get<any>(`/posts`, {
      params: { _start: start, _end: end },
    })
    .then((res) => res.data)
}

export async function createUser(data: any) {
  return axios.post<any>('/users', data).then((res) => {
    console.log(res)
    return res.data
  })
}
