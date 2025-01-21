import { useDefaultMutation } from "@/hooks/use-default-mutation";
import { useQuery } from "@tanstack/react-query";
import { requests } from "./requests";

const scope = "person-contact";

export function usePersonContactCreate() {
  const { personContactCreate } = requests();
  return useDefaultMutation(scope, "create", personContactCreate);
}

export function usePersonContactDelete() {
  const { personContactDelete } = requests();
  return useDefaultMutation(scope, "delete", personContactDelete);
}

export function usePersonContactUpdate() {
  const { personContactUpdate } = requests();
  return useDefaultMutation(scope, "update", personContactUpdate);
}

export function usePersonContactGet(personId: number, id: number) {
  const { personContactGet } = requests();
  return useQuery({
    queryKey: [scope, "get"],
    queryFn: () => personContactGet({ personId, id }),
  });
}
