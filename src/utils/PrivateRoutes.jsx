import { Outlet, Navigate } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";

const PrivateRoutes = () => {
  const jwstoken = Cookies.get("auth_token");
  const [auth, setChemin] = useState(jwstoken ? true : false);
  return auth ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
