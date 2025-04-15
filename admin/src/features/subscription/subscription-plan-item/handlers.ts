import { useDefaultMutation } from "@/hooks/use-default-mutation";
import { useQuery } from "@tanstack/react-query";
import { requests } from "./requests";

const scope = "subscription-plan-item";

export function useSubscriptionPlanItemCreate() {
  const { subscriptionPlanItemCreate } = requests();
  return useDefaultMutation(scope, "create", subscriptionPlanItemCreate);
}

export function useSubscriptionPlanItemDelete() {
  const { subscriptionPlanItemDelete } = requests();
  return useDefaultMutation(scope, "delete", subscriptionPlanItemDelete);
}

export function useSubscriptionPlanItemUpdate() {
  const { subscriptionPlanItemUpdate } = requests();
  return useDefaultMutation(scope, "update", subscriptionPlanItemUpdate);
}

export function useSubscriptionPlanItemGet(id: number) {
  const { subscriptionPlanItemGet } = requests();
  return useQuery({
    queryKey: [scope, "get"],
    queryFn: () => subscriptionPlanItemGet(id),
  });
}
