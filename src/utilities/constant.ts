import { toast } from "react-toastify";

export const envs = {
  BASE_URL: import.meta.env.VITE_BASE_URL,
  VITE_API_KEY: import.meta.env.VITE_API_KEY,
  VITE_AUTH_DOMAIN: import.meta.env.VITE_AUTH_DOMAIN,
  VITE_PROJECT_ID: import.meta.env.VITE_PROJECT_ID,
  VITE_STORAGE_BUCKET: import.meta.env.VITE_STORAGE_BUCKET,
  VITE_MESSAGING_SENDER_ID: import.meta.env.VITE_MESSAGING_SENDER_ID,
  VITE_APP_ID: import.meta.env.VITE_APP_ID,
  VITE_MEASUREMENT_ID: import.meta.env.VITE_MEASUREMENT_ID,
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
