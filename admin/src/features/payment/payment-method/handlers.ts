import { useDefaultMutation } from "@/hooks/use-default-mutation";
import { useQuery } from "@tanstack/react-query";
import { requests } from "./requests";

const scope = "payment-method";

export function usePaymentMethodCreate() {
  const { paymentMethodCreate } = requests();
  return useDefaultMutation(scope, "create", paymentMethodCreate);
}

export function usePaymentMethodDelete() {
  const { paymentMethodDelete } = requests();
  return useDefaultMutation(scope, "delete", paymentMethodDelete);
}

export function usePaymentMethodUpdate() {
  const { paymentMethodUpdate } = requests();
  return useDefaultMutation(scope, "update", paymentMethodUpdate);
}

export function usePaymentMethodGet(id: number) {
  const { paymentMethodGet } = requests();
  return useQuery({
    queryKey: [scope, "get"],
    queryFn: () => paymentMethodGet(id),
  });
}
