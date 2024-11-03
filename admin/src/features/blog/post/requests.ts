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
    }).then((res) => res.data);
  };

  const postGet = async (id: number) => {
    return request<Post>({
      url: `/post/${id}`,
    }).then((res) => res.data);
  };

  const postCreate = async (data: Post) => {
    return request<Post>({
      url: "/post",
      method: HttpMethod.POST,
      data: data,
    }).then((res) => res.data);
  };

  const postDelete = async (ids: number[]) => {
    return request<Delete>({
      url: "/post",
      data: { ids },
      method: HttpMethod.DELETE,
    }).then((res) => res.data);
  };

  const postUpdate = async (params: { id: number; data: Post }) => {
    const { id, data } = params;
    return request<Post>({
      url: `/post/${id}`,
      method: HttpMethod.PATCH,
      data: data,
    }).then((res) => res.data);
  };

  return {
    postCreate,
    postUpdate,
    postDelete,
    postList,
    postGet,
  };
}
