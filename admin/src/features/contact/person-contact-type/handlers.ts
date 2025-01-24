import { useDefaultMutation } from "@/hooks/use-default-mutation";
import { useQuery } from "@tanstack/react-query";
import { requests } from "./requests";

const scope = "person-contact-type";

export function usePersonContactTypeCreate() {
  const { personContactTypeCreate } = requests();
  return useDefaultMutation(scope, "create", personContactTypeCreate);
}

export function usePersonContactTypeDelete() {
  const { personContactTypeDelete } = requests();
  return useDefaultMutation(scope, "delete", personContactTypeDelete);
}

export function usePersonContactTypeUpdate() {
  const { personContactTypeUpdate } = requests();
  return useDefaultMutation(scope, "update", personContactTypeUpdate);
}

export function usePersonContactTypeGet(id: number) {
  const { personContactTypeGet } = requests();
  return useQuery({
    queryKey: [scope, "get"],
    queryFn: () => personContactTypeGet(id),
  });
}
