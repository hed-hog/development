import { useApp } from "@/hooks/use-app";
import { Delete, PaginationParams, PaginationResult } from "@/types";
import { Translation } from "@/types/models";
import { HttpMethod } from "@/types/http-method";

export function requests() {
  const { request } = useApp();

  const translationList = async (params: PaginationParams) => {
    return request<PaginationResult<Translation>>({
      url: "/translation",
      params,
    }).then((res) => res.data);
  };

  const translationGet = async (id: number) => {
    return request<Translation>({
      url: `/translation/${id}`,
    }).then((res) => res.data);
  };

  const translationCreate = async (params: { data: Translation }) => {
    const { data } = params;
    return request<Translation>({
      url: "/translation",
      method: HttpMethod.POST,
      data: data,
    }).then((res) => res.data);
  };

  const translationDelete = async (ids: number[]) => {
    return request<Delete>({
      url: "/translation",
      data: { ids },
      method: HttpMethod.DELETE,
    }).then((res) => res.data);
  };

  const translationUpdate = async (params: {
    id: number;
    data: Translation;
  }) => {
    const { id, data } = params;
    return request<Translation>({
      url: `/translation/${id}`,
      method: HttpMethod.PATCH,
      data: data,
    }).then((res) => res.data);
  };

  return {
    translationCreate,
    translationUpdate,
    translationDelete,
    translationList,
    translationGet,
  };
}
