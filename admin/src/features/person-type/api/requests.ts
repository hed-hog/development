import { useApp } from '@/hooks/use-app'
import { Delete } from '@/types/delete'
import { PersonType } from '@/types/models'

export function requests() {
  const { request } = useApp()

  const createPersonType = async (data: PersonType) => {
    if (!data.id) delete (data as any).id
    return request<PersonType>({
      url: '/person-type',
      method: 'post',
      data,
    }).then((res) => res.data)
  }

  const deletePersonType = async <T>(personTypeIds: T[]) => {
    return request<Delete>({
      url: '/person-type',
      data: { ids: personTypeIds },
      method: 'delete',
    }).then((res) => res.data)
  }

  const editPersonType = async (params: { id: string; data: PersonType }) => {
    const { id, data } = params

    return request<PersonType>({
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
