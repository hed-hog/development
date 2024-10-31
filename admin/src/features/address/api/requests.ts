import { useApp } from '@/hooks/use-app'
import { Delete } from '@/types/delete'
import { HttpMethod } from '@/types/http-method'
import { PersonAddress } from '@/types/models'

export function requests() {
  const { request } = useApp()

  const addressCreate = async (params: {
    personId: number
    data: PersonAddress
  }) => {
    const { personId, data } = params
    return request<PersonAddress>({
      url: `/person/${personId}/address`,
      method: HttpMethod.POST,
      data,
    })
  }

  const addressUpdate = async (params: {
    personId: number
    addressId: string
    data: PersonAddress
  }) => {
    const { personId, addressId, data } = params
    return request<PersonAddress>({
      url: `/person/${personId}/address/${addressId}`,
      method: HttpMethod.PATCH,
      data,
    })
  }

  const addressDelete = async (params: {
    personId: number
    addressId: string
  }) => {
    const { personId, addressId } = params
    return request<Delete>({
      url: `/person/${personId}/address/${addressId}`,
      method: HttpMethod.DELETE,
    })
  }

  return {
    addressCreate,
    addressUpdate,
    addressDelete,
  }
}
