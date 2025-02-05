import { useApp } from "@/hooks/use-app";
import { Delete, PaginationParams, PaginationResult } from "@/types";
import { Banking } from "@/types/models";
import { HttpMethod } from "@/types/http-method";

export function requests() {
  const { request } = useApp();

  const bankingList = async (params: PaginationParams) => {
    return request<PaginationResult<Banking>>({
      url: "/banking",
      params,
    }).then((res) => res.data);
  };

  const bankingGet = async (id: number) => {
    return request<Banking>({
      url: `/banking/${id}`,
    }).then((res) => res.data);
  };

  const bankingCreate = async (params: { data: Banking }) => {
    const { data } = params;
    return request<Banking>({
      url: "/banking",
      method: HttpMethod.POST,
      data: data,
    }).then((res) => res.data);
  };

  const bankingDelete = async (ids: number[]) => {
    return request<Delete>({
      url: "/banking",
      data: { ids },
      method: HttpMethod.DELETE,
    }).then((res) => res.data);
  };

  const bankingUpdate = async (params: { id: number; data: Banking }) => {
    const { id, data } = params;
    return request<Banking>({
      url: `/banking/${id}`,
      method: HttpMethod.PATCH,
      data: data,
    }).then((res) => res.data);
  };

  return {
    bankingCreate,
    bankingUpdate,
    bankingDelete,
    bankingList,
    bankingGet,
  };
}
