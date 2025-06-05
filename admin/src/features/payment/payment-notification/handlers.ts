import { useDefaultMutation } from "@/hooks/use-default-mutation";
import { useQuery } from "@tanstack/react-query";
import { requests } from "./requests";

const scope = "payment-notification";

export function usePaymentNotificationCreate() {
  const { paymentNotificationCreate } = requests();
  return useDefaultMutation(scope, "create", paymentNotificationCreate);
}

export function usePaymentNotificationDelete() {
  const { paymentNotificationDelete } = requests();
  return useDefaultMutation(scope, "delete", paymentNotificationDelete);
}

export function usePaymentNotificationUpdate() {
  const { paymentNotificationUpdate } = requests();
  return useDefaultMutation(scope, "update", paymentNotificationUpdate);
}

export function usePaymentNotificationGet(paymentId: number, id: number) {
  const { paymentNotificationGet } = requests();
  return useQuery({
    queryKey: [scope, "get"],
    queryFn: () => paymentNotificationGet({ paymentId, id }),
  });
}
