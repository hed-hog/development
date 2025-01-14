import { useApp } from "@/hooks/use-app";
import { Delete, PaginationParams, PaginationResult } from "@/types";
import { Top100 } from "@/types/models";
import { HttpMethod } from "@/types/http-method";

export function requests() {
  const { request } = useApp();

  const top100List = async (params: PaginationParams) => {
    return request<PaginationResult<Top100>>({
      url: "/top-100",
      params,
    }).then((res) => res.data);
  };

  const top100Get = async (id: number) => {
    return request<Top100>({
      url: `/top-100/${id}`,
    }).then((res) => res.data);
  };

  const top100Create = async (params: { data: Top100 }) => {
    const { data } = params;
    return request<Top100>({
      url: "/top-100",
      method: HttpMethod.POST,
      data: data,
    }).then((res) => res.data);
  };

  const top100Delete = async (ids: number[]) => {
    return request<Delete>({
      url: "/top-100",
      data: { ids },
      method: HttpMethod.DELETE,
    }).then((res) => res.data);
  };

  const top100Update = async (params: { id: number; data: Top100 }) => {
    const { id, data } = params;
    return request<Top100>({
      url: `/top-100/${id}`,
      method: HttpMethod.PATCH,
      data: data,
    }).then((res) => res.data);
  };

  return {
    top100Create,
    top100Update,
    top100Delete,
    top100List,
    top100Get,
  };
}
