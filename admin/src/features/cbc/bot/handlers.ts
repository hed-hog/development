import { useDefaultMutation } from "@/hooks/use-default-mutation";
import { useQuery } from "@tanstack/react-query";
import { requests } from "./requests";

const scope = "bot";

export function useBotCreate() {
  const { botCreate } = requests();
  return useDefaultMutation(scope, "create", botCreate);
}

export function useBotDelete() {
  const { botDelete } = requests();
  return useDefaultMutation(scope, "delete", botDelete);
}

export function useBotUpdate() {
  const { botUpdate } = requests();
  return useDefaultMutation(scope, "update", botUpdate);
}

export function useBotGet(id: number) {
  const { botGet } = requests();
  return useQuery({
    queryKey: [scope, "get"],
    queryFn: () => botGet(id),
  });
}
