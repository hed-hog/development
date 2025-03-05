import { useDefaultMutation } from "@/hooks/use-default-mutation";
import { useQuery } from "@tanstack/react-query";
import { requests } from "./requests";

const scope = "payment-value";

export function usePaymentValueCreate() {
  const { paymentValueCreate } = requests();
  return useDefaultMutation(scope, "create", paymentValueCreate);
}

export function usePaymentValueDelete() {
  const { paymentValueDelete } = requests();
  return useDefaultMutation(scope, "delete", paymentValueDelete);
}

export function usePaymentValueUpdate() {
  const { paymentValueUpdate } = requests();
  return useDefaultMutation(scope, "update", paymentValueUpdate);
}

export function usePaymentValueGet(paymentId: number, id: number) {
  const { paymentValueGet } = requests();
  return useQuery({
    queryKey: [scope, "get"],
    queryFn: () => paymentValueGet({ paymentId, id }),
  });
}
