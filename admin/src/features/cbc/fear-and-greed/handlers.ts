import { useDefaultMutation } from "@/hooks/use-default-mutation";
import { useQuery } from "@tanstack/react-query";
import { requests } from "./requests";

const scope = "fear-and-greed";

export function useFearAndGreedCreate() {
  const { fearAndGreedCreate } = requests();
  return useDefaultMutation(scope, "create", fearAndGreedCreate);
}

export function useFearAndGreedDelete() {
  const { fearAndGreedDelete } = requests();
  return useDefaultMutation(scope, "delete", fearAndGreedDelete);
}

export function useFearAndGreedUpdate() {
  const { fearAndGreedUpdate } = requests();
  return useDefaultMutation(scope, "update", fearAndGreedUpdate);
}

export function useFearAndGreedGet(id: number) {
  const { fearAndGreedGet } = requests();
  return useQuery({
    queryKey: [scope, "get"],
    queryFn: () => fearAndGreedGet(id),
  });
}
