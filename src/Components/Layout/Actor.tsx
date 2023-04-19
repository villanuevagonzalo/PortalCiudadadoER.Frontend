import { useContext, useEffect, useState } from "react";
import { BiChevronsLeft, BiMenu, BiNotification, BiUserCircle } from "react-icons/bi";
import { Link, NavLink, Outlet } from "react-router-dom";
import { AuthContext } from "../../Contexts/AuthContext";
import { LayoutAlert, LayoutBody, LayoutCenterBox, LayoutColumn, LayoutColumns, LayoutContainer, LayoutFooter, LayoutHeader, LayoutHeaderSpacer, LayoutOverlay, LayoutRow, LayoutSidebar, LayoutSidebarMenu, LayoutSpacer, LayoutStackedPanel, RoundedButton } from "./StyledComponents";
import { Card, ColoredLabel, DivSubtitle, DivTitle2 } from "../Elements/StyledComponents";
import { Button } from "../Forms/Button";
import { LogoCiudadanoDigital } from "../Images/LogoCiudadanoDigital";
import { LogoER } from "../Images/LogoEntreRios";

import { MdNotificationsNone } from "react-icons/md";
import useMediaQuery from "../../Utils/Hooks";
import { RiLayout4Fill } from "react-icons/ri";
import { FaClipboardList } from "react-icons/fa";
import { IoIosSettings } from "react-icons/io";
import { AiOutlineArrowLeft } from "react-icons/ai";


const navigation = [
  { name: 'Inicio', icon: RiLayout4Fill, href: '/Actor/' },
  { name: 'Trámites', icon: FaClipboardList, href: '/Actor/Tramites/' },
  { name: 'Notificaciones', icon: BiNotification, href: '/Actor/Notificaciones/' }
]

export const LayoutActor = () => {

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
      <div>{open?<BiChevronsLeft onClick={switchmenu} color="var(--secondary)"/>:<BiMenu onClick={switchmenu} color="var(--secondary)"/>}</div>
      <Link to="/Dashboard/" onClick={closemenu} className="flex-1 items-center"><LogoCiudadanoDigital width="250px" mobile={true} color="var(--secondary)" /></Link>
      <Link to="/Dashboard/Config" onClick={closemenu}><BiUserCircle color="var(--secondary)"/></Link>
    </>:<>
      <LayoutHeaderSpacer/>
      <Link to="/Dashboard/Config"><RoundedButton>
        <span>{userData.name} {userData.last_name.toUpperCase()}</span>
        <BiUserCircle />
      </RoundedButton></Link>
      <Link to="/Dashboard/Notificaciones" className="button"><MdNotificationsNone/></Link>
    </>}</LayoutHeader>

    <LayoutContainer>
      <LayoutOverlay visible={open && mobile} onClick={switchmenu}/>
      <LayoutSidebar collapsable={mobile} open={open}>
        <div className="Content">
          {mobile?<></>:<>
            <ColoredLabel color="secondary" className="mb-2">ACTORES</ColoredLabel>
            <LogoCiudadanoDigital color="var(--secondary)"/>
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
          <Card color="secondary">
            <DivTitle2 color="maincolor">{userData.name} {userData.last_name.toUpperCase()}</DivTitle2>
            <DivSubtitle color="maincolor" className="mt-1">Actor<b className="ml-2">Nivel 2</b></DivSubtitle>
           
              <Link to="/Dashboard/Config" className="f-width"><Button color="maincolor">
              <IoIosSettings/>Mi perfil<LayoutSpacer/>
              </Button></Link>
          </Card>
          
          <Link to="/Dashboard/"><Button className="mt-4">
              <AiOutlineArrowLeft/><LayoutSpacer/>Volver al Panel Ciudadano
              </Button></Link>
          <Button color="gray" onClick={Logout} className="mt-4">
            Cerrar Sesión
          </Button>
        </div>
      </LayoutSidebar>
      <LayoutBody mobile={mobile}>
        <Outlet></Outlet>
        <LayoutFooter className="FlexSwitchTablet">
          <LogoER width="150px" color='var(--gray_tint)' />
          <div>Secretaría de Modernización</div> 
        </LayoutFooter>
      </LayoutBody>
    </LayoutContainer>
  </>);
};