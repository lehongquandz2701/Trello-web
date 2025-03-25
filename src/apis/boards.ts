import axiosClient from "~/libs/axiosClient";
import { TBoard, TColumns } from "~/utilities/types";

export const getBoards = async () => {
  const response = await axiosClient({
    method: "GET",
    url: "/boards",
  });
  return response.data;
};

export const getBoardsDetail = async () => {
  const response = await axiosClient<TBoard>({
    method: "GET",
    url: `/boards/67d7ec88376ad2643d0dad4e`,
  });
  return response.data;
};

export const updateColumnOfBoard = async ({
  id,
  columnOrderIds,
}: {
  id: string;
  columnOrderIds: string[];
}) => {
  const response = await axiosClient<TBoard>({
    method: "PUT",
    url: `/boards/${id}`,
    data: {
      columnOrderIds,
    },
  });
  return response.data;
};

export const updateCardDifferenceColumn = async ({
  prevCardOrderIds,
  nextCardOrderIds,
  nextColumnId,
  prevColumnId,
  currentCardId,
}: {
  nextColumnId?: string;
  prevColumnId?: string;
  prevCardOrderIds?: string[];
  nextCardOrderIds?: string[];
  currentCardId?: string;
}) => {
  const response = await axiosClient<TColumns>({
    method: "PUT",
    url: `/boards/support/moving_cards`,
    data: {
      prevCardOrderIds,
      nextCardOrderIds,
      nextColumnId,
      prevColumnId,
      currentCardId,
    },
  });
  return response.data;
};
