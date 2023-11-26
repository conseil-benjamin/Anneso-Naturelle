import { Outlet, Navigate } from "react-router-dom";
import { useState } from "react";

const PrivateRoutes = () => {
  const isLoggedOrNot = localStorage.getItem("id");
  const [auth, setChemin] = useState(isLoggedOrNot ? true : false);
  return auth ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
