import { useDefaultMutation } from "@/hooks/use-default-mutation";
import { useQuery } from "@tanstack/react-query";
import { requests } from "./requests";

const scope = "top-coins";

export function useTopCoinsCreate() {
  const { topCoinsCreate } = requests();
  return useDefaultMutation(scope, "create", topCoinsCreate);
}

export function useTopCoinsDelete() {
  const { topCoinsDelete } = requests();
  return useDefaultMutation(scope, "delete", topCoinsDelete);
}

export function useTopCoinsUpdate() {
  const { topCoinsUpdate } = requests();
  return useDefaultMutation(scope, "update", topCoinsUpdate);
}

export function useTopCoinsGet(id: number) {
  const { topCoinsGet } = requests();
  return useQuery({
    queryKey: [scope, "get"],
    queryFn: () => topCoinsGet(id),
  });
}
