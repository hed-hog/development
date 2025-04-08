import { useDefaultMutation } from "@/hooks/use-default-mutation";
import { useQuery } from "@tanstack/react-query";
import { requests } from "./requests";

const scope = "subscription-payment";

export function useSubscriptionPaymentCreate() {
  const { subscriptionPaymentCreate } = requests();
  return useDefaultMutation(scope, "create", subscriptionPaymentCreate);
}

export function useSubscriptionPaymentDelete() {
  const { subscriptionPaymentDelete } = requests();
  return useDefaultMutation(scope, "delete", subscriptionPaymentDelete);
}

export function useSubscriptionPaymentUpdate() {
  const { subscriptionPaymentUpdate } = requests();
  return useDefaultMutation(scope, "update", subscriptionPaymentUpdate);
}

export function useSubscriptionPaymentGet(subscriptionId: number, id: number) {
  const { subscriptionPaymentGet } = requests();
  return useQuery({
    queryKey: [scope, "get"],
    queryFn: () => subscriptionPaymentGet({ subscriptionId, id }),
  });
}
