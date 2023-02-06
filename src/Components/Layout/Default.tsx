import { useContext } from "react";
import { Outlet } from "react-router-dom"
import { AuthContext } from "../../Contexts/AuthContext";
import { LayoutContainer } from "../Elements/StyledComponents";

export const DefaultLayout = () =>{

  const { Logout, userData, isLogged } = useContext(AuthContext);

  return (
    <LayoutContainer className='flexswitch'>
      <Outlet></Outlet>
    </LayoutContainer>
  )
}