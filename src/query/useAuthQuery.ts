import { useQuery } from "@tanstack/react-query";
import { getUser } from "~/apis/user";

export const useGetUser = () => {
  return useQuery({
    queryKey: ["getUser"],
    queryFn: getUser,
  });
};
