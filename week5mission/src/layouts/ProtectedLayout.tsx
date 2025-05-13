import { useAuth } from "../context/AuthContext.tsx";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedLayout = () => {
  const { accessToken } = useAuth();
  const location = useLocation();

  if (!accessToken) {
    // 로그인하지 않은 경우 로그인 페이지로 이동하며 현재 경로를 상태로 전달
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
};

export default ProtectedLayout;
