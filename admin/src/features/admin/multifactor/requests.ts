import { useApp } from "@/hooks/use-app";
import { Delete, PaginationParams, PaginationResult } from "@/types";
import { Multifactor } from "@/types/models";
import { HttpMethod } from "@/types/http-method";
import { formatDataWithLocale } from "@hedhog/utils";

export function requests() {
  const { request } = useApp();

  const multifactorList = async (params: PaginationParams) => {
    return request<PaginationResult<Multifactor>>({
      url: "/multifactor",
      params,
    }).then((res) => res.data);
  };

  const multifactorGet = async (id: number) => {
    return request<Multifactor>({
      url: `/multifactor/${id}`,
    }).then((res) => res.data);
  };

  const multifactorCreate = async (params: { data: Multifactor }) => {
    const { data } = params;
    return request<Multifactor>({
      url: "/multifactor",
      method: HttpMethod.POST,
      data: formatDataWithLocale(data),
    }).then((res) => res.data);
  };

  const multifactorDelete = async (ids: number[]) => {
    return request<Delete>({
      url: "/multifactor",
      data: { ids },
      method: HttpMethod.DELETE,
    }).then((res) => res.data);
  };

  const multifactorUpdate = async (params: {
    id: number;
    data: Multifactor;
  }) => {
    const { id, data } = params;
    return request<Multifactor>({
      url: `/multifactor/${id}`,
      method: HttpMethod.PATCH,
      data: formatDataWithLocale(data),
    }).then((res) => res.data);
  };

  return {
    multifactorCreate,
    multifactorUpdate,
    multifactorDelete,
    multifactorList,
    multifactorGet,
  };
}
