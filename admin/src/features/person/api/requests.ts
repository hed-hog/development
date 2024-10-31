import { useApp } from '@/hooks/use-app'
import { PersonType } from '@/types/person'

export function requests() {
  const { request } = useApp()

  const createPerson = async (data: PersonType) => {
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

  const editPerson = async (params: { id: string; data: PersonType }) => {
    const { id, data } = params

    return request({
      url: `/person/${id}`,
      method: 'patch',
      data,
    }).then((res) => res.data)
  }

  return {
    createPerson,
    deletePerson,
    editPerson,
  }
}
