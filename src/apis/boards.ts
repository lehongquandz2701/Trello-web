import axiosClient from "~/libs/axiosClient";

export const getBoards = async () => {
  const response = await axiosClient({
    method: "GET",
    url: "/boards",
  });
  return response.data;
};
