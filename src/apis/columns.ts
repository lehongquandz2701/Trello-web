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

export const updateCardInsideColumn = async ({
  id,
  cardOrderIds,
}: {
  id: string;
  cardOrderIds: string[];
}) => {
  const response = await axiosClient<TColumns>({
    method: "PUT",
    url: `/columns/${id}`,
    data: {
      cardOrderIds,
    },
  });
  return response.data;
};

export const deleteColumn = async ({ id }: { id: string }) => {
  const response = await axiosClient<TColumns>({
    method: "DELETE",
    url: `/columns/${id}`,
  });
  return response.data;
};
