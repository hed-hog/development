import { useApp } from '@/hooks/use-app'
import { Delete, PaginationParams, PaginationResult } from '@/types'
import { SubscriptionPerson } from '@/types/models'
import { HttpMethod } from '@/types/http-method'

export function requests() {
  const { request } = useApp()

  const subscriptionPersonList = async (
    subscriptionId: number,
    params: PaginationParams & { id?: number }
  ) => {
    return request<PaginationResult<SubscriptionPerson>>({
      url: `/subscription/${subscriptionId}/subscription-person`,
      params,
    }).then((res) => res.data)
  }

  const subscriptionPersonCreate = async (params: {
    subscriptionId: number
    data: SubscriptionPerson
  }) => {
    const { subscriptionId, data } = params

    return request<SubscriptionPerson>({
      url: `/subscription/${subscriptionId}/subscription-person`,
      method: HttpMethod.POST,
      data: data,
    }).then((res) => res.data)
  }

  const subscriptionPersonUpdate = async (params: {
    subscriptionId: number
    id: number
    data: SubscriptionPerson
  }) => {
    const { subscriptionId, id, data } = params

    return request<SubscriptionPerson>({
      url: `/subscription/${subscriptionId}/subscription-person/${id}`,
      method: HttpMethod.PATCH,
      data: data,
    }).then((res) => res.data)
  }

  const subscriptionPersonDelete = async (params: {
    id: number
    ids: number[]
  }) => {
    const { id, ids } = params

    return request<Delete>({
      url: `/subscription/${id}/subscription-person`,
      method: HttpMethod.DELETE,
      data: { ids },
    }).then((res) => res.data)
  }

  const subscriptionPersonGet = async (params: {
    subscriptionId: number
    id: number
  }) => {
    const { subscriptionId, id } = params

    return request<SubscriptionPerson>({
      url: `/subscription/${subscriptionId}/subscription-person/${id}`,
    }).then((res) => res.data)
  }

  return {
    subscriptionPersonCreate,
    subscriptionPersonUpdate,
    subscriptionPersonDelete,
    subscriptionPersonList,
    subscriptionPersonGet,
  }
}
