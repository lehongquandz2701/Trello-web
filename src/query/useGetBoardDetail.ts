import { useQuery } from "@tanstack/react-query";
import { getBoardsDetail } from "~/apis/boards";
import { queryKey } from "~/utilities/constant";

export const useGetBoardDetail = () => {
  return useQuery({
    queryKey: [queryKey.getBoards],
    queryFn: () => {
      return getBoardsDetail();
    },
  });
};
