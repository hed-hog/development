import { useApp } from '@/hooks/use-app'
import { Delete, PaginationParams, PaginationResult } from '@/types'
import { SubscriptionPlanGateway } from '@/types/models'
import { HttpMethod } from '@/types/http-method'

export function requests() {
  const { request } = useApp()

  const subscriptionPlanGatewayList = async (
    planId: number,
    params: PaginationParams & { id?: number }
  ) => {
    return request<PaginationResult<SubscriptionPlanGateway>>({
      url: `/subscription-plan/${planId}/subscription-plan-gateway`,
      params,
    }).then((res) => res.data)
  }

  const subscriptionPlanGatewayCreate = async (params: {
    planId: number
    data: SubscriptionPlanGateway
  }) => {
    const { planId, data } = params

    return request<SubscriptionPlanGateway>({
      url: `/subscription-plan/${planId}/subscription-plan-gateway`,
      method: HttpMethod.POST,
      data: data,
    }).then((res) => res.data)
  }

  const subscriptionPlanGatewayUpdate = async (params: {
    planId: number
    id: number
    data: SubscriptionPlanGateway
  }) => {
    const { planId, id, data } = params

    return request<SubscriptionPlanGateway>({
      url: `/subscription-plan/${planId}/subscription-plan-gateway/${id}`,
      method: HttpMethod.PATCH,
      data: data,
    }).then((res) => res.data)
  }

  const subscriptionPlanGatewayDelete = async (params: {
    id: number
    ids: number[]
  }) => {
    const { id, ids } = params

    return request<Delete>({
      url: `/subscription-plan/${id}/subscription-plan-gateway`,
      method: HttpMethod.DELETE,
      data: { ids },
    }).then((res) => res.data)
  }

  const subscriptionPlanGatewayGet = async (params: {
    planId: number
    id: number
  }) => {
    const { planId, id } = params

    return request<SubscriptionPlanGateway>({
      url: `/subscription-plan/${planId}/subscription-plan-gateway/${id}`,
    }).then((res) => res.data)
  }

  return {
    subscriptionPlanGatewayCreate,
    subscriptionPlanGatewayUpdate,
    subscriptionPlanGatewayDelete,
    subscriptionPlanGatewayList,
    subscriptionPlanGatewayGet,
  }
}
