import { useDefaultMutation } from "@/hooks/use-default-mutation";
import { useQuery } from "@tanstack/react-query";
import { requests } from "./requests";

const scope = "person";

export function usePersonCreate() {
  const { personCreate } = requests();
  return useDefaultMutation(scope, "create", personCreate);
}

export function usePersonDelete() {
  const { personDelete } = requests();
  return useDefaultMutation(scope, "delete", personDelete);
}

export function usePersonUpdate() {
  const { personUpdate } = requests();
  return useDefaultMutation(scope, "update", personUpdate);
}

export function usePersonGet(id: number) {
  const { personGet } = requests();
  return useQuery({
    queryKey: [scope, "get"],
    queryFn: () => personGet(id),
  });
}
