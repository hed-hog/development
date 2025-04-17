import { useDefaultMutation } from "@/hooks/use-default-mutation";
import { useQuery } from "@tanstack/react-query";
import { requests } from "./requests";

const scope = "discount-type";

export function useDiscountTypeCreate() {
  const { discountTypeCreate } = requests();
  return useDefaultMutation(scope, "create", discountTypeCreate);
}

export function useDiscountTypeDelete() {
  const { discountTypeDelete } = requests();
  return useDefaultMutation(scope, "delete", discountTypeDelete);
}

export function useDiscountTypeUpdate() {
  const { discountTypeUpdate } = requests();
  return useDefaultMutation(scope, "update", discountTypeUpdate);
}

export function useDiscountTypeGet(id: number) {
  const { discountTypeGet } = requests();
  return useQuery({
    queryKey: [scope, "get"],
    queryFn: () => discountTypeGet(id),
  });
}
