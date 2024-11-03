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
    });
  };

  const authorGet = async (id: number) => {
    return request<Author>({
      url: `/author/${id}`,
    });
  };

  const authorCreate = async (data: Author) => {
    return request<Author>({
      url: "/author",
      method: HttpMethod.POST,
      data: data,
    });
  };

  const authorDelete = async (ids: number[]) => {
    return request<Delete>({
      url: "/author",
      data: { ids },
      method: HttpMethod.DELETE,
    });
  };

  const authorUpdate = async (id: number, data: Author) => {
    return request<Author>({
      url: `/author/${id}`,
      method: HttpMethod.PATCH,
      data: data,
    });
  };

  return {
    authorCreate,
    authorUpdate,
    authorDelete,
    authorList,
    authorGet,
  };
}
