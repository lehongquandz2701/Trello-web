import { useMutation } from "@tanstack/react-query";
import { createCard } from "~/apis/cards";

export const useCreateCard = () => {
  return useMutation({
    mutationFn: createCard,
  });
};
