import { useApp } from "@/hooks/use-app";
import { Delete, PaginationParams, PaginationResult } from "@/types";
import { Content } from "@/types/models";
import { HttpMethod } from "@/types/http-method";
import { formatDataWithLocale } from "@hedhog/utils";

export function requests() {
  const { request } = useApp();

  const contentList = async (params: PaginationParams) => {
    return request<PaginationResult<Content>>({
      url: "/content",
      params,
    }).then((res) => res.data);
  };

  const contentGet = async (id: number) => {
    return request<Content>({
      url: `/content/${id}`,
    }).then((res) => res.data);
  };

  const contentCreate = async (params: { data: Content }) => {
    const { data } = params;
    return request<Content>({
      url: "/content",
      method: HttpMethod.POST,
      data: formatDataWithLocale(data),
    }).then((res) => res.data);
  };

  const contentDelete = async (ids: number[]) => {
    return request<Delete>({
      url: "/content",
      data: { ids },
      method: HttpMethod.DELETE,
    }).then((res) => res.data);
  };

  const contentUpdate = async (params: { id: number; data: Content }) => {
    const { id, data } = params;
    return request<Content>({
      url: `/content/${id}`,
      method: HttpMethod.PATCH,
      data: formatDataWithLocale(data),
    }).then((res) => res.data);
  };

  return {
    contentCreate,
    contentUpdate,
    contentDelete,
    contentList,
    contentGet,
  };
}
