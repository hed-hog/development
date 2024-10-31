import { useApp } from '@/hooks/use-app'
import { Delete } from '@/types/delete'
import { PersonAddress } from '@/types/models'

export function requests() {
  const { makeRequest } = useApp()

  const addressCreate = async (params: {
    personId: number
    data: PersonAddress
  }) => {
    const { personId, data } = params
    return makeRequest<PersonAddress>(
      `/person/${personId}/address`,
      'post',
      data
    )
  }

  const addressUpdate = async (params: {
    personId: number
    addressId: string
    data: PersonAddress
  }) => {
    const { personId, addressId, data } = params
    return makeRequest<PersonAddress>(
      `/person/${personId}/address/${addressId}`,
      'patch',
      data
    )
  }

  const addressDelete = async (params: {
    personId: number
    addressId: string
  }) => {
    const { personId, addressId } = params
    return makeRequest<Delete>(
      `/person/${personId}/address/${addressId}`,
      'delete'
    )
  }

  return {
    addressCreate,
    addressUpdate,
    addressDelete,
  }
}
