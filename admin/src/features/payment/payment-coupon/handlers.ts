import { useDefaultMutation } from "@/hooks/use-default-mutation";
import { useQuery } from "@tanstack/react-query";
import { requests } from "./requests";

const scope = "payment-coupon";

export function usePaymentCouponCreate() {
  const { paymentCouponCreate } = requests();
  return useDefaultMutation(scope, "create", paymentCouponCreate);
}

export function usePaymentCouponDelete() {
  const { paymentCouponDelete } = requests();
  return useDefaultMutation(scope, "delete", paymentCouponDelete);
}

export function usePaymentCouponUpdate() {
  const { paymentCouponUpdate } = requests();
  return useDefaultMutation(scope, "update", paymentCouponUpdate);
}

export function usePaymentCouponGet(id: number) {
  const { paymentCouponGet } = requests();
  return useQuery({
    queryKey: [scope, "get"],
    queryFn: () => paymentCouponGet(id),
  });
}
