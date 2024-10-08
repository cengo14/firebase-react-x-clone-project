import React, { useEffect, useState } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";

const Protected = () => {
  const [isAuth, setIsAuth] = useState();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setIsAuth(user ? true : false);
    });
  }, []);
  const navigate = useNavigate();
  useEffect(() => {
    if (isAuth === false) {
      navigate("/");
    }
  }, [isAuth]);
  // Diğer Yöntem
  // if (isAuth === false) {
  //   return <Navigate to="/" />;
  // }

  return <Outlet />;
};

export default Protected;
