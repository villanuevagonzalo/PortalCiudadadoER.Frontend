import { useEffect } from "react";
import { Navigate, Route, useNavigate } from "react-router-dom";


export const PrivateRoute = (props:{ children: any }) =>{
  const token = localStorage.getItem("authToken");
  return token ? props.children : <Navigate to="/Ingresar" />;
}

export const AuthRoute = (props:{ children: any }) =>{
  const navigate = useNavigate();
  const token = localStorage.getItem("authToken");
  useEffect(() => {
    if(token){
      navigate('/Dashboard')
    }
  }, [token])
  
  return token ? null : props.children;
}
