import { useApp } from '@/hooks/use-app'
import { Delete, PaginationParams, PaginationResult } from '@/types'
import { SubscriptionValue } from '@/types/models'
import { HttpMethod } from '@/types/http-method'

export function requests() {
  const { request } = useApp()

  const subscriptionValueList = async (
    subscriptionId: number,
    params: PaginationParams & { id?: number }
  ) => {
    return request<PaginationResult<SubscriptionValue>>({
      url: `/subscription/${subscriptionId}/subscription-value`,
      params,
    }).then((res) => res.data)
  }

  const subscriptionValueCreate = async (params: {
    subscriptionId: number
    data: SubscriptionValue
  }) => {
    const { subscriptionId, data } = params

    return request<SubscriptionValue>({
      url: `/subscription/${subscriptionId}/subscription-value`,
      method: HttpMethod.POST,
      data: data,
    }).then((res) => res.data)
  }

  const subscriptionValueUpdate = async (params: {
    subscriptionId: number
    id: number
    data: SubscriptionValue
  }) => {
    const { subscriptionId, id, data } = params

    return request<SubscriptionValue>({
      url: `/subscription/${subscriptionId}/subscription-value/${id}`,
      method: HttpMethod.PATCH,
      data: data,
    }).then((res) => res.data)
  }

  const subscriptionValueDelete = async (params: {
    id: number
    ids: number[]
  }) => {
    const { id, ids } = params

    return request<Delete>({
      url: `/subscription/${id}/subscription-value`,
      method: HttpMethod.DELETE,
      data: { ids },
    }).then((res) => res.data)
  }

  const subscriptionValueGet = async (params: {
    subscriptionId: number
    id: number
  }) => {
    const { subscriptionId, id } = params

    return request<SubscriptionValue>({
      url: `/subscription/${subscriptionId}/subscription-value/${id}`,
    }).then((res) => res.data)
  }

  return {
    subscriptionValueCreate,
    subscriptionValueUpdate,
    subscriptionValueDelete,
    subscriptionValueList,
    subscriptionValueGet,
  }
}
