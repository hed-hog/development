import { useApp } from '@/hooks/use-app'
import { Delete, PaginationParams, PaginationResult } from '@/types'
import { PaymentCouponItem } from '@/types/models'
import { HttpMethod } from '@/types/http-method'

export function requests() {
  const { request } = useApp()

  const paymentCouponItemList = async (
    couponId: number,
    params: PaginationParams & { id?: number }
  ) => {
    return request<PaginationResult<PaymentCouponItem>>({
      url: `/payment-coupon/${couponId}/payment-coupon-item`,
      params,
    }).then((res) => res.data)
  }

  const paymentCouponItemCreate = async (params: {
    couponId: number
    data: PaymentCouponItem
  }) => {
    const { couponId, data } = params

    return request<PaymentCouponItem>({
      url: `/payment-coupon/${couponId}/payment-coupon-item`,
      method: HttpMethod.POST,
      data: data,
    }).then((res) => res.data)
  }

  const paymentCouponItemUpdate = async (params: {
    couponId: number
    id: number
    data: PaymentCouponItem
  }) => {
    const { couponId, id, data } = params

    return request<PaymentCouponItem>({
      url: `/payment-coupon/${couponId}/payment-coupon-item/${id}`,
      method: HttpMethod.PATCH,
      data: data,
    }).then((res) => res.data)
  }

  const paymentCouponItemDelete = async (params: {
    id: number
    ids: number[]
  }) => {
    const { id, ids } = params

    return request<Delete>({
      url: `/payment-coupon/${id}/payment-coupon-item`,
      method: HttpMethod.DELETE,
      data: { ids },
    }).then((res) => res.data)
  }

  const paymentCouponItemGet = async (params: {
    couponId: number
    id: number
  }) => {
    const { couponId, id } = params

    return request<PaymentCouponItem>({
      url: `/payment-coupon/${couponId}/payment-coupon-item/${id}`,
    }).then((res) => res.data)
  }

  return {
    paymentCouponItemCreate,
    paymentCouponItemUpdate,
    paymentCouponItemDelete,
    paymentCouponItemList,
    paymentCouponItemGet,
  }
}
