import { useApp } from "@/hooks/use-app";
import { Delete, PaginationParams, PaginationResult } from "@/types";
import { CoinVariationType } from "@/types/models";
import { HttpMethod } from "@/types/http-method";

export function requests() {
  const { request } = useApp();

  const coinVariationTypeList = async (params: PaginationParams) => {
    return request<PaginationResult<CoinVariationType>>({
      url: "/coin-variation-type",
      params,
    }).then((res) => res.data);
  };

  const coinVariationTypeGet = async (id: number) => {
    return request<CoinVariationType>({
      url: `/coin-variation-type/${id}`,
    }).then((res) => res.data);
  };

  const coinVariationTypeCreate = async (params: {
    data: CoinVariationType;
  }) => {
    const { data } = params;
    return request<CoinVariationType>({
      url: "/coin-variation-type",
      method: HttpMethod.POST,
      data: data,
    }).then((res) => res.data);
  };

  const coinVariationTypeDelete = async (ids: number[]) => {
    return request<Delete>({
      url: "/coin-variation-type",
      data: { ids },
      method: HttpMethod.DELETE,
    }).then((res) => res.data);
  };

  const coinVariationTypeUpdate = async (params: {
    id: number;
    data: CoinVariationType;
  }) => {
    const { id, data } = params;
    return request<CoinVariationType>({
      url: `/coin-variation-type/${id}`,
      method: HttpMethod.PATCH,
      data: data,
    }).then((res) => res.data);
  };

  return {
    coinVariationTypeCreate,
    coinVariationTypeUpdate,
    coinVariationTypeDelete,
    coinVariationTypeList,
    coinVariationTypeGet,
  };
}
