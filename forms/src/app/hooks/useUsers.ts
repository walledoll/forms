import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query'
import { createUser, fetchUser, fetchUsers, updateUser } from '../api/users';
import { User } from '@/entities/model/users';

export const getUsers = () => {
  return useQuery(
    {
      queryKey: ['users'], 
      queryFn: fetchUsers
    }
  );    
} 

export const getUserById = (id: number) => {
  return useQuery(
    {
      queryKey: ['users', id],  
      queryFn: () => fetchUser(id!),
      enabled: !!id
    }
  );
}

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  return useMutation(
    {
      mutationFn: updateUser,
      onSuccess: () => {
        queryClient.invalidateQueries({queryKey: ['users']});
      }
    }
  );
}

export const useCreateUser = () => {
  const queryClient = useQueryClient();
  return useMutation(
    {
      mutationFn: createUser,
      onSuccess: () => {
        queryClient.invalidateQueries({queryKey: ['users']});
      }
    }
  );
}

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  return useMutation(
    {
      mutationFn: updateUser,
      onSuccess: () => {
        queryClient.invalidateQueries({queryKey: ['users']});
      }
    }
  );
}

