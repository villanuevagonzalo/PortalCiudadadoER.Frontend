import { useContext, useEffect, useState } from "react";
import { BiChevronsLeft, BiMenu, BiNotification, BiUserCircle } from "react-icons/bi";
import { Link, NavLink, Outlet } from "react-router-dom";
import { AuthContext } from "../../Contexts/AuthContext";
import { LayoutAlert, LayoutBody, LayoutCenterBox, LayoutColumn, LayoutColumns, LayoutContainer, LayoutFooter, LayoutHeader, LayoutHeaderSpacer, LayoutOverlay, LayoutRow, LayoutSidebar, LayoutSidebarMenu, LayoutSpacer, LayoutStackedPanel, RoundedButton } from "./StyledComponents";
import { Card, DivSubtitle, DivTitle2 } from "../Elements/StyledComponents";
import { Button } from "../Forms/Button";
import { LogoCiudadanoDigital } from "../Images/LogoCiudadanoDigital";
import { LogoER } from "../Images/LogoEntreRios";

import { MdNotificationsNone } from "react-icons/md";
import useMediaQuery from "../../Utils/Hooks";
import { RiLayout4Fill } from "react-icons/ri";
import { FaClipboardList } from "react-icons/fa";
import { IoIosSettings } from "react-icons/io";


const navigation = [
  { name: 'Inicio', icon: RiLayout4Fill, href: 'Dashboard/' },
  { name: 'Mis Trámites', icon: FaClipboardList, href: 'Dashboard/MisTramites' },
  { name: 'Notificaciones', icon: BiNotification, href: 'Dashboard/Notificaciones' }
]

export const LayoutCiudadano = () => {

  const isSmallResolution = useMediaQuery('(max-width: 1024px)');
  const [ mobile, setMobile ] = useState<boolean>(isSmallResolution);
  const [ open, setOpen ] = useState<boolean>(isSmallResolution);
  const { userData, userRol, Logout } = useContext(AuthContext);
  
  useEffect(() => {
    setMobile(isSmallResolution)
    setOpen(!isSmallResolution)
  }, [isSmallResolution])
  
  const switchmenu = () => setOpen(!isSmallResolution || !open);
  const closemenu = () => setOpen(false);

  return (<>
    <LayoutHeader mobile={mobile}>{mobile?<>
      <div>{open?<BiChevronsLeft onClick={switchmenu}/>:<BiMenu onClick={switchmenu}/>}</div>
      <Link to="/Dashboard/" onClick={closemenu} className="flex-1 items-center"><LogoCiudadanoDigital width="250px" mobile={true} /></Link>
      {/*<Link to="/Dashboard/Notificaciones" onClick={closemenu}><MdNotificationsNone className="mr-1"/></Link> */}
      <Link to="/Dashboard/Config" onClick={closemenu}><BiUserCircle /></Link>
    </>:<>
      <LayoutHeaderSpacer/>
      <Link to="/Dashboard/Tramites"><Button color="secondary">VER TODOS LOS TRÁMITES ONLINE</Button></Link>
      <Link to="/Dashboard/Config"><RoundedButton>
        <span>{userData.name} {userData.last_name.toUpperCase()}</span>
        <BiUserCircle />
      </RoundedButton></Link>
      <Link to="/Dashboard/Notificaciones" className="button"><MdNotificationsNone/></Link>
    </>}</LayoutHeader>

    <LayoutContainer>
      <LayoutOverlay visible={open && mobile} onClick={switchmenu}/>
      <LayoutSidebar collapsable mobile={mobile} open={open}>
        <div className="Content">
          {mobile?<></>:<>
            <LogoCiudadanoDigital/>
          </>}
          <LayoutSidebarMenu>{navigation.map((item) => (
            <NavLink
              onClick={switchmenu}
              key={item.name}
              to={item.href}
              className={({isActive}) => (isActive ? 'active':'')}
            >
              <span><item.icon/></span>
              {item.name}
            </NavLink>
          ))}</LayoutSidebarMenu>
          <Card>
            <DivTitle2 color="maincolor">{userData.name} {userData.last_name.toUpperCase()}</DivTitle2>
            <DivSubtitle color="maincolor" className="mt-1">{userRol[0].type}<b className="ml-2">{userRol[0].message}</b></DivSubtitle>
            <LayoutStackedPanel>
              <Link to="/Dashboard/Config" className="f-width"><Button color="maincolor">
              <IoIosSettings/>Mi perfil<LayoutSpacer/>
              </Button></Link>
              <Link to="/Actor/" className="f-width"><Button color="maincolor">
              <IoIosSettings/>Actor<LayoutSpacer/>
              </Button></Link>
            </LayoutStackedPanel>
          </Card>
          <Button color="primary" onClick={Logout} className="mt-4">
            Cerrar Sesión
          </Button>
        </div>
      </LayoutSidebar>
      <LayoutBody mobile={mobile}>
        {mobile?<LayoutRow>
          <Link to="/Dashboard/Tramites" className="-mt-7 w-full"><Button color="secondary">VER TODOS LOS TRÁMITES ONLINE</Button></Link>
        </LayoutRow>:<></>}
        {userRol[0].type==='Ciudadano'&&userRol[0].level===1?
          <Link to="/Dashboard/Config">
            <LayoutAlert>Completa tus datos en la sección de <b>Mi Perfil</b> para alcanzar el nivel 2 de validación.</LayoutAlert>
          </Link>
        :<></>}
        {userRol[0].type==='Ciudadano'&&userRol[0].level===2?
          <Link to="/Dashboard/Config">
            <LayoutAlert>Vincula alguna Aplicación en la sección de <b>Mi Perfil</b> para alcanzar el nivel 3 de validación.</LayoutAlert>
          </Link>
        :<></>}
        <Outlet></Outlet>
        <LayoutFooter className="FlexSwitchTablet">
          <LogoER width="150px" color='var(--gray_tint)' />
          <div>Secretaría de Modernización</div> 
        </LayoutFooter>
      </LayoutBody>
    </LayoutContainer>
  </>);
};