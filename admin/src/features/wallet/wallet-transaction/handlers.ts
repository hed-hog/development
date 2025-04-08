import { useDefaultMutation } from "@/hooks/use-default-mutation";
import { useQuery } from "@tanstack/react-query";
import { requests } from "./requests";

const scope = "wallet-transaction";

export function useWalletTransactionCreate() {
  const { walletTransactionCreate } = requests();
  return useDefaultMutation(scope, "create", walletTransactionCreate);
}

export function useWalletTransactionDelete() {
  const { walletTransactionDelete } = requests();
  return useDefaultMutation(scope, "delete", walletTransactionDelete);
}

export function useWalletTransactionUpdate() {
  const { walletTransactionUpdate } = requests();
  return useDefaultMutation(scope, "update", walletTransactionUpdate);
}

export function useWalletTransactionGet(id: number) {
  const { walletTransactionGet } = requests();
  return useQuery({
    queryKey: [scope, "get"],
    queryFn: () => walletTransactionGet(id),
  });
}
