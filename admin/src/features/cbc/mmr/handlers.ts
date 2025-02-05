import { useDefaultMutation } from "@/hooks/use-default-mutation";
import { useQuery } from "@tanstack/react-query";
import { requests } from "./requests";

const scope = "mmr";

export function useMmrCreate() {
  const { mmrCreate } = requests();
  return useDefaultMutation(scope, "create", mmrCreate);
}

export function useMmrDelete() {
  const { mmrDelete } = requests();
  return useDefaultMutation(scope, "delete", mmrDelete);
}

export function useMmrUpdate() {
  const { mmrUpdate } = requests();
  return useDefaultMutation(scope, "update", mmrUpdate);
}

export function useMmrGet(id: number) {
  const { mmrGet } = requests();
  return useQuery({
    queryKey: [scope, "get"],
    queryFn: () => mmrGet(id),
  });
}
