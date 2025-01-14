import { useApp } from "@/hooks/use-app";
import { Delete, PaginationParams, PaginationResult } from "@/types";
import { TopCoins } from "@/types/models";
import { HttpMethod } from "@/types/http-method";

export function requests() {
  const { request } = useApp();

  const topCoinsList = async (params: PaginationParams) => {
    return request<PaginationResult<TopCoins>>({
      url: "/top-coins",
      params,
    }).then((res) => res.data);
  };

  const topCoinsGet = async (id: number) => {
    return request<TopCoins>({
      url: `/top-coins/${id}`,
    }).then((res) => res.data);
  };

  const topCoinsCreate = async (params: { data: TopCoins }) => {
    const { data } = params;
    return request<TopCoins>({
      url: "/top-coins",
      method: HttpMethod.POST,
      data: data,
    }).then((res) => res.data);
  };

  const topCoinsDelete = async (ids: number[]) => {
    return request<Delete>({
      url: "/top-coins",
      data: { ids },
      method: HttpMethod.DELETE,
    }).then((res) => res.data);
  };

  const topCoinsUpdate = async (params: { id: number; data: TopCoins }) => {
    const { id, data } = params;
    return request<TopCoins>({
      url: `/top-coins/${id}`,
      method: HttpMethod.PATCH,
      data: data,
    }).then((res) => res.data);
  };

  return {
    topCoinsCreate,
    topCoinsUpdate,
    topCoinsDelete,
    topCoinsList,
    topCoinsGet,
  };
}
