import { useDefaultMutation } from "@/hooks/use-default-mutation";
import { useQuery } from "@tanstack/react-query";
import { requests } from "./requests";

const scope = "subscription-person";

export function useSubscriptionPersonCreate() {
  const { subscriptionPersonCreate } = requests();
  return useDefaultMutation(scope, "create", subscriptionPersonCreate);
}

export function useSubscriptionPersonDelete() {
  const { subscriptionPersonDelete } = requests();
  return useDefaultMutation(scope, "delete", subscriptionPersonDelete);
}

export function useSubscriptionPersonUpdate() {
  const { subscriptionPersonUpdate } = requests();
  return useDefaultMutation(scope, "update", subscriptionPersonUpdate);
}

export function useSubscriptionPersonGet(subscriptionId: number, id: number) {
  const { subscriptionPersonGet } = requests();
  return useQuery({
    queryKey: [scope, "get"],
    queryFn: () => subscriptionPersonGet({ subscriptionId, id }),
  });
}
