import { useDefaultMutation } from "@/hooks/use-default-mutation";
import { useQuery } from "@tanstack/react-query";
import { requests } from "./requests";

const scope = "quotation-type";

export function useQuotationTypeCreate() {
  const { quotationTypeCreate } = requests();
  return useDefaultMutation(scope, "create", quotationTypeCreate);
}

export function useQuotationTypeDelete() {
  const { quotationTypeDelete } = requests();
  return useDefaultMutation(scope, "delete", quotationTypeDelete);
}

export function useQuotationTypeUpdate() {
  const { quotationTypeUpdate } = requests();
  return useDefaultMutation(scope, "update", quotationTypeUpdate);
}

export function useQuotationTypeGet(id: number) {
  const { quotationTypeGet } = requests();
  return useQuery({
    queryKey: [scope, "get"],
    queryFn: () => quotationTypeGet(id),
  });
}
