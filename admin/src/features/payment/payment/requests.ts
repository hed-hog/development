import { useApp } from "@/hooks/use-app";
import { Delete, PaginationParams, PaginationResult } from "@/types";
import { Payment } from "@/types/models";
import { HttpMethod } from "@/types/http-method";

export function requests() {
  const { request } = useApp();

  const paymentList = async (params: PaginationParams) => {
    return request<PaginationResult<Payment>>({
      url: "/payment",
      params,
    }).then((res) => res.data);
  };

  const paymentGet = async (id: number) => {
    return request<Payment>({
      url: `/payment/${id}`,
    }).then((res) => res.data);
  };

  const paymentCreate = async (params: { data: Payment }) => {
    const { data } = params;
    return request<Payment>({
      url: "/payment",
      method: HttpMethod.POST,
      data: data,
    }).then((res) => res.data);
  };

  const paymentDelete = async (ids: number[]) => {
    return request<Delete>({
      url: "/payment",
      data: { ids },
      method: HttpMethod.DELETE,
    }).then((res) => res.data);
  };

  const paymentUpdate = async (params: { id: number; data: Payment }) => {
    const { id, data } = params;
    return request<Payment>({
      url: `/payment/${id}`,
      method: HttpMethod.PATCH,
      data: data,
    }).then((res) => res.data);
  };

  return {
    paymentCreate,
    paymentUpdate,
    paymentDelete,
    paymentList,
    paymentGet,
  };
}
