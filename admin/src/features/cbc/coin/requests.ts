import { useApp } from "@/hooks/use-app";
import { Delete, PaginationParams, PaginationResult } from "@/types";
import { Coin } from "@/types/models";
import { HttpMethod } from "@/types/http-method";

export function requests() {
  const { request } = useApp();

  const coinList = async (params: PaginationParams) => {
    return request<PaginationResult<Coin>>({
      url: "/coin",
      params,
    }).then((res) => res.data);
  };

  const coinGet = async (id: number) => {
    return request<Coin>({
      url: `/coin/${id}`,
    }).then((res) => res.data);
  };

  const coinCreate = async (params: { data: Coin }) => {
    const { data } = params;
    return request<Coin>({
      url: "/coin",
      method: HttpMethod.POST,
      data: data,
    }).then((res) => res.data);
  };

  const coinDelete = async (ids: number[]) => {
    return request<Delete>({
      url: "/coin",
      data: { ids },
      method: HttpMethod.DELETE,
    }).then((res) => res.data);
  };

  const coinUpdate = async (params: { id: number; data: Coin }) => {
    const { id, data } = params;
    return request<Coin>({
      url: `/coin/${id}`,
      method: HttpMethod.PATCH,
      data: data,
    }).then((res) => res.data);
  };

  return {
    coinCreate,
    coinUpdate,
    coinDelete,
    coinList,
    coinGet,
  };
}
