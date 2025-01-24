import { useApp } from "@/hooks/use-app";
import { Delete, PaginationParams, PaginationResult } from "@/types";
import { PaymentStatus } from "@/types/models";
import { HttpMethod } from "@/types/http-method";
import { formatDataWithLocale } from "@hedhog/utils";

export function requests() {
  const { request } = useApp();

  const paymentStatusList = async (params: PaginationParams) => {
    return request<PaginationResult<PaymentStatus>>({
      url: "/payment-status",
      params,
    }).then((res) => res.data);
  };

  const paymentStatusGet = async (id: number) => {
    return request<PaymentStatus>({
      url: `/payment-status/${id}`,
    }).then((res) => res.data);
  };

  const paymentStatusCreate = async (params: { data: PaymentStatus }) => {
    const { data } = params;
    return request<PaymentStatus>({
      url: "/payment-status",
      method: HttpMethod.POST,
      data: formatDataWithLocale(data),
    }).then((res) => res.data);
  };

  const paymentStatusDelete = async (ids: number[]) => {
    return request<Delete>({
      url: "/payment-status",
      data: { ids },
      method: HttpMethod.DELETE,
    }).then((res) => res.data);
  };

  const paymentStatusUpdate = async (params: {
    id: number;
    data: PaymentStatus;
  }) => {
    const { id, data } = params;
    return request<PaymentStatus>({
      url: `/payment-status/${id}`,
      method: HttpMethod.PATCH,
      data: formatDataWithLocale(data),
    }).then((res) => res.data);
  };

  return {
    paymentStatusCreate,
    paymentStatusUpdate,
    paymentStatusDelete,
    paymentStatusList,
    paymentStatusGet,
  };
}
