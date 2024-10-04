import { useApp } from '@/hooks/use-app'
import { PersonContactType } from '@/types/contact-type'

export function requests() {
  const { request } = useApp()

  const createContactType = async (data: PersonContactType) => {
    if (!data.id) delete (data as any).id
    return request({
      url: '/contact-types',
      method: 'post',
      data,
    }).then((res) => res.data)
  }

  const deleteContactTypes = async <T>(contactTypeIds: T[]) => {
    return request({
      url: '/contact-types',
      data: { ids: contactTypeIds },
      method: 'delete',
    }).then((res) => res.data)
  }

  const editContactType = async (params: {
    id: string
    data: PersonContactType
  }) => {
    const { id, data } = params

    return request({
      url: `/contact-types/${id}`,
      method: 'patch',
      data,
    }).then((res) => res.data)
  }

  return {
    createContactType,
    deleteContactTypes,
    editContactType,
  }
}
