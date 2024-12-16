import { useDefaultMutation } from "@/hooks/use-default-mutation";
import { useQuery } from "@tanstack/react-query";
import { requests } from "./requests";

const scope = "person-test";

export function usePersonTestCreate() {
  const { personTestCreate } = requests();
  return useDefaultMutation(scope, "create", personTestCreate);
}

export function usePersonTestDelete() {
  const { personTestDelete } = requests();
  return useDefaultMutation(scope, "delete", personTestDelete);
}

export function usePersonTestUpdate() {
  const { personTestUpdate } = requests();
  return useDefaultMutation(scope, "update", personTestUpdate);
}

export function usePersonTestGet(id: number) {
  const { personTestGet } = requests();
  return useQuery({
    queryKey: [scope, "get"],
    queryFn: () => personTestGet(id),
  });
}
