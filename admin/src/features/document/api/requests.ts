import { useApp } from '@/hooks/use-app'
import { PersonDocument } from '@/types/document'

export function requests() {
  const { request } = useApp()

  const createDocument = async (params: {
    personId: number
    data: PersonDocument
  }) => {
    const { personId, data } = params
    return request({
      url: `/person/${personId}/document`,
      method: 'post',
      data,
    }).then((res) => res.data)
  }

  const editDocument = async (params: {
    personId: number
    documentId: string
    data: PersonDocument
  }) => {
    const { personId, documentId, data } = params

    return request({
      url: `/person/${personId}/document/${documentId}`,
      method: 'patch',
      data,
    }).then((res) => res.data)
  }

  const deleteDocument = async (params: {
    personId: number
    documentId: string
  }) => {
    const { personId, documentId } = params

    return request({
      url: `/person/${personId}/document/${documentId}`,
      method: 'delete',
    }).then((res) => res.data)
  }

  return {
    createDocument,
    editDocument,
    deleteDocument,
  }
}
