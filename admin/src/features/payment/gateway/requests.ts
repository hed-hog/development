import { useApp } from "@/hooks/use-app";
import { Delete, PaginationParams, PaginationResult } from "@/types";
import { Gateway } from "@/types/models";
import { HttpMethod } from "@/types/http-method";

export function requests() {
  const { request } = useApp();

  const gatewayList = async (params: PaginationParams) => {
    return request<PaginationResult<Gateway>>({
      url: "/gateway",
      params,
    }).then((res) => res.data);
  };

  const gatewayGet = async (id: number) => {
    return request<Gateway>({
      url: `/gateway/${id}`,
    }).then((res) => res.data);
  };

  const gatewayCreate = async (params: { data: Gateway }) => {
    const { data } = params;
    return request<Gateway>({
      url: "/gateway",
      method: HttpMethod.POST,
      data: data,
    }).then((res) => res.data);
  };

  const gatewayDelete = async (ids: number[]) => {
    return request<Delete>({
      url: "/gateway",
      data: { ids },
      method: HttpMethod.DELETE,
    }).then((res) => res.data);
  };

  const gatewayUpdate = async (params: { id: number; data: Gateway }) => {
    const { id, data } = params;
    return request<Gateway>({
      url: `/gateway/${id}`,
      method: HttpMethod.PATCH,
      data: data,
    }).then((res) => res.data);
  };

  return {
    gatewayCreate,
    gatewayUpdate,
    gatewayDelete,
    gatewayList,
    gatewayGet,
  };
}
