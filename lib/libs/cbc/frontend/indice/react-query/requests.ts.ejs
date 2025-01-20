import { useApp } from "@/hooks/use-app";
import { Delete, PaginationParams, PaginationResult } from "@/types";
import { Indice } from "@/types/models";
import { HttpMethod } from "@/types/http-method";

export function requests() {
  const { request } = useApp();

  const indiceList = async (params: PaginationParams) => {
    return request<PaginationResult<Indice>>({
      url: "/indice",
      params,
    }).then((res) => res.data);
  };

  const indiceGet = async (id: number) => {
    return request<Indice>({
      url: `/indice/${id}`,
    }).then((res) => res.data);
  };

  const indiceCreate = async (params: { data: Indice }) => {
    const { data } = params;
    return request<Indice>({
      url: "/indice",
      method: HttpMethod.POST,
      data: data,
    }).then((res) => res.data);
  };

  const indiceDelete = async (ids: number[]) => {
    return request<Delete>({
      url: "/indice",
      data: { ids },
      method: HttpMethod.DELETE,
    }).then((res) => res.data);
  };

  const indiceUpdate = async (params: { id: number; data: Indice }) => {
    const { id, data } = params;
    return request<Indice>({
      url: `/indice/${id}`,
      method: HttpMethod.PATCH,
      data: data,
    }).then((res) => res.data);
  };

  return {
    indiceCreate,
    indiceUpdate,
    indiceDelete,
    indiceList,
    indiceGet,
  };
}
