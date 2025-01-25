import { useDefaultMutation } from "@/hooks/use-default-mutation";
import { useQuery } from "@tanstack/react-query";
import { requests } from "./requests";

const scope = "item";

export function useItemCreate() {
  const { itemCreate } = requests();
  return useDefaultMutation(scope, "create", itemCreate);
}

export function useItemDelete() {
  const { itemDelete } = requests();
  return useDefaultMutation(scope, "delete", itemDelete);
}

export function useItemUpdate() {
  const { itemUpdate } = requests();
  return useDefaultMutation(scope, "update", itemUpdate);
}

export function useItemGet(id: number) {
  const { itemGet } = requests();
  return useQuery({
    queryKey: [scope, "get"],
    queryFn: () => itemGet(id),
  });
}
