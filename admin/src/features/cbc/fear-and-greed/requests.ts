import { useApp } from "@/hooks/use-app";
import { Delete, PaginationParams, PaginationResult } from "@/types";
import { FearAndGreed } from "@/types/models";
import { HttpMethod } from "@/types/http-method";

export function requests() {
  const { request } = useApp();

  const fearAndGreedList = async (params: PaginationParams) => {
    return request<PaginationResult<FearAndGreed>>({
      url: "/fear-and-greed",
      params,
    }).then((res) => res.data);
  };

  const fearAndGreedGet = async (id: number) => {
    return request<FearAndGreed>({
      url: `/fear-and-greed/${id}`,
    }).then((res) => res.data);
  };

  const fearAndGreedCreate = async (params: { data: FearAndGreed }) => {
    const { data } = params;
    return request<FearAndGreed>({
      url: "/fear-and-greed",
      method: HttpMethod.POST,
      data: data,
    }).then((res) => res.data);
  };

  const fearAndGreedDelete = async (ids: number[]) => {
    return request<Delete>({
      url: "/fear-and-greed",
      data: { ids },
      method: HttpMethod.DELETE,
    }).then((res) => res.data);
  };

  const fearAndGreedUpdate = async (params: {
    id: number;
    data: FearAndGreed;
  }) => {
    const { id, data } = params;
    return request<FearAndGreed>({
      url: `/fear-and-greed/${id}`,
      method: HttpMethod.PATCH,
      data: data,
    }).then((res) => res.data);
  };

  return {
    fearAndGreedCreate,
    fearAndGreedUpdate,
    fearAndGreedDelete,
    fearAndGreedList,
    fearAndGreedGet,
  };
}
