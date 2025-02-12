import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useNavigate } from 'react-router-dom';


import { loginApi, signupapi } from '../api/apiService';
import { setItemToLocalStorage } from '../utils/helper';

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: login, isPending: isLoading } = useMutation({
    
    mutationFn: loginApi,
    onSuccess: (data) => {
      queryClient.setQueryData(['user'], data.user);
      queryClient.setQueryData(['session'], data.authorisation);
      setItemToLocalStorage('token', data.authorisation.token);
      navigate('/', { replace: true });
      
    },
    onError: (err) => {
      console.log('ERROR', err);
    },
  });

  return { login, isLoading };
}




