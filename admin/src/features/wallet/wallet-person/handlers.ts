import { useDefaultMutation } from "@/hooks/use-default-mutation";
import { useQuery } from "@tanstack/react-query";
import { requests } from "./requests";

const scope = "wallet-person";

export function useWalletPersonCreate() {
  const { walletPersonCreate } = requests();
  return useDefaultMutation(scope, "create", walletPersonCreate);
}

export function useWalletPersonDelete() {
  const { walletPersonDelete } = requests();
  return useDefaultMutation(scope, "delete", walletPersonDelete);
}

export function useWalletPersonUpdate() {
  const { walletPersonUpdate } = requests();
  return useDefaultMutation(scope, "update", walletPersonUpdate);
}

export function useWalletPersonGet(id: number) {
  const { walletPersonGet } = requests();
  return useQuery({
    queryKey: [scope, "get"],
    queryFn: () => walletPersonGet(id),
  });
}
