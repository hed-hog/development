import { useApp } from '@/hooks/use-app'
import { PersonDocumentType } from '@/types/document-type'

export function requests() {
  const { request } = useApp()

  const createDocumentType = async (data: PersonDocumentType) => {
    if (!data.id) delete (data as any).id
    return request({
      url: '/document-types',
      method: 'post',
      data,
    }).then((res) => res.data)
  }

  const deleteDocumentTypes = async <T>(documentIds: T[]) => {
    return request({
      url: '/document-types',
      data: { ids: documentIds },
      method: 'delete',
    }).then((res) => res.data)
  }

  const editDocumentType = async (params: {
    id: string
    data: PersonDocumentType
  }) => {
    const { id, data } = params

    return request({
      url: `/document-types/${id}`,
      method: 'patch',
      data,
    }).then((res) => res.data)
  }

  return {
    createDocumentType,
    deleteDocumentTypes,
    editDocumentType,
  }
}
