import axiosClient from "~/libs/axiosClient";
import { TColumns } from "~/utilities/types";

export const createColumn = async ({
  boardId,
  title,
}: {
  boardId: string;
  title: string;
}) => {
  const response = await axiosClient<TColumns>({
    method: "POST",
    url: `/columns`,
    data: {
      title,
      boardId,
    },
  });
  return response.data;
};
