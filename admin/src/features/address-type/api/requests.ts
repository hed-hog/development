import { useApp } from '@/hooks/use-app'
import { PersonAddressType } from '@/type/address-type'

export function requests() {
  const { request } = useApp()

  const createAddressType = async (data: PersonAddressType) => {
    if (!data.id) delete (data as any).id

    return request({
      url: '/address-type',
      method: 'post',
      data,
    }).then((res) => res.data)
  }

  const deleteAddressType = async <T>(addressTypeIds: T[]) => {
    return request({
      url: '/address-type',
      data: { ids: addressTypeIds },
      method: 'delete',
    }).then((res) => res.data)
  }

  const editAddressType = async (params: {
    id: string
    data: PersonAddressType
  }) => {
    const { id, data } = params

    return request({
      url: `/address-type/${id}`,
      method: 'patch',
      data,
    }).then((res) => res.data)
  }

  return {
    createAddressType,
    deleteAddressType,
    editAddressType,
  }
}
