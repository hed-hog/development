import { useApp } from '@/hooks/use-app'
import { Delete, PaginationParams, PaginationResult } from '@/types'
import { PaymentValue } from '@/types/models'
import { HttpMethod } from '@/types/http-method'

export function requests() {
  const { request } = useApp()

  const paymentValueList = async (
    paymentId: number,
    params: PaginationParams & { id?: number }
  ) => {
    return request<PaginationResult<PaymentValue>>({
      url: `/payment/${paymentId}/payment-value`,
      params,
    }).then((res) => res.data)
  }

  const paymentValueCreate = async (params: {
    paymentId: number
    data: PaymentValue
  }) => {
    const { paymentId, data } = params

    return request<PaymentValue>({
      url: `/payment/${paymentId}/payment-value`,
      method: HttpMethod.POST,
      data: data,
    }).then((res) => res.data)
  }

  const paymentValueUpdate = async (params: {
    paymentId: number
    id: number
    data: PaymentValue
  }) => {
    const { paymentId, id, data } = params

    return request<PaymentValue>({
      url: `/payment/${paymentId}/payment-value/${id}`,
      method: HttpMethod.PATCH,
      data: data,
    }).then((res) => res.data)
  }

  const paymentValueDelete = async (params: { id: number; ids: number[] }) => {
    const { id, ids } = params

    return request<Delete>({
      url: `/payment/${id}/payment-value`,
      method: HttpMethod.DELETE,
      data: { ids },
    }).then((res) => res.data)
  }

  const paymentValueGet = async (params: { paymentId: number; id: number }) => {
    const { paymentId, id } = params

    return request<PaymentValue>({
      url: `/payment/${paymentId}/payment-value/${id}`,
    }).then((res) => res.data)
  }

  return {
    paymentValueCreate,
    paymentValueUpdate,
    paymentValueDelete,
    paymentValueList,
    paymentValueGet,
  }
}
