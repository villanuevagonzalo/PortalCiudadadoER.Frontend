import { useContext, useEffect, useState } from "react";
import { AiOutlineSchedule } from "react-icons/ai";
import { BiChevronsLeft, BiMenu, BiNotification, BiUserCircle } from "react-icons/bi";
import { BsLayoutWtf } from "react-icons/bs";
import { Link, NavLink, Outlet } from "react-router-dom";
import { AuthContext } from "../../Contexts/AuthContext";
import { LayoutAlert, LayoutBody, LayoutCenterBox, LayoutColumns, LayoutContainer, LayoutFooter, LayoutHeader, LayoutHeaderSpacer, LayoutOverlay, LayoutSidebar, LayoutSidebarMenu, UserNav } from "./StyledComponents";
import {  Card, DivSubtitle, DivTitle, DivTitle2, NavigatorSpacer } from "../Elements/StyledComponents";
import { Button } from "../Forms/Button";
import { LogoCiudadanoDigital } from "../Images/LogoCiudadanoDigital";
import { LogoER } from "../Images/LogoEntreRios";

import { MdNotificationsNone } from "react-icons/md";
import useMediaQuery from "../../Utils/Hooks";
import { RiLayout4Fill } from "react-icons/ri";
import { FaClipboardList } from "react-icons/fa";
import { IoIosSettings } from "react-icons/io";
import { BuscarTramites } from "../Elements/BuscarTramites";

const navigation = [
  { name: 'Inicio', icon: RiLayout4Fill, href: 'Dashboard/', current: true },
  { name: 'Mis Trámites', icon: FaClipboardList, href: 'Dashboard/MisTramites', current: false },
  { name: 'Notificaciones', icon: BiNotification, href: 'Dashboard/Notificaciones', current: false },
  { name: 'Mi Perfil', icon: IoIosSettings, href: 'Dashboard/Config', current: false }
]

export const DashboardCiudadanoLayout = () => {

  const matches = useMediaQuery('(min-width: 1024px)');
  const [ IsOpen, setIsOpen ] = useState<boolean>(matches);
  const { isLogged, userData, userRol, Logout } = useContext(AuthContext);
  
  useEffect(() => {
    if(matches){
      setIsOpen(true)
    }
  }, [matches])
  

  const switchmenu = () => setIsOpen(matches || !IsOpen);
  const closemenu = () => setIsOpen(false);

  return (<>
    <LayoutHeader mobile={matches}>{matches?<>

      <LayoutHeaderSpacer/>
      <Link to="Dashboard/Tramites"><Button color="secondary">VER TODOS LOS TRÁMITES ONLINE</Button></Link>
      <Link to="Dashboard/Config"><UserNav>
        <span>{userData.name} {userData.last_name.toUpperCase()}</span>
        <BiUserCircle />
      </UserNav></Link>
      <Link to="Dashboard/Notificaciones" className="button"><MdNotificationsNone/></Link>
      
    </>:<>
    
      {IsOpen?<BiChevronsLeft onClick={switchmenu}/>:<BiMenu onClick={switchmenu}/>}
      <NavigatorSpacer className="ml-1"/> 
      <Link to="Dashboard/" onClick={closemenu}><LogoCiudadanoDigital width="250px" mobile={true} /></Link>
      <NavigatorSpacer className="ml-1"/> 
      <Link to="Dashboard/Notificaciones" onClick={closemenu}><MdNotificationsNone className="mr-2"/></Link>
      <Link to="Dashboard/Config" onClick={closemenu}><BiUserCircle /></Link>

    </>}</LayoutHeader>
    <LayoutContainer>
      <LayoutOverlay visible={IsOpen && !matches} onClick={switchmenu}/>
      <LayoutSidebar open={IsOpen} className={matches?'active':''}>
        {matches?<>
          <LayoutColumns className="mb-8">
            <LogoER width="150px" />
          </LayoutColumns>
          <LayoutCenterBox maxwidth="400px" className="pb-6">
            <LogoCiudadanoDigital/>
          </LayoutCenterBox>
        </>:''}
        <LayoutSidebarMenu>
        {navigation.map((item) => (
          <NavLink
            onClick={switchmenu}
            key={item.name}
            to={item.href}
            className={({isActive}) => (isActive ? 'active':'')}
            aria-current={item.current ? 'page' : undefined}
          >
            <span><item.icon/></span>
            {item.name}
          </NavLink>
        ))}

        </LayoutSidebarMenu>
        <Card>
          <DivTitle2 color="maincolor">{userData.name} {userData.last_name.toUpperCase()}</DivTitle2>
          <DivSubtitle color="maincolor" className="mt-1">{userRol[0].type}<b className="ml-2">{userRol[0].message}</b></DivSubtitle>
          <Button color="maincolor" onClick={Logout}>
              Cerrar Sesión
          </Button>
        </Card>
      </LayoutSidebar>
      <LayoutBody>
        {matches?<></>:
      <Link to="Dashboard/Tramites" className="-mt-7"><Button color="secondary">VER TODOS LOS TRÁMITES ONLINE</Button></Link>}
        {userRol[0].type==='Ciudadano'&&userRol[0].level===1?
          <Link to="Dashboard/Config">
            <LayoutAlert>Completa tus datos en la sección de <b>Mi Perfil</b> para alcanzar el nivel 2 de validación.</LayoutAlert>
          </Link>
        :<></>}
        {userRol[0].type==='Ciudadano'&&userRol[0].level===2?
          <Link to="Dashboard/Config">
            <LayoutAlert>Vincula tu cuentas de Mi Argentina en la sección de <b>Mi Perfil</b> para alcanzar el nivel 3 de validación.</LayoutAlert>
          </Link>
        :<></>}
        <Outlet></Outlet>
        <LayoutFooter>
          <LogoER width="150px" color='var(--gray_tint)' /> Secretaría de Modernización
        </LayoutFooter>
      </LayoutBody>
    </LayoutContainer>
  </>);
};