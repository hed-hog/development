import { useDefaultMutation } from "@/hooks/use-default-mutation";
import { useQuery } from "@tanstack/react-query";
import { requests } from "./requests";

const scope = "coin";

export function useCoinCreate() {
  const { coinCreate } = requests();
  return useDefaultMutation(scope, "create", coinCreate);
}

export function useCoinDelete() {
  const { coinDelete } = requests();
  return useDefaultMutation(scope, "delete", coinDelete);
}

export function useCoinUpdate() {
  const { coinUpdate } = requests();
  return useDefaultMutation(scope, "update", coinUpdate);
}

export function useCoinGet(id: number) {
  const { coinGet } = requests();
  return useQuery({
    queryKey: [scope, "get"],
    queryFn: () => coinGet(id),
  });
}
