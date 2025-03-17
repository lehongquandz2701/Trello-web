import axiosClient from "~/libs/axiosClient";
import { TBoard } from "~/utilities/types";

export const getBoards = async () => {
  const response = await axiosClient({
    method: "GET",
    url: "/boards",
  });
  return response.data;
};

export const getBoardsDetail = async (id?: string) => {
  const response = await axiosClient<TBoard>({
    method: "GET",
    url: `/boards/67d7ec88376ad2643d0dad4e`,
  });
  return response.data;
};
