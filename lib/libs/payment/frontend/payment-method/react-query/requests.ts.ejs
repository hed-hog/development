import { useApp } from "@/hooks/use-app";
import { Delete, PaginationParams, PaginationResult } from "@/types";
import { PaymentMethod } from "@/types/models";
import { HttpMethod } from "@/types/http-method";

export function requests() {
  const { request } = useApp();

  const paymentMethodList = async (params: PaginationParams) => {
    return request<PaginationResult<PaymentMethod>>({
      url: "/payment-method",
      params,
    }).then((res) => res.data);
  };

  const paymentMethodGet = async (id: number) => {
    return request<PaymentMethod>({
      url: `/payment-method/${id}`,
    }).then((res) => res.data);
  };

  const paymentMethodCreate = async (params: { data: PaymentMethod }) => {
    const { data } = params;
    return request<PaymentMethod>({
      url: "/payment-method",
      method: HttpMethod.POST,
      data: data,
    }).then((res) => res.data);
  };

  const paymentMethodDelete = async (ids: number[]) => {
    return request<Delete>({
      url: "/payment-method",
      data: { ids },
      method: HttpMethod.DELETE,
    }).then((res) => res.data);
  };

  const paymentMethodUpdate = async (params: {
    id: number;
    data: PaymentMethod;
  }) => {
    const { id, data } = params;
    return request<PaymentMethod>({
      url: `/payment-method/${id}`,
      method: HttpMethod.PATCH,
      data: data,
    }).then((res) => res.data);
  };

  return {
    paymentMethodCreate,
    paymentMethodUpdate,
    paymentMethodDelete,
    paymentMethodList,
    paymentMethodGet,
  };
}
