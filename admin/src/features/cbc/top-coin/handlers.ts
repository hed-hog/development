import { useDefaultMutation } from "@/hooks/use-default-mutation";
import { useQuery } from "@tanstack/react-query";
import { requests } from "./requests";

const scope = "top-coin";

export function useTopCoinCreate() {
  const { topCoinCreate } = requests();
  return useDefaultMutation(scope, "create", topCoinCreate);
}

export function useTopCoinDelete() {
  const { topCoinDelete } = requests();
  return useDefaultMutation(scope, "delete", topCoinDelete);
}

export function useTopCoinUpdate() {
  const { topCoinUpdate } = requests();
  return useDefaultMutation(scope, "update", topCoinUpdate);
}

export function useTopCoinGet(id: number) {
  const { topCoinGet } = requests();
  return useQuery({
    queryKey: [scope, "get"],
    queryFn: () => topCoinGet(id),
  });
}
