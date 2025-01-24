import { useDefaultMutation } from "@/hooks/use-default-mutation";
import { useQuery } from "@tanstack/react-query";
import { requests } from "./requests";

const scope = "top-coin-type";

export function useTopCoinTypeCreate() {
  const { topCoinTypeCreate } = requests();
  return useDefaultMutation(scope, "create", topCoinTypeCreate);
}

export function useTopCoinTypeDelete() {
  const { topCoinTypeDelete } = requests();
  return useDefaultMutation(scope, "delete", topCoinTypeDelete);
}

export function useTopCoinTypeUpdate() {
  const { topCoinTypeUpdate } = requests();
  return useDefaultMutation(scope, "update", topCoinTypeUpdate);
}

export function useTopCoinTypeGet(id: number) {
  const { topCoinTypeGet } = requests();
  return useQuery({
    queryKey: [scope, "get"],
    queryFn: () => topCoinTypeGet(id),
  });
}
