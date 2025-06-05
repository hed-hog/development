import { useApp } from "@/hooks/use-app";
import { Delete, PaginationParams, PaginationResult } from "@/types";
import { Item } from "@/types/models";
import { HttpMethod } from "@/types/http-method";

export function requests() {
  const { request } = useApp();

  const itemList = async (params: PaginationParams) => {
    return request<PaginationResult<Item>>({
      url: "/item",
      params,
    }).then((res) => res.data);
  };

  const itemGet = async (id: number) => {
    return request<Item>({
      url: `/item/${id}`,
    }).then((res) => res.data);
  };

  const itemCreate = async (params: { data: Item }) => {
    const { data } = params;
    return request<Item>({
      url: "/item",
      method: HttpMethod.POST,
      data: data,
    }).then((res) => res.data);
  };

  const itemDelete = async (ids: number[]) => {
    return request<Delete>({
      url: "/item",
      data: { ids },
      method: HttpMethod.DELETE,
    }).then((res) => res.data);
  };

  const itemUpdate = async (params: { id: number; data: Item }) => {
    const { id, data } = params;
    return request<Item>({
      url: `/item/${id}`,
      method: HttpMethod.PATCH,
      data: data,
    }).then((res) => res.data);
  };

  return {
    itemCreate,
    itemUpdate,
    itemDelete,
    itemList,
    itemGet,
  };
}
