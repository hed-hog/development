import { useApp } from "@/hooks/use-app";
import { Delete, PaginationParams, PaginationResult } from "@/types";
import { CardBrand } from "@/types/models";
import { HttpMethod } from "@/types/http-method";

export function requests() {
  const { request } = useApp();

  const cardBrandList = async (params: PaginationParams) => {
    return request<PaginationResult<CardBrand>>({
      url: "/card-brand",
      params,
    }).then((res) => res.data);
  };

  const cardBrandGet = async (id: number) => {
    return request<CardBrand>({
      url: `/card-brand/${id}`,
    }).then((res) => res.data);
  };

  const cardBrandCreate = async (params: { data: CardBrand }) => {
    const { data } = params;
    return request<CardBrand>({
      url: "/card-brand",
      method: HttpMethod.POST,
      data: data,
    }).then((res) => res.data);
  };

  const cardBrandDelete = async (ids: number[]) => {
    return request<Delete>({
      url: "/card-brand",
      data: { ids },
      method: HttpMethod.DELETE,
    }).then((res) => res.data);
  };

  const cardBrandUpdate = async (params: { id: number; data: CardBrand }) => {
    const { id, data } = params;
    return request<CardBrand>({
      url: `/card-brand/${id}`,
      method: HttpMethod.PATCH,
      data: data,
    }).then((res) => res.data);
  };

  return {
    cardBrandCreate,
    cardBrandUpdate,
    cardBrandDelete,
    cardBrandList,
    cardBrandGet,
  };
}
