import { useApp } from "@/hooks/use-app";
import { Delete, PaginationParams, PaginationResult } from "@/types";
import { Indices } from "@/types/models";
import { HttpMethod } from "@/types/http-method";

export function requests() {
  const { request } = useApp();

  const indicesList = async (params: PaginationParams) => {
    return request<PaginationResult<Indices>>({
      url: "/indices",
      params,
    }).then((res) => res.data);
  };

  const indicesGet = async (id: number) => {
    return request<Indices>({
      url: `/indices/${id}`,
    }).then((res) => res.data);
  };

  const indicesCreate = async (params: { data: Indices }) => {
    const { data } = params;
    return request<Indices>({
      url: "/indices",
      method: HttpMethod.POST,
      data: data,
    }).then((res) => res.data);
  };

  const indicesDelete = async (ids: number[]) => {
    return request<Delete>({
      url: "/indices",
      data: { ids },
      method: HttpMethod.DELETE,
    }).then((res) => res.data);
  };

  const indicesUpdate = async (params: { id: number; data: Indices }) => {
    const { id, data } = params;
    return request<Indices>({
      url: `/indices/${id}`,
      method: HttpMethod.PATCH,
      data: data,
    }).then((res) => res.data);
  };

  return {
    indicesCreate,
    indicesUpdate,
    indicesDelete,
    indicesList,
    indicesGet,
  };
}
