import { useDefaultMutation } from "@/hooks/use-default-mutation";
import { useQuery } from "@tanstack/react-query";
import { requests } from "./requests";

const scope = "payment-item";

export function usePaymentItemCreate() {
  const { paymentItemCreate } = requests();
  return useDefaultMutation(scope, "create", paymentItemCreate);
}

export function usePaymentItemDelete() {
  const { paymentItemDelete } = requests();
  return useDefaultMutation(scope, "delete", paymentItemDelete);
}

export function usePaymentItemUpdate() {
  const { paymentItemUpdate } = requests();
  return useDefaultMutation(scope, "update", paymentItemUpdate);
}

export function usePaymentItemGet(paymentId: number, id: number) {
  const { paymentItemGet } = requests();
  return useQuery({
    queryKey: [scope, "get"],
    queryFn: () => paymentItemGet({ paymentId, id }),
  });
}
