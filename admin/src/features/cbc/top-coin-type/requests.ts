import { useApp } from "@/hooks/use-app";
import { Delete, PaginationParams, PaginationResult } from "@/types";
import { TopCoinType } from "@/types/models";
import { HttpMethod } from "@/types/http-method";

export function requests() {
  const { request } = useApp();

  const topCoinTypeList = async (params: PaginationParams) => {
    return request<PaginationResult<TopCoinType>>({
      url: "/top-coin-type",
      params,
    }).then((res) => res.data);
  };

  const topCoinTypeGet = async (id: number) => {
    return request<TopCoinType>({
      url: `/top-coin-type/${id}`,
    }).then((res) => res.data);
  };

  const topCoinTypeCreate = async (params: { data: TopCoinType }) => {
    const { data } = params;
    return request<TopCoinType>({
      url: "/top-coin-type",
      method: HttpMethod.POST,
      data: data,
    }).then((res) => res.data);
  };

  const topCoinTypeDelete = async (ids: number[]) => {
    return request<Delete>({
      url: "/top-coin-type",
      data: { ids },
      method: HttpMethod.DELETE,
    }).then((res) => res.data);
  };

  const topCoinTypeUpdate = async (params: {
    id: number;
    data: TopCoinType;
  }) => {
    const { id, data } = params;
    return request<TopCoinType>({
      url: `/top-coin-type/${id}`,
      method: HttpMethod.PATCH,
      data: data,
    }).then((res) => res.data);
  };

  return {
    topCoinTypeCreate,
    topCoinTypeUpdate,
    topCoinTypeDelete,
    topCoinTypeList,
    topCoinTypeGet,
  };
}
