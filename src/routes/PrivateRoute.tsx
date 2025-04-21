import { Outlet, Navigate } from "react-router";
import { Loading } from "~/components";
import { useAuth } from "~/contexts/AuthContext";
const PrivateRoute = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <Loading />;
  }

  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
