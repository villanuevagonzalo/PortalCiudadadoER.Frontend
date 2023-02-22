import { useEffect } from "react";
import { Navigate, Route, useNavigate } from "react-router-dom";


export const PrivateRoute = (props:{ children: any }) =>{
  const token = localStorage.getItem("authToken");
  return token ? props.children : <Navigate to="/Ingresar" />;
}

export const PublicRoute = (props:{ children: any }) =>{
  const token = localStorage.getItem("authToken");
  return token ? <Navigate to="/Dashboard/" /> : props.children;
}
