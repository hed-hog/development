import { useApp } from "@/hooks/use-app";
import { Delete, PaginationParams, PaginationResult } from "@/types";
import { MarketReflectionDirection } from "@/types/models";
import { HttpMethod } from "@/types/http-method";

export function requests() {
  const { request } = useApp();

  const marketReflectionDirectionList = async (params: PaginationParams) => {
    return request<PaginationResult<MarketReflectionDirection>>({
      url: "/market-reflection-direction",
      params,
    }).then((res) => res.data);
  };

  const marketReflectionDirectionGet = async (id: number) => {
    return request<MarketReflectionDirection>({
      url: `/market-reflection-direction/${id}`,
    }).then((res) => res.data);
  };

  const marketReflectionDirectionCreate = async (params: {
    data: MarketReflectionDirection;
  }) => {
    const { data } = params;
    return request<MarketReflectionDirection>({
      url: "/market-reflection-direction",
      method: HttpMethod.POST,
      data: data,
    }).then((res) => res.data);
  };

  const marketReflectionDirectionDelete = async (ids: number[]) => {
    return request<Delete>({
      url: "/market-reflection-direction",
      data: { ids },
      method: HttpMethod.DELETE,
    }).then((res) => res.data);
  };

  const marketReflectionDirectionUpdate = async (params: {
    id: number;
    data: MarketReflectionDirection;
  }) => {
    const { id, data } = params;
    return request<MarketReflectionDirection>({
      url: `/market-reflection-direction/${id}`,
      method: HttpMethod.PATCH,
      data: data,
    }).then((res) => res.data);
  };

  return {
    marketReflectionDirectionCreate,
    marketReflectionDirectionUpdate,
    marketReflectionDirectionDelete,
    marketReflectionDirectionList,
    marketReflectionDirectionGet,
  };
}
