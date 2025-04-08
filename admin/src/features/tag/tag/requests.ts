import { useApp } from "@/hooks/use-app";
import { Delete, PaginationParams, PaginationResult } from "@/types";
import { Tag } from "@/types/models";
import { HttpMethod } from "@/types/http-method";
import { formatDataWithLocale } from "@hedhog/utils";

export function requests() {
  const { request } = useApp();

  const tagList = async (params: PaginationParams) => {
    return request<PaginationResult<Tag>>({
      url: "/tag",
      params,
    }).then((res) => res.data);
  };

  const tagGet = async (id: number) => {
    return request<Tag>({
      url: `/tag/${id}`,
    }).then((res) => res.data);
  };

  const tagCreate = async (params: { data: Tag }) => {
    const { data } = params;
    return request<Tag>({
      url: "/tag",
      method: HttpMethod.POST,
      data: formatDataWithLocale(data),
    }).then((res) => res.data);
  };

  const tagDelete = async (ids: number[]) => {
    return request<Delete>({
      url: "/tag",
      data: { ids },
      method: HttpMethod.DELETE,
    }).then((res) => res.data);
  };

  const tagUpdate = async (params: { id: number; data: Tag }) => {
    const { id, data } = params;
    return request<Tag>({
      url: `/tag/${id}`,
      method: HttpMethod.PATCH,
      data: formatDataWithLocale(data),
    }).then((res) => res.data);
  };

  return {
    tagCreate,
    tagUpdate,
    tagDelete,
    tagList,
    tagGet,
  };
}
