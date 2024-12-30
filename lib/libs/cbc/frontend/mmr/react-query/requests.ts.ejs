import { useApp } from "@/hooks/use-app";
import { Delete, PaginationParams, PaginationResult } from "@/types";
import { Mmr } from "@/types/models";
import { HttpMethod } from "@/types/http-method";

export function requests() {
  const { request } = useApp();

  const mmrList = async (params: PaginationParams) => {
    return request<PaginationResult<Mmr>>({
      url: "/mmr",
      params,
    }).then((res) => res.data);
  };

  const mmrGet = async (id: number) => {
    return request<Mmr>({
      url: `/mmr/${id}`,
    }).then((res) => res.data);
  };

  const mmrCreate = async (params: { data: Mmr }) => {
    const { data } = params;
    return request<Mmr>({
      url: "/mmr",
      method: HttpMethod.POST,
      data: data,
    }).then((res) => res.data);
  };

  const mmrDelete = async (ids: number[]) => {
    return request<Delete>({
      url: "/mmr",
      data: { ids },
      method: HttpMethod.DELETE,
    }).then((res) => res.data);
  };

  const mmrUpdate = async (params: { id: number; data: Mmr }) => {
    const { id, data } = params;
    return request<Mmr>({
      url: `/mmr/${id}`,
      method: HttpMethod.PATCH,
      data: data,
    }).then((res) => res.data);
  };

  return {
    mmrCreate,
    mmrUpdate,
    mmrDelete,
    mmrList,
    mmrGet,
  };
}
