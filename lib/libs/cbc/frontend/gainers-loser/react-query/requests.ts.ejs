import { useApp } from "@/hooks/use-app";
import { Delete, PaginationParams, PaginationResult } from "@/types";
import { GainersLoser } from "@/types/models";
import { HttpMethod } from "@/types/http-method";

export function requests() {
  const { request } = useApp();

  const gainersLoserList = async (params: PaginationParams) => {
    return request<PaginationResult<GainersLoser>>({
      url: "/gainers-loser",
      params,
    }).then((res) => res.data);
  };

  const gainersLoserGet = async (id: number) => {
    return request<GainersLoser>({
      url: `/gainers-loser/${id}`,
    }).then((res) => res.data);
  };

  const gainersLoserCreate = async (params: { data: GainersLoser }) => {
    const { data } = params;
    return request<GainersLoser>({
      url: "/gainers-loser",
      method: HttpMethod.POST,
      data: data,
    }).then((res) => res.data);
  };

  const gainersLoserDelete = async (ids: number[]) => {
    return request<Delete>({
      url: "/gainers-loser",
      data: { ids },
      method: HttpMethod.DELETE,
    }).then((res) => res.data);
  };

  const gainersLoserUpdate = async (params: {
    id: number;
    data: GainersLoser;
  }) => {
    const { id, data } = params;
    return request<GainersLoser>({
      url: `/gainers-loser/${id}`,
      method: HttpMethod.PATCH,
      data: data,
    }).then((res) => res.data);
  };

  return {
    gainersLoserCreate,
    gainersLoserUpdate,
    gainersLoserDelete,
    gainersLoserList,
    gainersLoserGet,
  };
}
