import axiosClient from "~/libs/axiosClient";
import { TCards } from "~/utilities/types";

export const createCard = async ({
  boardId,
  title,
  columnId,
}: {
  boardId: string;
  title: string;
  columnId: string;
}) => {
  const response = await axiosClient<TCards>({
    method: "POST",
    url: `/cards`,
    data: {
      title,
      boardId,
      columnId,
    },
  });
  return response.data;
};
