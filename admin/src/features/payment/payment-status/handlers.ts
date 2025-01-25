import { useDefaultMutation } from "@/hooks/use-default-mutation";
import { useQuery } from "@tanstack/react-query";
import { requests } from "./requests";

const scope = "payment-status";

export function usePaymentStatusCreate() {
  const { paymentStatusCreate } = requests();
  return useDefaultMutation(scope, "create", paymentStatusCreate);
}

export function usePaymentStatusDelete() {
  const { paymentStatusDelete } = requests();
  return useDefaultMutation(scope, "delete", paymentStatusDelete);
}

export function usePaymentStatusUpdate() {
  const { paymentStatusUpdate } = requests();
  return useDefaultMutation(scope, "update", paymentStatusUpdate);
}

export function usePaymentStatusGet(id: number) {
  const { paymentStatusGet } = requests();
  return useQuery({
    queryKey: [scope, "get"],
    queryFn: () => paymentStatusGet(id),
  });
}
