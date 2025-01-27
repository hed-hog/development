import { useApp } from "@/hooks/use-app";
import { Delete, PaginationParams, PaginationResult } from "@/types";
import { PaymentGateway } from "@/types/models";
import { HttpMethod } from "@/types/http-method";

export function requests() {
  const { request } = useApp();

  const paymentGatewayList = async (params: PaginationParams) => {
    return request<PaginationResult<PaymentGateway>>({
      url: "/payment-gateway",
      params,
    }).then((res) => res.data);
  };

  const paymentGatewayGet = async (id: number) => {
    return request<PaymentGateway>({
      url: `/payment-gateway/${id}`,
    }).then((res) => res.data);
  };

  const paymentGatewayCreate = async (params: { data: PaymentGateway }) => {
    const { data } = params;
    return request<PaymentGateway>({
      url: "/payment-gateway",
      method: HttpMethod.POST,
      data: data,
    }).then((res) => res.data);
  };

  const paymentGatewayDelete = async (ids: number[]) => {
    return request<Delete>({
      url: "/payment-gateway",
      data: { ids },
      method: HttpMethod.DELETE,
    }).then((res) => res.data);
  };

  const paymentGatewayUpdate = async (params: {
    id: number;
    data: PaymentGateway;
  }) => {
    const { id, data } = params;
    return request<PaymentGateway>({
      url: `/payment-gateway/${id}`,
      method: HttpMethod.PATCH,
      data: data,
    }).then((res) => res.data);
  };

  return {
    paymentGatewayCreate,
    paymentGatewayUpdate,
    paymentGatewayDelete,
    paymentGatewayList,
    paymentGatewayGet,
  };
}
