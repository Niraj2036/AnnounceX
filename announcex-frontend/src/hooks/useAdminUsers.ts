import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { adminUsersApi } from "@/api/admin-users.api";
import { keepPreviousData } from "@tanstack/react-query";

import {
  CreateUserPayload,
  UpdateUserPayload,
  GetUsersParams,
} from "@/types/users";


export const useAdminUsers = (params: GetUsersParams) => {
  return useQuery({
    queryKey: ["admin-users", params],
    queryFn: () => adminUsersApi.getAll(params),
    placeholderData:keepPreviousData, 
  });
};

export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: adminUsersApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["admin-users"],
      });
    },
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: adminUsersApi.update,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["admin-users"],
      });
    },
  });
};


export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: adminUsersApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["admin-users"],
      });
    },
  });
};
