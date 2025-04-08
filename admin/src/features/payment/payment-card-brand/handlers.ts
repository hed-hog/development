import { useDefaultMutation } from "@/hooks/use-default-mutation";
import { useQuery } from "@tanstack/react-query";
import { requests } from "./requests";

const scope = "payment-card-brand";

export function usePaymentCardBrandCreate() {
  const { paymentCardBrandCreate } = requests();
  return useDefaultMutation(scope, "create", paymentCardBrandCreate);
}

export function usePaymentCardBrandDelete() {
  const { paymentCardBrandDelete } = requests();
  return useDefaultMutation(scope, "delete", paymentCardBrandDelete);
}

export function usePaymentCardBrandUpdate() {
  const { paymentCardBrandUpdate } = requests();
  return useDefaultMutation(scope, "update", paymentCardBrandUpdate);
}

export function usePaymentCardBrandGet(id: number) {
  const { paymentCardBrandGet } = requests();
  return useQuery({
    queryKey: [scope, "get"],
    queryFn: () => paymentCardBrandGet(id),
  });
}
