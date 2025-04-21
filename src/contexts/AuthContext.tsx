import { QueryObserverResult, useQuery } from "@tanstack/react-query";
import React, { createContext, useCallback, useContext } from "react";
import { getCurrentUser } from "~/libs/firebase";
import { User } from "firebase/auth";
import { getUser } from "~/apis/user";

type AuthContextType = {
  user: User | undefined;
  loading: boolean;
  refetchUser: () => Promise<QueryObserverResult<any, Error>>;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const data = useQuery({
    queryKey: ["authUser"],
    queryFn: async () => {
      const user = await getCurrentUser();

      if (!user) {
        return null;
      }

      return getUser();
    },
    refetchOnMount: true,
  });
  const refetchUser = useCallback(async () => {
    return await data.refetch();
  }, [data.data]);

  return (
    <AuthContext.Provider
      value={{ user: data.data, loading: data.isLoading, refetchUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => useContext(AuthContext);
