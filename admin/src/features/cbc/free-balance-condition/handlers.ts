import { useDefaultMutation } from "@/hooks/use-default-mutation";
import { useQuery } from "@tanstack/react-query";
import { requests } from "./requests";

const scope = "free-balance-condition";

export function useFreeBalanceConditionCreate() {
  const { freeBalanceConditionCreate } = requests();
  return useDefaultMutation(scope, "create", freeBalanceConditionCreate);
}

export function useFreeBalanceConditionDelete() {
  const { freeBalanceConditionDelete } = requests();
  return useDefaultMutation(scope, "delete", freeBalanceConditionDelete);
}

export function useFreeBalanceConditionUpdate() {
  const { freeBalanceConditionUpdate } = requests();
  return useDefaultMutation(scope, "update", freeBalanceConditionUpdate);
}

export function useFreeBalanceConditionGet(id: number) {
  const { freeBalanceConditionGet } = requests();
  return useQuery({
    queryKey: [scope, "get"],
    queryFn: () => freeBalanceConditionGet(id),
  });
}
