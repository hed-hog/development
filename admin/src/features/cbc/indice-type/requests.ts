import { useApp } from "@/hooks/use-app";
import { Delete, PaginationParams, PaginationResult } from "@/types";
import { IndiceType } from "@/types/models";
import { HttpMethod } from "@/types/http-method";

export function requests() {
  const { request } = useApp();

  const indiceTypeList = async (params: PaginationParams) => {
    return request<PaginationResult<IndiceType>>({
      url: "/indice-type",
      params,
    }).then((res) => res.data);
  };

  const indiceTypeGet = async (id: number) => {
    return request<IndiceType>({
      url: `/indice-type/${id}`,
    }).then((res) => res.data);
  };

  const indiceTypeCreate = async (params: { data: IndiceType }) => {
    const { data } = params;
    return request<IndiceType>({
      url: "/indice-type",
      method: HttpMethod.POST,
      data: data,
    }).then((res) => res.data);
  };

  const indiceTypeDelete = async (ids: number[]) => {
    return request<Delete>({
      url: "/indice-type",
      data: { ids },
      method: HttpMethod.DELETE,
    }).then((res) => res.data);
  };

  const indiceTypeUpdate = async (params: { id: number; data: IndiceType }) => {
    const { id, data } = params;
    return request<IndiceType>({
      url: `/indice-type/${id}`,
      method: HttpMethod.PATCH,
      data: data,
    }).then((res) => res.data);
  };

  return {
    indiceTypeCreate,
    indiceTypeUpdate,
    indiceTypeDelete,
    indiceTypeList,
    indiceTypeGet,
  };
}
