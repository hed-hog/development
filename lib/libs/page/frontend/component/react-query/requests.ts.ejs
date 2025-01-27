import { useApp } from "@/hooks/use-app";
import { Delete, PaginationParams, PaginationResult } from "@/types";
import { Component } from "@/types/models";
import { HttpMethod } from "@/types/http-method";

export function requests() {
  const { request } = useApp();

  const componentList = async (params: PaginationParams) => {
    return request<PaginationResult<Component>>({
      url: "/component",
      params,
    }).then((res) => res.data);
  };

  const componentGet = async (id: number) => {
    return request<Component>({
      url: `/component/${id}`,
    }).then((res) => res.data);
  };

  const componentCreate = async (params: { data: Component }) => {
    const { data } = params;
    return request<Component>({
      url: "/component",
      method: HttpMethod.POST,
      data: data,
    }).then((res) => res.data);
  };

  const componentDelete = async (ids: number[]) => {
    return request<Delete>({
      url: "/component",
      data: { ids },
      method: HttpMethod.DELETE,
    }).then((res) => res.data);
  };

  const componentUpdate = async (params: { id: number; data: Component }) => {
    const { id, data } = params;
    return request<Component>({
      url: `/component/${id}`,
      method: HttpMethod.PATCH,
      data: data,
    }).then((res) => res.data);
  };

  return {
    componentCreate,
    componentUpdate,
    componentDelete,
    componentList,
    componentGet,
  };
}
