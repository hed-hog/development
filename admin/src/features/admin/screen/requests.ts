import { useApp } from "@/hooks/use-app";
import { Delete, PaginationParams, PaginationResult } from "@/types";
import { Screen } from "@/types/models";
import { HttpMethod } from "@/types/http-method";
import { formatDataWithLocale } from "@hedhog/utils";

export function requests() {
  const { request } = useApp();

  const screenList = async (params: PaginationParams) => {
    return request<PaginationResult<Screen>>({
      url: "/screen",
      params,
    }).then((res) => res.data);
  };

  const screenGet = async (id: number) => {
    return request<Screen>({
      url: `/screen/${id}`,
    }).then((res) => res.data);
  };

  const screenCreate = async (params: { data: Screen }) => {
    const { data } = params;
    return request<Screen>({
      url: "/screen",
      method: HttpMethod.POST,
      data: formatDataWithLocale(data),
    }).then((res) => res.data);
  };

  const screenDelete = async (ids: number[]) => {
    return request<Delete>({
      url: "/screen",
      data: { ids },
      method: HttpMethod.DELETE,
    }).then((res) => res.data);
  };

  const screenUpdate = async (params: { id: number; data: Screen }) => {
    const { id, data } = params;
    return request<Screen>({
      url: `/screen/${id}`,
      method: HttpMethod.PATCH,
      data: formatDataWithLocale(data),
    }).then((res) => res.data);
  };

  return {
    screenCreate,
    screenUpdate,
    screenDelete,
    screenList,
    screenGet,
  };
}
