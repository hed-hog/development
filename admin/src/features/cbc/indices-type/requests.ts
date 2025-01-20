import { useApp } from "@/hooks/use-app";
import { Delete, PaginationParams, PaginationResult } from "@/types";
import { IndicesType } from "@/types/models";
import { HttpMethod } from "@/types/http-method";

export function requests() {
  const { request } = useApp();

  const indicesTypeList = async (params: PaginationParams) => {
    return request<PaginationResult<IndicesType>>({
      url: "/indices-type",
      params,
    }).then((res) => res.data);
  };

  const indicesTypeGet = async (id: number) => {
    return request<IndicesType>({
      url: `/indices-type/${id}`,
    }).then((res) => res.data);
  };

  const indicesTypeCreate = async (params: { data: IndicesType }) => {
    const { data } = params;
    return request<IndicesType>({
      url: "/indices-type",
      method: HttpMethod.POST,
      data: data,
    }).then((res) => res.data);
  };

  const indicesTypeDelete = async (ids: number[]) => {
    return request<Delete>({
      url: "/indices-type",
      data: { ids },
      method: HttpMethod.DELETE,
    }).then((res) => res.data);
  };

  const indicesTypeUpdate = async (params: {
    id: number;
    data: IndicesType;
  }) => {
    const { id, data } = params;
    return request<IndicesType>({
      url: `/indices-type/${id}`,
      method: HttpMethod.PATCH,
      data: data,
    }).then((res) => res.data);
  };

  return {
    indicesTypeCreate,
    indicesTypeUpdate,
    indicesTypeDelete,
    indicesTypeList,
    indicesTypeGet,
  };
}
