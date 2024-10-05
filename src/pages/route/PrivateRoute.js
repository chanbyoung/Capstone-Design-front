import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

const PrivateRoute = () => {
  const { isLoggedIn } = useContext(AuthContext); // AuthContext에서 로그인 상태 가져오기

  if (!isLoggedIn) {
    alert("로그인 후 이용해 주세요");
    return <Navigate to="/LoginPage" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;