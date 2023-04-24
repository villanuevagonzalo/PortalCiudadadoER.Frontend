import { Navigate } from "react-router-dom";
import { getLSData } from "../Utils/General";
import { Pages } from "./Pages";

export const PrivateRoute = (props:{ children: any }) =>{
  const token = getLSData("authToken");
  return token ? props.children : <Navigate to={Pages.AUTH_LOGIN} />;
}

export const PublicRoute = (props:{ children: any }) =>{
  const token = getLSData("authToken");
  return token ? <Navigate to={Pages.DC}/> : props.children;
}
