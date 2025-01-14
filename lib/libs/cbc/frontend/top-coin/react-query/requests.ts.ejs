import { useApp } from "@/hooks/use-app";
import { Delete, PaginationParams, PaginationResult } from "@/types";
import { TopCoin } from "@/types/models";
import { HttpMethod } from "@/types/http-method";

export function requests() {
  const { request } = useApp();

  const topCoinList = async (params: PaginationParams) => {
    return request<PaginationResult<TopCoin>>({
      url: "/top-coin",
      params,
    }).then((res) => res.data);
  };

  const topCoinGet = async (id: number) => {
    return request<TopCoin>({
      url: `/top-coin/${id}`,
    }).then((res) => res.data);
  };

  const topCoinCreate = async (params: { data: TopCoin }) => {
    const { data } = params;
    return request<TopCoin>({
      url: "/top-coin",
      method: HttpMethod.POST,
      data: data,
    }).then((res) => res.data);
  };

  const topCoinDelete = async (ids: number[]) => {
    return request<Delete>({
      url: "/top-coin",
      data: { ids },
      method: HttpMethod.DELETE,
    }).then((res) => res.data);
  };

  const topCoinUpdate = async (params: { id: number; data: TopCoin }) => {
    const { id, data } = params;
    return request<TopCoin>({
      url: `/top-coin/${id}`,
      method: HttpMethod.PATCH,
      data: data,
    }).then((res) => res.data);
  };

  return {
    topCoinCreate,
    topCoinUpdate,
    topCoinDelete,
    topCoinList,
    topCoinGet,
  };
}
