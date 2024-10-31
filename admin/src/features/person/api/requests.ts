import { useApp } from '@/hooks/use-app'
import { Person } from '@/types/models'

export function requests() {
  const { request } = useApp()

  const listPerson = async () => {
    return request({
      url: '/person',
    }).then((res) => res.data)
  }

  const getPerson = async (params: { id: string }) => {
    const { id } = params
    return request({
      url: `/person/${id}`,
    }).then((res) => res.data)
  }

  const createPerson = async (data: Person) => {
    if (!data.id) delete (data as any).id
    return request({
      url: '/person',
      method: 'post',
      data,
    }).then((res) => res.data)
  }

  const deletePerson = async <T>(personIds: T[]) => {
    return request({
      url: '/person',
      data: { ids: personIds },
      method: 'delete',
    }).then((res) => res.data)
  }

  const editPerson = async (params: { id: string; data: Person }) => {
    const { id, data } = params

    return request({
      url: `/person/${id}`,
      method: 'patch',
      data,
    }).then((res) => res.data)
  }

  return {
    listPerson,
    getPerson,
    createPerson,
    deletePerson,
    editPerson,
  }
}
