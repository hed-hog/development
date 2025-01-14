import { useApp } from "@/hooks/use-app";
import { Delete, PaginationParams, PaginationResult } from "@/types";
import { TopVariation } from "@/types/models";
import { HttpMethod } from "@/types/http-method";

export function requests() {
  const { request } = useApp();

  const topVariationList = async (params: PaginationParams) => {
    return request<PaginationResult<TopVariation>>({
      url: "/top-variation",
      params,
    }).then((res) => res.data);
  };

  const topVariationGet = async (id: number) => {
    return request<TopVariation>({
      url: `/top-variation/${id}`,
    }).then((res) => res.data);
  };

  const topVariationCreate = async (params: { data: TopVariation }) => {
    const { data } = params;
    return request<TopVariation>({
      url: "/top-variation",
      method: HttpMethod.POST,
      data: data,
    }).then((res) => res.data);
  };

  const topVariationDelete = async (ids: number[]) => {
    return request<Delete>({
      url: "/top-variation",
      data: { ids },
      method: HttpMethod.DELETE,
    }).then((res) => res.data);
  };

  const topVariationUpdate = async (params: {
    id: number;
    data: TopVariation;
  }) => {
    const { id, data } = params;
    return request<TopVariation>({
      url: `/top-variation/${id}`,
      method: HttpMethod.PATCH,
      data: data,
    }).then((res) => res.data);
  };

  return {
    topVariationCreate,
    topVariationUpdate,
    topVariationDelete,
    topVariationList,
    topVariationGet,
  };
}
