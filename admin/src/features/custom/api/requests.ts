import { useApp } from '@/hooks/use-app'
import { PersonCustom } from '@/types/custom'

export function requests() {
  const { request } = useApp()

  const createCustom = async (params: {
    personId: number
    data: PersonCustom
  }) => {
    const { personId, data } = params
    return request({
      url: `/persons/${personId}/customs`,
      method: 'post',
      data,
    }).then((res) => res.data)
  }

  const editCustom = async (params: {
    personId: number
    customId: string
    data: PersonCustom
  }) => {
    const { personId, customId, data } = params

    return request({
      url: `/persons/${personId}/customs/${customId}`,
      method: 'patch',
      data,
    }).then((res) => res.data)
  }

  const deleteCustom = async (params: {
    personId: number
    customId: string
  }) => {
    const { personId, customId } = params

    return request({
      url: `/persons/${personId}/customs/${customId}`,
      method: 'delete',
    }).then((res) => res.data)
  }

  return {
    createCustom,
    editCustom,
    deleteCustom,
  }
}
