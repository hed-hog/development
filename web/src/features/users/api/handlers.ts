import { useMutation, useQuery } from "@tanstack/react-query";
import { createUser, getUsers } from "./axios";
import { queryClient } from "@/lib/query-provider";

export function useUsers() {
  return useQuery({
    queryKey: ['users'],
    queryFn: getUsers
  })
}

export function useCreateUser() {
  return useMutation({
    mutationKey: ['post-user'],
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
    }
  })
}
