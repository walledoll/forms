import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query'
import { createUser, deleteUser, fetchUser, fetchUsers, getMe, login, logout, updateUser } from '../api/users';
import { useNavigate} from 'react-router-dom';

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
      mutationFn: deleteUser,
      onSuccess: () => {
        queryClient.invalidateQueries({queryKey: ['users']});
      }
    }
  );
}

export const useLogin = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation(
    {
      mutationFn: login,
      onSuccess: () => {
        queryClient.invalidateQueries({queryKey: ['auth', 'me']})
        navigate('/');
      } 
    }
  )
}

export const useLogout = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation(
    {
      mutationFn: logout,
      onSuccess: () => {
        queryClient.removeQueries({queryKey: ['auth']});
        queryClient.invalidateQueries({queryKey: ['auth', 'me']});
        navigate('/login');
      }
    }
  )
}

export const useAuthMe = () => {
  return useQuery(
    {
      queryFn: getMe,
      queryKey: ['auth', 'me'], 
    }
  )
}

