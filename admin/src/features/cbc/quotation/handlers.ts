import { useDefaultMutation } from "@/hooks/use-default-mutation";
import { useQuery } from "@tanstack/react-query";
import { requests } from "./requests";

const scope = "quotation";

export function useQuotationCreate() {
  const { quotationCreate } = requests();
  return useDefaultMutation(scope, "create", quotationCreate);
}

export function useQuotationDelete() {
  const { quotationDelete } = requests();
  return useDefaultMutation(scope, "delete", quotationDelete);
}

export function useQuotationUpdate() {
  const { quotationUpdate } = requests();
  return useDefaultMutation(scope, "update", quotationUpdate);
}

export function useQuotationGet(id: number) {
  const { quotationGet } = requests();
  return useQuery({
    queryKey: [scope, "get"],
    queryFn: () => quotationGet(id),
  });
}
