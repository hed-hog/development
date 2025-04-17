import { useApp } from "@/hooks/use-app";
import { Delete, PaginationParams, PaginationResult } from "@/types";
import { SubscriptionPlanItem } from "@/types/models";
import { HttpMethod } from "@/types/http-method";

export function requests() {
  const { request } = useApp();

  const subscriptionPlanItemList = async (params: PaginationParams) => {
    return request<PaginationResult<SubscriptionPlanItem>>({
      url: "/subscription-plan-item",
      params,
    }).then((res) => res.data);
  };

  const subscriptionPlanItemGet = async (id: number) => {
    return request<SubscriptionPlanItem>({
      url: `/subscription-plan-item/${id}`,
    }).then((res) => res.data);
  };

  const subscriptionPlanItemCreate = async (params: {
    data: SubscriptionPlanItem;
  }) => {
    const { data } = params;
    return request<SubscriptionPlanItem>({
      url: "/subscription-plan-item",
      method: HttpMethod.POST,
      data: data,
    }).then((res) => res.data);
  };

  const subscriptionPlanItemDelete = async (ids: number[]) => {
    return request<Delete>({
      url: "/subscription-plan-item",
      data: { ids },
      method: HttpMethod.DELETE,
    }).then((res) => res.data);
  };

  const subscriptionPlanItemUpdate = async (params: {
    id: number;
    data: SubscriptionPlanItem;
  }) => {
    const { id, data } = params;
    return request<SubscriptionPlanItem>({
      url: `/subscription-plan-item/${id}`,
      method: HttpMethod.PATCH,
      data: data,
    }).then((res) => res.data);
  };

  return {
    subscriptionPlanItemCreate,
    subscriptionPlanItemUpdate,
    subscriptionPlanItemDelete,
    subscriptionPlanItemList,
    subscriptionPlanItemGet,
  };
}
