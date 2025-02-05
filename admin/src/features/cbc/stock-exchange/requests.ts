import { useApp } from "@/hooks/use-app";
import { Delete, PaginationParams, PaginationResult } from "@/types";
import { StockExchange } from "@/types/models";
import { HttpMethod } from "@/types/http-method";

export function requests() {
  const { request } = useApp();

  const stockExchangeList = async (params: PaginationParams) => {
    return request<PaginationResult<StockExchange>>({
      url: "/stock-exchange",
      params,
    }).then((res) => res.data);
  };

  const stockExchangeGet = async (id: number) => {
    return request<StockExchange>({
      url: `/stock-exchange/${id}`,
    }).then((res) => res.data);
  };

  const stockExchangeCreate = async (params: { data: StockExchange }) => {
    const { data } = params;
    return request<StockExchange>({
      url: "/stock-exchange",
      method: HttpMethod.POST,
      data: data,
    }).then((res) => res.data);
  };

  const stockExchangeDelete = async (ids: number[]) => {
    return request<Delete>({
      url: "/stock-exchange",
      data: { ids },
      method: HttpMethod.DELETE,
    }).then((res) => res.data);
  };

  const stockExchangeUpdate = async (params: {
    id: number;
    data: StockExchange;
  }) => {
    const { id, data } = params;
    return request<StockExchange>({
      url: `/stock-exchange/${id}`,
      method: HttpMethod.PATCH,
      data: data,
    }).then((res) => res.data);
  };

  return {
    stockExchangeCreate,
    stockExchangeUpdate,
    stockExchangeDelete,
    stockExchangeList,
    stockExchangeGet,
  };
}
