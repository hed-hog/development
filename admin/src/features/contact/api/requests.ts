import { useApp } from '@/hooks/use-app'
import { PersonContact } from '@/types/contact'

export function requests() {
  const { request } = useApp()

  const createContact = async (params: {
    personId: number
    data: PersonContact
  }) => {
    const { personId, data } = params
    return request({
      url: `/persons/${personId}/contacts`,
      method: 'post',
      data,
    }).then((res) => res.data)
  }

  const editContact = async (params: {
    personId: number
    contactId: string
    data: PersonContact
  }) => {
    const { personId, contactId, data } = params

    return request({
      url: `/persons/${personId}/contacts/${contactId}`,
      method: 'patch',
      data,
    }).then((res) => res.data)
  }

  const deleteContact = async (params: {
    personId: number
    contactId: string
  }) => {
    const { personId, contactId } = params

    return request({
      url: `/persons/${personId}/contacts/${contactId}`,
      method: 'delete',
    }).then((res) => res.data)
  }

  return {
    createContact,
    editContact,
    deleteContact,
  }
}
