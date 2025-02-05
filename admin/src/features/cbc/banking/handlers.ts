import { useDefaultMutation } from "@/hooks/use-default-mutation";
import { useQuery } from "@tanstack/react-query";
import { requests } from "./requests";

const scope = "banking";

export function useBankingCreate() {
  const { bankingCreate } = requests();
  return useDefaultMutation(scope, "create", bankingCreate);
}

export function useBankingDelete() {
  const { bankingDelete } = requests();
  return useDefaultMutation(scope, "delete", bankingDelete);
}

export function useBankingUpdate() {
  const { bankingUpdate } = requests();
  return useDefaultMutation(scope, "update", bankingUpdate);
}

export function useBankingGet(id: number) {
  const { bankingGet } = requests();
  return useQuery({
    queryKey: [scope, "get"],
    queryFn: () => bankingGet(id),
  });
}
