import { useApp } from '@/hooks/use-app'
import { PersonAddress } from '@/types/address'

export function requests() {
  const { request } = useApp()

  const createAddress = async (params: {
    personId: number
    data: PersonAddress
  }) => {
    const { personId, data } = params
    return request({
      url: `/persons/${personId}/address`,
      method: 'post',
      data,
    }).then((res) => res.data)
  }

  const editAddress = async (params: {
    personId: number
    addressId: string
    data: PersonAddress
  }) => {
    const { personId, addressId, data } = params

    return request({
      url: `/persons/${personId}/address/${addressId}`,
      method: 'patch',
      data,
    }).then((res) => res.data)
  }

  const deleteAddress = async (params: {
    personId: number
    addressId: string
  }) => {
    const { personId, addressId } = params

    return request({
      url: `/persons/${personId}/address/${addressId}`,
      method: 'delete',
    }).then((res) => res.data)
  }

  return {
    createAddress,
    editAddress,
    deleteAddress,
  }
}
