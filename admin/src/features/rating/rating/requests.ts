import { useApp } from "@/hooks/use-app";
import { Delete, PaginationParams, PaginationResult } from "@/types";
import { Rating } from "@/types/models";
import { HttpMethod } from "@/types/http-method";

export function requests() {
  const { request } = useApp();

  const ratingList = async (params: PaginationParams) => {
    return request<PaginationResult<Rating>>({
      url: "/rating",
      params,
    }).then((res) => res.data);
  };

  const ratingGet = async (id: number) => {
    return request<Rating>({
      url: `/rating/${id}`,
    }).then((res) => res.data);
  };

  const ratingCreate = async (params: { data: Rating }) => {
    const { data } = params;
    return request<Rating>({
      url: "/rating",
      method: HttpMethod.POST,
      data: data,
    }).then((res) => res.data);
  };

  const ratingDelete = async (ids: number[]) => {
    return request<Delete>({
      url: "/rating",
      data: { ids },
      method: HttpMethod.DELETE,
    }).then((res) => res.data);
  };

  const ratingUpdate = async (params: { id: number; data: Rating }) => {
    const { id, data } = params;
    return request<Rating>({
      url: `/rating/${id}`,
      method: HttpMethod.PATCH,
      data: data,
    }).then((res) => res.data);
  };

  return {
    ratingCreate,
    ratingUpdate,
    ratingDelete,
    ratingList,
    ratingGet,
  };
}
