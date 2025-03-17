import { useQuery } from "@tanstack/react-query";
import { getBoardsDetail } from "~/apis/boards";

export const useGetBoardDetail = () => {
  return useQuery({
    queryKey: ["useGetBoardDetail"],
    queryFn: () => {
      return getBoardsDetail();
    },
  });
};
