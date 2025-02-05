import { useApp } from "@/hooks/use-app";
import { Delete, PaginationParams, PaginationResult } from "@/types";
import { Operation } from "@/types/models";
import { HttpMethod } from "@/types/http-method";

export function requests() {
  const { request } = useApp();

  const operationList = async (params: PaginationParams) => {
    return request<PaginationResult<Operation>>({
      url: "/operation",
      params,
    }).then((res) => res.data);
  };

  const operationGet = async (id: number) => {
    return request<Operation>({
      url: `/operation/${id}`,
    }).then((res) => res.data);
  };

  const operationCreate = async (params: { data: Operation }) => {
    const { data } = params;
    return request<Operation>({
      url: "/operation",
      method: HttpMethod.POST,
      data: data,
    }).then((res) => res.data);
  };

  const operationDelete = async (ids: number[]) => {
    return request<Delete>({
      url: "/operation",
      data: { ids },
      method: HttpMethod.DELETE,
    }).then((res) => res.data);
  };

  const operationUpdate = async (params: { id: number; data: Operation }) => {
    const { id, data } = params;
    return request<Operation>({
      url: `/operation/${id}`,
      method: HttpMethod.PATCH,
      data: data,
    }).then((res) => res.data);
  };

  return {
    operationCreate,
    operationUpdate,
    operationDelete,
    operationList,
    operationGet,
  };
}
