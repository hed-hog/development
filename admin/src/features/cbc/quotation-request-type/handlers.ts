import { useDefaultMutation } from "@/hooks/use-default-mutation";
import { useQuery } from "@tanstack/react-query";
import { requests } from "./requests";

const scope = "quotation-request-type";

export function useQuotationRequestTypeCreate() {
  const { quotationRequestTypeCreate } = requests();
  return useDefaultMutation(scope, "create", quotationRequestTypeCreate);
}

export function useQuotationRequestTypeDelete() {
  const { quotationRequestTypeDelete } = requests();
  return useDefaultMutation(scope, "delete", quotationRequestTypeDelete);
}

export function useQuotationRequestTypeUpdate() {
  const { quotationRequestTypeUpdate } = requests();
  return useDefaultMutation(scope, "update", quotationRequestTypeUpdate);
}

export function useQuotationRequestTypeGet(id: number) {
  const { quotationRequestTypeGet } = requests();
  return useQuery({
    queryKey: [scope, "get"],
    queryFn: () => quotationRequestTypeGet(id),
  });
}
