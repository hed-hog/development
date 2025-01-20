import { useDefaultMutation } from "@/hooks/use-default-mutation";
import { useQuery } from "@tanstack/react-query";
import { requests } from "./requests";

const scope = "indices";

export function useIndicesCreate() {
  const { indicesCreate } = requests();
  return useDefaultMutation(scope, "create", indicesCreate);
}

export function useIndicesDelete() {
  const { indicesDelete } = requests();
  return useDefaultMutation(scope, "delete", indicesDelete);
}

export function useIndicesUpdate() {
  const { indicesUpdate } = requests();
  return useDefaultMutation(scope, "update", indicesUpdate);
}

export function useIndicesGet(id: number) {
  const { indicesGet } = requests();
  return useQuery({
    queryKey: [scope, "get"],
    queryFn: () => indicesGet(id),
  });
}
