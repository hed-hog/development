import { useApp } from "@/hooks/use-app";
import { Delete, PaginationParams, PaginationResult } from "@/types";
import { Locale } from "@/types/models";
import { HttpMethod } from "@/types/http-method";

export function requests() {
  const { request } = useApp();

  const localeList = async (params: PaginationParams) => {
    return request<PaginationResult<Locale>>({
      url: "/locale",
      params,
    }).then((res) => res.data);
  };

  const localeGet = async (id: number) => {
    return request<Locale>({
      url: `/locale/${id}`,
    }).then((res) => res.data);
  };

  const localeCreate = async (data: Locale) => {
    return request<Locale>({
      url: "/locale",
      method: HttpMethod.POST,
      data: data,
    }).then((res) => res.data);
  };

  const localeDelete = async (ids: number[]) => {
    return request<Delete>({
      url: "/locale",
      data: { ids },
      method: HttpMethod.DELETE,
    }).then((res) => res.data);
  };

  const localeUpdate = async (params: { id: number; data: Locale }) => {
    const { id, data } = params;
    return request<Locale>({
      url: `/locale/${id}`,
      method: HttpMethod.PATCH,
      data: data,
    }).then((res) => res.data);
  };

  return {
    localeCreate,
    localeUpdate,
    localeDelete,
    localeList,
    localeGet,
  };
}
