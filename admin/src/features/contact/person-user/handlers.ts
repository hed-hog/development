import { useDefaultMutation } from "@/hooks/use-default-mutation";
import { useQuery } from "@tanstack/react-query";
import { requests } from "./requests";

const scope = "person-user";

export function usePersonUserCreate() {
  const { personUserCreate } = requests();
  return useDefaultMutation(scope, "create", personUserCreate);
}

export function usePersonUserDelete() {
  const { personUserDelete } = requests();
  return useDefaultMutation(scope, "delete", personUserDelete);
}

export function usePersonUserUpdate() {
  const { personUserUpdate } = requests();
  return useDefaultMutation(scope, "update", personUserUpdate);
}

export function usePersonUserGet(personId: number, id: number) {
  const { personUserGet } = requests();
  return useQuery({
    queryKey: [scope, "get"],
    queryFn: () => personUserGet({ personId, id }),
  });
}
