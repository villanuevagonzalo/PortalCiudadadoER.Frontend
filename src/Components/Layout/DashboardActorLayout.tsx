import { useContext, useEffect, useState } from "react";
import { AiOutlineSchedule } from "react-icons/ai";
import { BiChevronsLeft, BiMenu, BiNotification, BiUserCircle } from "react-icons/bi";
import { BsLayoutWtf } from "react-icons/bs";
import { Link, NavLink, Outlet } from "react-router-dom";
import { AuthContext } from "../../Contexts/AuthContext";
import { LayoutBody, LayoutContainer, LayoutFooter, LayoutColumns,  LayoutHeader, LayoutOverlay, LayoutSidebar, LayoutSidebarMenu, RoundedButton } from "./StyledComponents";
import {  Card, DivSubtitle, DivTitle, DivTitle2,  NavigatorSpacer } from "../Elements/StyledComponents";
import { Button } from "../Forms/Button";
import { LogoCiudadanoDigital } from "../Images/LogoCiudadanoDigital";
import { LogoER } from "../Images/LogoEntreRios";

import { MdNotificationsNone } from "react-icons/md";
import useMediaQuery from "../../Utils/Hooks";

const navigation = [
  { name: 'Inicio', icon: BsLayoutWtf, href: 'Dashboard/', current: true },
  { name: 'Tramites Online', icon: AiOutlineSchedule, href: 'Dashboard/Tramites', current: false },
  { name: 'Notificaciones', icon: BiNotification, href: 'Dashboard/Mensajes', current: false }
]

export const DashboardActorLayout = () => {

  const matches = useMediaQuery('(min-width: 1024px)');
  const [ IsOpen, setIsOpen ] = useState<boolean>(matches);
  const { isLogged, userData, userRol, Logout } = useContext(AuthContext);
  
  useEffect(() => {
    if(matches){
      setIsOpen(true)
    }
  }, [matches])
  

  const switchmenu = () => setIsOpen(matches || !IsOpen);

  return (<>
    <LayoutHeader>{matches?<>
      <NavigatorSpacer /> 
      <Link to="Dashboard/Config" onClick={switchmenu}><RoundedButton>
        <span>{userData.name} {userData.last_name.toUpperCase()}</span>
        <BiUserCircle />
      </RoundedButton></Link>
      
        
    </>:<>
    <>
      {IsOpen?<BiChevronsLeft onClick={switchmenu}/>:<BiMenu onClick={switchmenu}/>}
      <NavigatorSpacer /> 
      <LogoCiudadanoDigital width="250px" mobile={true} />
      <NavigatorSpacer className="ml-1"/> 
      <MdNotificationsNone className="mr-2"/>
      <BiUserCircle />
    </>
    </>}</LayoutHeader>
    <LayoutContainer>
      <LayoutOverlay visible={IsOpen && !matches} onClick={switchmenu}/>
      <LayoutSidebar open={IsOpen} className="sidebar">
        {matches?<>
          <LayoutColumns className="mb-8">
            <LogoER width="150px" />
          </LayoutColumns>
          <LogoCiudadanoDigital width="300px"/>
        </>:''}
        <LayoutSidebarMenu match={false}>
        {navigation.map((item) => (
          <NavLink
            onClick={switchmenu}
            key={item.name}
            to={item.href}
            className={({isActive}) => (isActive ? 'bg-celeste text-white' : 'text-gray-700 hover:bg-gray-600 hover:text-white')+' px-3 py-2 rounded-md text-sm font-medium flex'}
            aria-current={item.current ? 'page' : undefined}
          >
            {<item.icon  className="h-4 w-4 mr-2 mt-0.5" />}
            {item.name}
          </NavLink>
        ))}

        </LayoutSidebarMenu>
        <Card>
          <DivTitle2 color="maincolor">{userData.name} {userData.last_name.toUpperCase()}</DivTitle2>
          <DivSubtitle color="maincolor" className="mt-1">{userRol[0].type}<b className="ml-2">{userRol[0].message}</b></DivSubtitle>

          <Link to="Dashboard/Config" className="w-full" onClick={switchmenu}><Button color="maincolor">
            Mi Perfil
          </Button></Link>

        </Card>
        <Button color="secondary" onClick={Logout}>
            Cerrar Sesión
        </Button>
      </LayoutSidebar>
      <LayoutBody>
        <Outlet></Outlet>
        <LayoutFooter>
          <LogoER width="150px" color='var(--gray_tint)' /> Secretaría de Modernización
        </LayoutFooter>
      </LayoutBody>
    </LayoutContainer>
  </>);
};