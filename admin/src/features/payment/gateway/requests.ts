import { useApp } from '@/hooks/use-app'
import { Delete, PaginationParams, PaginationResult } from '@/types'
import { PaymentGateway } from '@/types/models'
import { HttpMethod } from '@/types/http-method'

export function requests() {
  const { request } = useApp()

  const gatewayList = async (params: PaginationParams) => {
    return request<PaginationResult<PaymentGateway>>({
      url: '/gateway',
      params,
    }).then((res) => res.data)
  }

  const gatewayGet = async (id: number) => {
    return request<PaymentGateway>({
      url: `/gateway/${id}`,
    }).then((res) => res.data)
  }

  const gatewayCreate = async (params: { data: PaymentGateway }) => {
    const { data } = params
    return request<PaymentGateway>({
      url: '/gateway',
      method: HttpMethod.POST,
      data: data,
    }).then((res) => res.data)
  }

  const gatewayDelete = async (ids: number[]) => {
    return request<Delete>({
      url: '/gateway',
      data: { ids },
      method: HttpMethod.DELETE,
    }).then((res) => res.data)
  }

  const gatewayUpdate = async (params: {
    id: number
    data: PaymentGateway
  }) => {
    const { id, data } = params
    return request<PaymentGateway>({
      url: `/gateway/${id}`,
      method: HttpMethod.PATCH,
      data: data,
    }).then((res) => res.data)
  }

  return {
    gatewayCreate,
    gatewayUpdate,
    gatewayDelete,
    gatewayList,
    gatewayGet,
  }
}
