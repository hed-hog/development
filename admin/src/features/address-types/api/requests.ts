import { useApp } from '@/hooks/use-app'
import { AddressType } from '@/types/address-type'

export function requests() {
  const { request } = useApp()

  const createAddressType = async (data: AddressType) => {
    if (!data.id) delete (data as any).id

    return request({
      url: '/address-types',
      method: 'post',
      data,
    }).then((res) => res.data)
  }

  const deleteAddressTypes = async <T>(addressTypeIds: T[]) => {
    return request({
      url: '/address-types',
      data: { ids: addressTypeIds },
      method: 'delete',
    }).then((res) => res.data)
  }

  const editAddressType = async (params: { id: string; data: AddressType }) => {
    const { id, data } = params

    return request({
      url: `/address-types/${id}`,
      method: 'patch',
      data,
    }).then((res) => res.data)
  }

  return {
    createAddressType,
    deleteAddressTypes,
    editAddressType,
  }
}