import { useApp } from "@/hooks/use-app";
import { Delete, PaginationParams, PaginationResult } from "@/types";
import { Post } from "@/types/models";
import { HttpMethod } from "@/types/http-method";

export function requests() {
  const { request } = useApp();

  const postList = async (params: PaginationParams) => {
    return request<PaginationResult<Post>>({
      url: "/post",
      params,
    });
  };

  const postGet = async (id: number) => {
    return request<Post>({
      url: `/post/${id}`,
    });
  };

  const postCreate = async (data: Post) => {
    return request<Post>({
      url: "/post",
      method: HttpMethod.POST,
      data: data,
    });
  };

  const postDelete = async (ids: number[]) => {
    return request<Delete>({
      url: "/post",
      data: { ids },
      method: HttpMethod.DELETE,
    });
  };

  const postUpdate = async (id: number, data: Post) => {
    return request<Post>({
      url: `/post/${id}`,
      method: HttpMethod.PATCH,
      data: data,
    });
  };

  return {
    postCreate,
    postUpdate,
    postDelete,
    postList,
    postGet,
  };
}
