import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { signupapi } from "../api/apiService";
import { setItemToLocalStorage } from "../utils/helper";

export function useSignup() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
  const { mutate: signup, isPending: isLoading } = useMutation({
    mutationFn: signupapi,
    onSuccess: (data) => {

      queryClient.setQueryData(['user'], data.user);
      queryClient.setQueryData(['session'], data.authorisation);
      setItemToLocalStorage('token', data.authorisation.token);
      navigate('/', { replace: true });


    },
    onError: (err) => {
    },
  });

  return { signup, isLoading };
}

