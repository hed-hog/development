import { useApp } from "@/hooks/use-app";
import { Delete, PaginationParams, PaginationResult } from "@/types";
import { GainerLoser } from "@/types/models";
import { HttpMethod } from "@/types/http-method";

export function requests() {
  const { request } = useApp();

  const gainerLoserList = async (params: PaginationParams) => {
    return request<PaginationResult<GainerLoser>>({
      url: "/gainer-loser",
      params,
    }).then((res) => res.data);
  };

  const gainerLoserGet = async (id: number) => {
    return request<GainerLoser>({
      url: `/gainer-loser/${id}`,
    }).then((res) => res.data);
  };

  const gainerLoserCreate = async (params: { data: GainerLoser }) => {
    const { data } = params;
    return request<GainerLoser>({
      url: "/gainer-loser",
      method: HttpMethod.POST,
      data: data,
    }).then((res) => res.data);
  };

  const gainerLoserDelete = async (ids: number[]) => {
    return request<Delete>({
      url: "/gainer-loser",
      data: { ids },
      method: HttpMethod.DELETE,
    }).then((res) => res.data);
  };

  const gainerLoserUpdate = async (params: {
    id: number;
    data: GainerLoser;
  }) => {
    const { id, data } = params;
    return request<GainerLoser>({
      url: `/gainer-loser/${id}`,
      method: HttpMethod.PATCH,
      data: data,
    }).then((res) => res.data);
  };

  return {
    gainerLoserCreate,
    gainerLoserUpdate,
    gainerLoserDelete,
    gainerLoserList,
    gainerLoserGet,
  };
}
