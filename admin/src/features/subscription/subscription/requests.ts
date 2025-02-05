import { useApp } from "@/hooks/use-app";
import { Delete, PaginationParams, PaginationResult } from "@/types";
import { Subscription } from "@/types/models";
import { HttpMethod } from "@/types/http-method";

export function requests() {
  const { request } = useApp();

  const subscriptionList = async (params: PaginationParams) => {
    return request<PaginationResult<Subscription>>({
      url: "/subscription",
      params,
    }).then((res) => res.data);
  };

  const subscriptionGet = async (id: number) => {
    return request<Subscription>({
      url: `/subscription/${id}`,
    }).then((res) => res.data);
  };

  const subscriptionCreate = async (params: { data: Subscription }) => {
    const { data } = params;
    return request<Subscription>({
      url: "/subscription",
      method: HttpMethod.POST,
      data: data,
    }).then((res) => res.data);
  };

  const subscriptionDelete = async (ids: number[]) => {
    return request<Delete>({
      url: "/subscription",
      data: { ids },
      method: HttpMethod.DELETE,
    }).then((res) => res.data);
  };

  const subscriptionUpdate = async (params: {
    id: number;
    data: Subscription;
  }) => {
    const { id, data } = params;
    return request<Subscription>({
      url: `/subscription/${id}`,
      method: HttpMethod.PATCH,
      data: data,
    }).then((res) => res.data);
  };

  return {
    subscriptionCreate,
    subscriptionUpdate,
    subscriptionDelete,
    subscriptionList,
    subscriptionGet,
  };
}
