import { useApp } from "@/hooks/use-app";
import { Delete, PaginationParams, PaginationResult } from "@/types";
import { GainersLosers } from "@/types/models";
import { HttpMethod } from "@/types/http-method";

export function requests() {
  const { request } = useApp();

  const gainersLosersList = async (params: PaginationParams) => {
    return request<PaginationResult<GainersLosers>>({
      url: "/gainers-losers",
      params,
    }).then((res) => res.data);
  };

  const gainersLosersGet = async (id: number) => {
    return request<GainersLosers>({
      url: `/gainers-losers/${id}`,
    }).then((res) => res.data);
  };

  const gainersLosersCreate = async (params: { data: GainersLosers }) => {
    const { data } = params;
    return request<GainersLosers>({
      url: "/gainers-losers",
      method: HttpMethod.POST,
      data: data,
    }).then((res) => res.data);
  };

  const gainersLosersDelete = async (ids: number[]) => {
    return request<Delete>({
      url: "/gainers-losers",
      data: { ids },
      method: HttpMethod.DELETE,
    }).then((res) => res.data);
  };

  const gainersLosersUpdate = async (params: {
    id: number;
    data: GainersLosers;
  }) => {
    const { id, data } = params;
    return request<GainersLosers>({
      url: `/gainers-losers/${id}`,
      method: HttpMethod.PATCH,
      data: data,
    }).then((res) => res.data);
  };

  return {
    gainersLosersCreate,
    gainersLosersUpdate,
    gainersLosersDelete,
    gainersLosersList,
    gainersLosersGet,
  };
}
