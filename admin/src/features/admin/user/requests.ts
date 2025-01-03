import { useApp } from "@/hooks/use-app";
import { Delete, PaginationParams, PaginationResult } from "@/types";
import { User } from "@/types/models";
import { HttpMethod } from "@/types/http-method";

export function requests() {
  const { request } = useApp();

  const userList = async (params: PaginationParams) => {
    return request<PaginationResult<User>>({
      url: "/user",
      params,
    }).then((res) => res.data);
  };

  const userGet = async (id: number) => {
    return request<User>({
      url: `/user/${id}`,
    }).then((res) => res.data);
  };

  const userCreate = async (params: { data: User }) => {
    const { data } = params;
    return request<User>({
      url: "/user",
      method: HttpMethod.POST,
      data: data,
    }).then((res) => res.data);
  };

  const userDelete = async (ids: number[]) => {
    return request<Delete>({
      url: "/user",
      data: { ids },
      method: HttpMethod.DELETE,
    }).then((res) => res.data);
  };

  const userUpdate = async (params: { id: number; data: User }) => {
    const { id, data } = params;
    return request<User>({
      url: `/user/${id}`,
      method: HttpMethod.PATCH,
      data: data,
    }).then((res) => res.data);
  };

  return {
    userCreate,
    userUpdate,
    userDelete,
    userList,
    userGet,
  };
}
