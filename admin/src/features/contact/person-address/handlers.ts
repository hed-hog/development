import { useDefaultMutation } from "@/hooks/use-default-mutation";
import { useQuery } from "@tanstack/react-query";
import { requests } from "./requests";

const scope = "person-address";

export function usePersonAddressCreate() {
  const { personAddressCreate } = requests();
  return useDefaultMutation(scope, "create", personAddressCreate);
}

export function usePersonAddressDelete() {
  const { personAddressDelete } = requests();
  return useDefaultMutation(scope, "delete", personAddressDelete);
}

export function usePersonAddressUpdate() {
  const { personAddressUpdate } = requests();
  return useDefaultMutation(scope, "update", personAddressUpdate);
}

export function usePersonAddressGet(personId: number, id: number) {
  const { personAddressGet } = requests();
  return useQuery({
    queryKey: [scope, "get"],
    queryFn: () => personAddressGet({ personId, id }),
  });
}
