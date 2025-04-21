import axiosClient from "~/libs/axiosClient";

export const getUser = async () => {
  const response = await axiosClient({
    method: "GET",
    url: `/auth/login`,
  });
  return response.data;
};

export interface IFormInput {
  username: string;
  email: string;
  password: string;
}
export const register = async (props: IFormInput) => {
  const response = await axiosClient({
    method: "POST",
    url: `/auth/register`,
    data: {
      ...props,
    },
  });
  return response.data;
};
