import { useMutation } from "@tanstack/react-query";
import { updateCardDifferenceColumn, updateColumnOfBoard } from "~/apis/boards";
import { createColumn, deleteColumn } from "~/apis/columns";

export const useCreateColumn = () => {
  return useMutation({
    mutationFn: createColumn,
  });
};

export const useUpdateColumn = () => {
  return useMutation({
    mutationFn: updateColumnOfBoard,
  });
};

export const useArrangeCardsColumn = () => {
  return useMutation({
    mutationFn: updateCardDifferenceColumn,
  });
};

export const useDelete = () => {
  return useMutation({
    mutationFn: deleteColumn,
  });
};
