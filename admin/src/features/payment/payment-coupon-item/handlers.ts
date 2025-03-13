import { useDefaultMutation } from "@/hooks/use-default-mutation";
import { useQuery } from "@tanstack/react-query";
import { requests } from "./requests";

const scope = "payment-coupon-item";

export function usePaymentCouponItemCreate() {
  const { paymentCouponItemCreate } = requests();
  return useDefaultMutation(scope, "create", paymentCouponItemCreate);
}

export function usePaymentCouponItemDelete() {
  const { paymentCouponItemDelete } = requests();
  return useDefaultMutation(scope, "delete", paymentCouponItemDelete);
}

export function usePaymentCouponItemUpdate() {
  const { paymentCouponItemUpdate } = requests();
  return useDefaultMutation(scope, "update", paymentCouponItemUpdate);
}

export function usePaymentCouponItemGet(couponId: number, id: number) {
  const { paymentCouponItemGet } = requests();
  return useQuery({
    queryKey: [scope, "get"],
    queryFn: () => paymentCouponItemGet({ couponId, id }),
  });
}
