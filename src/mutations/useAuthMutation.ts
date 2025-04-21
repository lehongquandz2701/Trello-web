import { useMutation } from "@tanstack/react-query";
import { register } from "~/apis/user";
import { signInEmailPassword } from "~/libs/firebase";

export const useLogin = () => {
  return useMutation({
    mutationFn: signInEmailPassword,
  });
};

export const useRegister = () => {
  return useMutation({
    mutationFn: register,
  });
};
