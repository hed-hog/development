import { useDefaultMutation } from "@/hooks/use-default-mutation";
import { useQuery } from "@tanstack/react-query";
import { requests } from "./requests";

const scope = "wallet";

export function useWalletCreate() {
  const { walletCreate } = requests();
  return useDefaultMutation(scope, "create", walletCreate);
}

export function useWalletDelete() {
  const { walletDelete } = requests();
  return useDefaultMutation(scope, "delete", walletDelete);
}

export function useWalletUpdate() {
  const { walletUpdate } = requests();
  return useDefaultMutation(scope, "update", walletUpdate);
}

export function useWalletGet(id: number) {
  const { walletGet } = requests();
  return useQuery({
    queryKey: [scope, "get"],
    queryFn: () => walletGet(id),
  });
}
