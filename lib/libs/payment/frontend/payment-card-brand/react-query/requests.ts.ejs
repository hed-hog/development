import { useApp } from "@/hooks/use-app";
import { Delete, PaginationParams, PaginationResult } from "@/types";
import { PaymentCardBrand } from "@/types/models";
import { HttpMethod } from "@/types/http-method";

export function requests() {
  const { request } = useApp();

  const paymentCardBrandList = async (params: PaginationParams) => {
    return request<PaginationResult<PaymentCardBrand>>({
      url: "/payment-card-brand",
      params,
    }).then((res) => res.data);
  };

  const paymentCardBrandGet = async (id: number) => {
    return request<PaymentCardBrand>({
      url: `/payment-card-brand/${id}`,
    }).then((res) => res.data);
  };

  const paymentCardBrandCreate = async (params: { data: PaymentCardBrand }) => {
    const { data } = params;
    return request<PaymentCardBrand>({
      url: "/payment-card-brand",
      method: HttpMethod.POST,
      data: data,
    }).then((res) => res.data);
  };

  const paymentCardBrandDelete = async (ids: number[]) => {
    return request<Delete>({
      url: "/payment-card-brand",
      data: { ids },
      method: HttpMethod.DELETE,
    }).then((res) => res.data);
  };

  const paymentCardBrandUpdate = async (params: {
    id: number;
    data: PaymentCardBrand;
  }) => {
    const { id, data } = params;
    return request<PaymentCardBrand>({
      url: `/payment-card-brand/${id}`,
      method: HttpMethod.PATCH,
      data: data,
    }).then((res) => res.data);
  };

  return {
    paymentCardBrandCreate,
    paymentCardBrandUpdate,
    paymentCardBrandDelete,
    paymentCardBrandList,
    paymentCardBrandGet,
  };
}
