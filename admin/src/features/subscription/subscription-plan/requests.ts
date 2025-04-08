import { useApp } from "@/hooks/use-app";
import { Delete, PaginationParams, PaginationResult } from "@/types";
import { SubscriptionPlan } from "@/types/models";
import { HttpMethod } from "@/types/http-method";
import { formatDataWithLocale } from "@hedhog/utils";

export function requests() {
  const { request } = useApp();

  const subscriptionPlanList = async (params: PaginationParams) => {
    return request<PaginationResult<SubscriptionPlan>>({
      url: "/subscription-plan",
      params,
    }).then((res) => res.data);
  };

  const subscriptionPlanGet = async (id: number) => {
    return request<SubscriptionPlan>({
      url: `/subscription-plan/${id}`,
    }).then((res) => res.data);
  };

  const subscriptionPlanCreate = async (params: { data: SubscriptionPlan }) => {
    const { data } = params;
    return request<SubscriptionPlan>({
      url: "/subscription-plan",
      method: HttpMethod.POST,
      data: formatDataWithLocale(data),
    }).then((res) => res.data);
  };

  const subscriptionPlanDelete = async (ids: number[]) => {
    return request<Delete>({
      url: "/subscription-plan",
      data: { ids },
      method: HttpMethod.DELETE,
    }).then((res) => res.data);
  };

  const subscriptionPlanUpdate = async (params: {
    id: number;
    data: SubscriptionPlan;
  }) => {
    const { id, data } = params;
    return request<SubscriptionPlan>({
      url: `/subscription-plan/${id}`,
      method: HttpMethod.PATCH,
      data: formatDataWithLocale(data),
    }).then((res) => res.data);
  };

  return {
    subscriptionPlanCreate,
    subscriptionPlanUpdate,
    subscriptionPlanDelete,
    subscriptionPlanList,
    subscriptionPlanGet,
  };
}
