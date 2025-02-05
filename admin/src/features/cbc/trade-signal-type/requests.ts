import { useApp } from "@/hooks/use-app";
import { Delete, PaginationParams, PaginationResult } from "@/types";
import { TradeSignalType } from "@/types/models";
import { HttpMethod } from "@/types/http-method";

export function requests() {
  const { request } = useApp();

  const tradeSignalTypeList = async (params: PaginationParams) => {
    return request<PaginationResult<TradeSignalType>>({
      url: "/trade-signal-type",
      params,
    }).then((res) => res.data);
  };

  const tradeSignalTypeGet = async (id: number) => {
    return request<TradeSignalType>({
      url: `/trade-signal-type/${id}`,
    }).then((res) => res.data);
  };

  const tradeSignalTypeCreate = async (params: { data: TradeSignalType }) => {
    const { data } = params;
    return request<TradeSignalType>({
      url: "/trade-signal-type",
      method: HttpMethod.POST,
      data: data,
    }).then((res) => res.data);
  };

  const tradeSignalTypeDelete = async (ids: number[]) => {
    return request<Delete>({
      url: "/trade-signal-type",
      data: { ids },
      method: HttpMethod.DELETE,
    }).then((res) => res.data);
  };

  const tradeSignalTypeUpdate = async (params: {
    id: number;
    data: TradeSignalType;
  }) => {
    const { id, data } = params;
    return request<TradeSignalType>({
      url: `/trade-signal-type/${id}`,
      method: HttpMethod.PATCH,
      data: data,
    }).then((res) => res.data);
  };

  return {
    tradeSignalTypeCreate,
    tradeSignalTypeUpdate,
    tradeSignalTypeDelete,
    tradeSignalTypeList,
    tradeSignalTypeGet,
  };
}
