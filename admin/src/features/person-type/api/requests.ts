import { useApp } from '@/hooks/use-app'
import { PersonType } from '@/type/person-type'

export function requests() {
  const { request } = useApp()

  const createPersonType = async (data: PersonType) => {
    if (!data.id) delete (data as any).id
    return request({
      url: '/person-type',
      method: 'post',
      data,
    }).then((res) => res.data)
  }

  const deletePersonType = async <T>(personTypeIds: T[]) => {
    return request({
      url: '/person-type',
      data: { ids: personTypeIds },
      method: 'delete',
    }).then((res) => res.data)
  }

  const editPersonType = async (params: { id: string; data: PersonType }) => {
    const { id, data } = params

    return request({
      url: `/person-type/${id}`,
      method: 'patch',
      data,
    }).then((res) => res.data)
  }

  return {
    createPersonType,
    deletePersonType,
    editPersonType,
  }
}
