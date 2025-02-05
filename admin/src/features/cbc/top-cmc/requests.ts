import { useApp } from "@/hooks/use-app";
import { Delete, PaginationParams, PaginationResult } from "@/types";
import { TopCmc } from "@/types/models";
import { HttpMethod } from "@/types/http-method";

export function requests() {
  const { request } = useApp();

  const topCmcList = async (params: PaginationParams) => {
    return request<PaginationResult<TopCmc>>({
      url: "/top-cmc",
      params,
    }).then((res) => res.data);
  };

  const topCmcGet = async (id: number) => {
    return request<TopCmc>({
      url: `/top-cmc/${id}`,
    }).then((res) => res.data);
  };

  const topCmcCreate = async (params: { data: TopCmc }) => {
    const { data } = params;
    return request<TopCmc>({
      url: "/top-cmc",
      method: HttpMethod.POST,
      data: data,
    }).then((res) => res.data);
  };

  const topCmcDelete = async (ids: number[]) => {
    return request<Delete>({
      url: "/top-cmc",
      data: { ids },
      method: HttpMethod.DELETE,
    }).then((res) => res.data);
  };

  const topCmcUpdate = async (params: { id: number; data: TopCmc }) => {
    const { id, data } = params;
    return request<TopCmc>({
      url: `/top-cmc/${id}`,
      method: HttpMethod.PATCH,
      data: data,
    }).then((res) => res.data);
  };

  return {
    topCmcCreate,
    topCmcUpdate,
    topCmcDelete,
    topCmcList,
    topCmcGet,
  };
}
