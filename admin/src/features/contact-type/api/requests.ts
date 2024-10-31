import { useApp } from '@/hooks/use-app'
import { PersonContactType } from '@/type/contact-type'

export function requests() {
  const { request } = useApp()

  const createContactType = async (data: PersonContactType) => {
    if (!data.id) delete (data as any).id
    return request({
      url: '/contact-type',
      method: 'post',
      data,
    }).then((res) => res.data)
  }

  const deleteContactType = async <T>(contactTypeIds: T[]) => {
    return request({
      url: '/contact-type',
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
      url: `/contact-type/${id}`,
      method: 'patch',
      data,
    }).then((res) => res.data)
  }

  return {
    createContactType,
    deleteContactType,
    editContactType,
  }
}
