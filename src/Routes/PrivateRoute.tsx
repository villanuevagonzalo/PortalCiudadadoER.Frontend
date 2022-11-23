import { Navigate, Route } from "react-router-dom";
import { LoginPage } from "../Pages/Auth/Login";
import { DashboardCiudadanoPage } from "../Pages/Dashboard/DashboardCiudadano";


export const PrivateRoute = (props:{ children: any }) =>{
  const token = localStorage.getItem("authToken");
  return token ? props.children : <Navigate to="/Ingresar" />;
}


//se deberá corroboar tipo de token y a partir de allí redireccionar al dashboard dependiendo el perfil 

export const HomeRoute = () =>{
  const token = localStorage.getItem("authToken");
  //return token ? <DashboardCiudadanoPage /> : <Navigate to="/Inicio" />;
  return token ? <Navigate to="/Inicio" /> : <Navigate to="/Inicio" />;
}