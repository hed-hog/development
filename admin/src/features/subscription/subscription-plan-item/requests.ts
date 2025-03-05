import { useApp } from '@/hooks/use-app'
import { Delete, PaginationParams, PaginationResult } from '@/types'
import { SubscriptionPlan } from '@/types/models'
import { HttpMethod } from '@/types/http-method'

export function requests() {
  const { request } = useApp()

  const subscriptionPlanItemList = async (params: PaginationParams) => {
    return request<PaginationResult<SubscriptionPlan>>({
      url: '/item',
      params,
    }).then((res) => res.data)
  }

  const subscriptionPlanItemGet = async (id: number) => {
    return request<SubscriptionPlan>({
      url: `/item/${id}`,
    }).then((res) => res.data)
  }

  const subscriptionPlanItemCreate = async (params: {
    data: SubscriptionPlan
  }) => {
    const { data } = params
    return request<SubscriptionPlan>({
      url: '/item',
      method: HttpMethod.POST,
      data: data,
    }).then((res) => res.data)
  }

  const subscriptionPlanItemDelete = async (ids: number[]) => {
    return request<Delete>({
      url: '/item',
      data: { ids },
      method: HttpMethod.DELETE,
    }).then((res) => res.data)
  }

  const subscriptionPlanItemUpdate = async (params: {
    id: number
    data: SubscriptionPlan
  }) => {
    const { id, data } = params
    return request<SubscriptionPlan>({
      url: `/item/${id}`,
      method: HttpMethod.PATCH,
      data: data,
    }).then((res) => res.data)
  }

  return {
    subscriptionPlanItemCreate,
    subscriptionPlanItemUpdate,
    subscriptionPlanItemDelete,
    subscriptionPlanItemList,
    subscriptionPlanItemGet,
  }
}
