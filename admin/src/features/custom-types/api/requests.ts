import { useApp } from '@/hooks/use-app'
import { PersonCustomType } from '@/types/custom-type'

export function requests() {
  const { request } = useApp()

  const createCustomType = async (data: PersonCustomType) => {
    if (!data.id) delete (data as any).id
    return request({
      url: '/custom-types',
      method: 'post',
      data,
    }).then((res) => res.data)
  }

  const deleteCustomTypes = async <T>(customTypeIds: T[]) => {
    return request({
      url: '/custom-types',
      data: { ids: customTypeIds },
      method: 'delete',
    }).then((res) => res.data)
  }

  const editCustomType = async (params: {
    id: string
    data: PersonCustomType
  }) => {
    const { id, data } = params

    return request({
      url: `/custom-types/${id}`,
      method: 'patch',
      data,
    }).then((res) => res.data)
  }

  return {
    createCustomType,
    deleteCustomTypes,
    editCustomType,
  }
}
