import { useApp } from "@/hooks/use-app";
import { Delete, PaginationParams, PaginationResult } from "@/types";
import { Author } from "@/types/models";
import { HttpMethod } from "@/types/http-method";

export function requests() {
  const { request } = useApp();

  const authorList = async (params: PaginationParams) => {
    return request<PaginationResult<Author>>({
      url: "/author",
      params,
    }).then((res) => res.data);
  };

  const authorGet = async (id: number) => {
    return request<Author>({
      url: `/author/${id}`,
    }).then((res) => res.data);
  };

  const authorCreate = async (data: Author) => {
    return request<Author>({
      url: "/author",
      method: HttpMethod.POST,
      data: data,
    }).then((res) => res.data);
  };

  const authorDelete = async (ids: number[]) => {
    return request<Delete>({
      url: "/author",
      data: { ids },
      method: HttpMethod.DELETE,
    }).then((res) => res.data);
  };

  const authorUpdate = async (params: { id: number; data: Author }) => {
    const { id, data } = params;
    return request<Author>({
      url: `/author/${id}`,
      method: HttpMethod.PATCH,
      data: data,
    }).then((res) => res.data);
  };

  return {
    authorCreate,
    authorUpdate,
    authorDelete,
    authorList,
    authorGet,
  };
}
