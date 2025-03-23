import { useMutation } from "@tanstack/react-query";
import { createCard } from "~/apis/cards";
import { updateCardInsideColumn } from "~/apis/columns";

export const useCreateCard = () => {
  return useMutation({
    mutationFn: createCard,
  });
};

export const useUpdateIndexCard = () => {
  return useMutation({
    mutationFn: updateCardInsideColumn,
  });
};
