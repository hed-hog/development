import { useApp } from "@/hooks/use-app";
import { Delete, PaginationParams, PaginationResult } from "@/types";
import { AltcoinSeason } from "@/types/models";
import { HttpMethod } from "@/types/http-method";

export function requests() {
  const { request } = useApp();

  const altcoinSeasonList = async (params: PaginationParams) => {
    return request<PaginationResult<AltcoinSeason>>({
      url: "/altcoin-season",
      params,
    }).then((res) => res.data);
  };

  const altcoinSeasonGet = async (id: number) => {
    return request<AltcoinSeason>({
      url: `/altcoin-season/${id}`,
    }).then((res) => res.data);
  };

  const altcoinSeasonCreate = async (params: { data: AltcoinSeason }) => {
    const { data } = params;
    return request<AltcoinSeason>({
      url: "/altcoin-season",
      method: HttpMethod.POST,
      data: data,
    }).then((res) => res.data);
  };

  const altcoinSeasonDelete = async (ids: number[]) => {
    return request<Delete>({
      url: "/altcoin-season",
      data: { ids },
      method: HttpMethod.DELETE,
    }).then((res) => res.data);
  };

  const altcoinSeasonUpdate = async (params: {
    id: number;
    data: AltcoinSeason;
  }) => {
    const { id, data } = params;
    return request<AltcoinSeason>({
      url: `/altcoin-season/${id}`,
      method: HttpMethod.PATCH,
      data: data,
    }).then((res) => res.data);
  };

  return {
    altcoinSeasonCreate,
    altcoinSeasonUpdate,
    altcoinSeasonDelete,
    altcoinSeasonList,
    altcoinSeasonGet,
  };
}
