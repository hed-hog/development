import { useApp } from "@/hooks/use-app";
import { Delete, PaginationParams, PaginationResult } from "@/types";
import { PaymentMethodItem } from "@/types/models";
import { HttpMethod } from "@/types/http-method";

export function requests() {
  const { request } = useApp();

  const paymentMethodItemList = async (params: PaginationParams) => {
    return request<PaginationResult<PaymentMethodItem>>({
      url: "/payment-method-item",
      params,
    }).then((res) => res.data);
  };

  const paymentMethodItemGet = async (id: number) => {
    return request<PaymentMethodItem>({
      url: `/payment-method-item/${id}`,
    }).then((res) => res.data);
  };

  const paymentMethodItemCreate = async (params: {
    data: PaymentMethodItem;
  }) => {
    const { data } = params;
    return request<PaymentMethodItem>({
      url: "/payment-method-item",
      method: HttpMethod.POST,
      data: data,
    }).then((res) => res.data);
  };

  const paymentMethodItemDelete = async (ids: number[]) => {
    return request<Delete>({
      url: "/payment-method-item",
      data: { ids },
      method: HttpMethod.DELETE,
    }).then((res) => res.data);
  };

  const paymentMethodItemUpdate = async (params: {
    id: number;
    data: PaymentMethodItem;
  }) => {
    const { id, data } = params;
    return request<PaymentMethodItem>({
      url: `/payment-method-item/${id}`,
      method: HttpMethod.PATCH,
      data: data,
    }).then((res) => res.data);
  };

  return {
    paymentMethodItemCreate,
    paymentMethodItemUpdate,
    paymentMethodItemDelete,
    paymentMethodItemList,
    paymentMethodItemGet,
  };
}
