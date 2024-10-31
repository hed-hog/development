import { useApp } from '@/hooks/use-app'
import { PersonCustom, PersonCustom } from '@/types/models'

export function requests() {
  const { request } = useApp()

  const createCustomType = async (data: PersonCustom) => {
    if (!data.id) delete (data as any).id
    return request({
      url: '/custom-type',
      method: 'post',
      data,
    }).then((res) => res.data)
  }

  const deleteCustomType = async <T>(customTypeIds: T[]) => {
    return request({
      url: '/custom-type',
      data: { ids: customTypeIds },
      method: 'delete',
    }).then((res) => res.data)
  }

  const editCustomType = async (params: { id: string; data: PersonCustom }) => {
    const { id, data } = params

    return request({
      url: `/custom-type/${id}`,
      method: 'patch',
      data,
    }).then((res) => res.data)
  }

  return {
    createCustomType,
    deleteCustomType,
    editCustomType,
  }
}
