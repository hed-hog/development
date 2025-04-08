import { useDefaultMutation } from "@/hooks/use-default-mutation";
import { useQuery } from "@tanstack/react-query";
import { requests } from "./requests";

const scope = "subscription-plan";

export function useSubscriptionPlanCreate() {
  const { subscriptionPlanCreate } = requests();
  return useDefaultMutation(scope, "create", subscriptionPlanCreate);
}

export function useSubscriptionPlanDelete() {
  const { subscriptionPlanDelete } = requests();
  return useDefaultMutation(scope, "delete", subscriptionPlanDelete);
}

export function useSubscriptionPlanUpdate() {
  const { subscriptionPlanUpdate } = requests();
  return useDefaultMutation(scope, "update", subscriptionPlanUpdate);
}

export function useSubscriptionPlanGet(id: number) {
  const { subscriptionPlanGet } = requests();
  return useQuery({
    queryKey: [scope, "get"],
    queryFn: () => subscriptionPlanGet(id),
  });
}
