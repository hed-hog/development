import { useApp } from "@/hooks/use-app";
import { Delete, PaginationParams, PaginationResult } from "@/types";
import { PaymentCoupon } from "@/types/models";
import { HttpMethod } from "@/types/http-method";

export function requests() {
  const { request } = useApp();

  const paymentCouponList = async (params: PaginationParams) => {
    return request<PaginationResult<PaymentCoupon>>({
      url: "/payment-coupon",
      params,
    }).then((res) => res.data);
  };

  const paymentCouponGet = async (id: number) => {
    return request<PaymentCoupon>({
      url: `/payment-coupon/${id}`,
    }).then((res) => res.data);
  };

  const paymentCouponCreate = async (params: { data: PaymentCoupon }) => {
    const { data } = params;
    return request<PaymentCoupon>({
      url: "/payment-coupon",
      method: HttpMethod.POST,
      data: data,
    }).then((res) => res.data);
  };

  const paymentCouponDelete = async (ids: number[]) => {
    return request<Delete>({
      url: "/payment-coupon",
      data: { ids },
      method: HttpMethod.DELETE,
    }).then((res) => res.data);
  };

  const paymentCouponUpdate = async (params: {
    id: number;
    data: PaymentCoupon;
  }) => {
    const { id, data } = params;
    return request<PaymentCoupon>({
      url: `/payment-coupon/${id}`,
      method: HttpMethod.PATCH,
      data: data,
    }).then((res) => res.data);
  };

  return {
    paymentCouponCreate,
    paymentCouponUpdate,
    paymentCouponDelete,
    paymentCouponList,
    paymentCouponGet,
  };
}
