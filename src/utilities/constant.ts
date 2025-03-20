import { toast } from "react-toastify";

export const envs = {
  BASE_URL: import.meta.env.VITE_BASE_URL,
};

export const queryKey = {
  getBoards: "useGetBoardDetail",
};

export const toastSuccess = (message: string) => {
  return toast.success(message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });
};

export const toastError = (message: string) => {
  return toast.error(message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });
};
