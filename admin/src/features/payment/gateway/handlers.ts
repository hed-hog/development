import { useDefaultMutation } from "@/hooks/use-default-mutation";
import { useQuery } from "@tanstack/react-query";
import { requests } from "./requests";

const scope = "gateway";

export function useGatewayCreate() {
  const { gatewayCreate } = requests();
  return useDefaultMutation(scope, "create", gatewayCreate);
}

export function useGatewayDelete() {
  const { gatewayDelete } = requests();
  return useDefaultMutation(scope, "delete", gatewayDelete);
}

export function useGatewayUpdate() {
  const { gatewayUpdate } = requests();
  return useDefaultMutation(scope, "update", gatewayUpdate);
}

export function useGatewayGet(id: number) {
  const { gatewayGet } = requests();
  return useQuery({
    queryKey: [scope, "get"],
    queryFn: () => gatewayGet(id),
  });
}
