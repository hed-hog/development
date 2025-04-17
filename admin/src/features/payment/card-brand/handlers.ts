import { useDefaultMutation } from "@/hooks/use-default-mutation";
import { useQuery } from "@tanstack/react-query";
import { requests } from "./requests";

const scope = "card-brand";

export function useCardBrandCreate() {
  const { cardBrandCreate } = requests();
  return useDefaultMutation(scope, "create", cardBrandCreate);
}

export function useCardBrandDelete() {
  const { cardBrandDelete } = requests();
  return useDefaultMutation(scope, "delete", cardBrandDelete);
}

export function useCardBrandUpdate() {
  const { cardBrandUpdate } = requests();
  return useDefaultMutation(scope, "update", cardBrandUpdate);
}

export function useCardBrandGet(id: number) {
  const { cardBrandGet } = requests();
  return useQuery({
    queryKey: [scope, "get"],
    queryFn: () => cardBrandGet(id),
  });
}
