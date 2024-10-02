import { useApp } from '@/hooks/use-app'
import { PersonType } from '@/types/person'

export function requests() {
  const { request } = useApp()

  const createPerson = async (data: PersonType) => {
    delete (data as any).id
    return request({
      url: '/persons',
      method: 'post',
      data,
    }).then((res) => res.data)
  }

  const deletePersons = async <T>(personIds: T[]) => {
    return request({
      url: '/persons',
      data: { ids: personIds },
      method: 'delete',
    }).then((res) => res.data)
  }

  const editPerson = async (params: { id: string; data: PersonType }) => {
    const { id, data } = params

    return request({
      url: `/persons/${id}`,
      method: 'patch',
      data,
    }).then((res) => res.data)
  }

  return {
    createPerson,
    deletePersons,
    editPerson,
  }
}
