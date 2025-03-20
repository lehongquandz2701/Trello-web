import { useMutation } from "@tanstack/react-query";
import { createColumn } from "~/apis/columns";

export const useCreateColumn = () => {
  return useMutation({
    mutationFn: createColumn,
  });
};
