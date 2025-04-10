import { useDefaultMutation } from "@/hooks/use-default-mutation";
import { useQuery } from "@tanstack/react-query";
import { requests } from "./requests";

const scope = "subscription-value";

export function useSubscriptionValueCreate() {
  const { subscriptionValueCreate } = requests();
  return useDefaultMutation(scope, "create", subscriptionValueCreate);
}

export function useSubscriptionValueDelete() {
  const { subscriptionValueDelete } = requests();
  return useDefaultMutation(scope, "delete", subscriptionValueDelete);
}

export function useSubscriptionValueUpdate() {
  const { subscriptionValueUpdate } = requests();
  return useDefaultMutation(scope, "update", subscriptionValueUpdate);
}

export function useSubscriptionValueGet(subscriptionId: number, id: number) {
  const { subscriptionValueGet } = requests();
  return useQuery({
    queryKey: [scope, "get"],
    queryFn: () => subscriptionValueGet({ subscriptionId, id }),
  });
}
