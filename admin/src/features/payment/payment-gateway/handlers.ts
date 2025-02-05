import { useDefaultMutation } from "@/hooks/use-default-mutation";
import { useQuery } from "@tanstack/react-query";
import { requests } from "./requests";

const scope = "payment-gateway";

export function usePaymentGatewayCreate() {
  const { paymentGatewayCreate } = requests();
  return useDefaultMutation(scope, "create", paymentGatewayCreate);
}

export function usePaymentGatewayDelete() {
  const { paymentGatewayDelete } = requests();
  return useDefaultMutation(scope, "delete", paymentGatewayDelete);
}

export function usePaymentGatewayUpdate() {
  const { paymentGatewayUpdate } = requests();
  return useDefaultMutation(scope, "update", paymentGatewayUpdate);
}

export function usePaymentGatewayGet(id: number) {
  const { paymentGatewayGet } = requests();
  return useQuery({
    queryKey: [scope, "get"],
    queryFn: () => paymentGatewayGet(id),
  });
}
