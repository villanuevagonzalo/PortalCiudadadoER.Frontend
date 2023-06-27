import { useContext, useEffect, useState } from "react";
import { BiChevronsLeft, BiMenu, BiNotification, BiUserCircle } from "react-icons/bi";
import { Link, NavLink, Outlet } from "react-router-dom";
import { AuthContext } from "../../Contexts/AuthContext";
import { NotificationsContext } from "../../Contexts/NotificationContext";
import { LayoutAlert, LayoutBody, LayoutContainer, LayoutFooter, LayoutHeader, LayoutHeaderSpacer, LayoutOverlay, LayoutRow, LayoutSidebar, LayoutSidebarMenu, LayoutSpacer, LayoutStackedPanel, RoundedButton } from "./StyledComponents";
import { Card, DivSubtitle, DivTitle2 } from "../Elements/StyledComponents";
import { Button } from "../Forms/Button";
import { LogoCiudadanoDigital } from "../Images/LogoCiudadanoDigital";
import { LogoER } from "../Images/LogoEntreRios";

import { HiBellAlert } from "react-icons/hi2";
import useMediaQuery from "../../Utils/Hooks";
import { RiLayout4Fill } from "react-icons/ri";
import { FaClipboardList } from "react-icons/fa";
import { IoIosSettings } from "react-icons/io";
import { AiOutlineArrowRight } from "react-icons/ai";
import { Pages } from "../../Routes/Pages";
import { CitizenNotification, INavigation } from "../../Interfaces/Data";
import { LayoutBreadcrump } from "./Breadcrump";



const navigation:INavigation[] = [
  { name: 'Inicio', icon: RiLayout4Fill, href: Pages.DC },
  { name: 'Trámites', icon: FaClipboardList, href: Pages.DC_PROCEDURES, children:[
    { name: 'Mis Trámites', href: Pages.DC_PROCEDURES_STARTED },
  ] },
  { name: 'Notificaciones', icon: BiNotification, href: Pages.DC_NOTIFICATIONS }
]

export const LayoutCiudadano = () => {

  const isSmallResolution = useMediaQuery('(max-width: 1024px)');
  const [ mobile, setMobile ] = useState<boolean>(isSmallResolution);
  const [ open, setOpen ] = useState<boolean>(isSmallResolution);
  const { userData, userRol, Logout } = useContext(AuthContext);

  const userCitizen:any = userRol.find((obj) => obj.type === "Ciudadano")
  const userActor:any = userRol.find((obj) => obj.type === "Actor")
  const { userNotifications, actorNotifications } = useContext(NotificationsContext);
  const newNotifications = userNotifications.filter((N:CitizenNotification)=>N.NEW);
  
  useEffect(() => {
    setMobile(isSmallResolution)
    setOpen(!isSmallResolution)
  }, [isSmallResolution])
  
  const switchmenu = () => setOpen(!isSmallResolution || !open);
  const closemenu = () => setOpen(false);

  return (<>
    <LayoutHeader mobile={mobile}>{mobile?<>
      <div>{open?<BiChevronsLeft onClick={switchmenu}/>:<BiMenu onClick={switchmenu}/>}</div>
      <Link to={Pages.DC} onClick={closemenu} className="flex-1 items-center"><LogoCiudadanoDigital width="250px" mobile={true} /></Link>
      {/*<Link to={Pages.Dashboard/Notificaciones" onClick={closemenu}><MdNotificationsNone className="mr-1"/></Link> */}
      <Link to={Pages.DC_CONFIGURATIONS} onClick={closemenu}><BiUserCircle /></Link>
    </>:<>
      <LayoutHeaderSpacer/>
      <Link to={Pages.DC_PROCEDURES}><Button color="secondary">VER TODOS LOS TRÁMITES ONLINE</Button></Link>
      <Link to={Pages.DC_CONFIGURATIONS}><RoundedButton>
        <span>{userData.name} {userData.last_name.toUpperCase()}</span>
        <BiUserCircle />
      </RoundedButton></Link>
      <Link to={Pages.DC_NOTIFICATIONS} className="button notifications"><HiBellAlert/>{newNotifications.length>0?<span>{newNotifications.length}</span>:<></>}</Link>
    </>}</LayoutHeader>

    <LayoutContainer>
      <LayoutOverlay visible={open && mobile} onClick={switchmenu}/>
      <LayoutSidebar collapsable={mobile} open={open}>
        <div className="Content">
          {mobile?<></>:<>
            <LogoCiudadanoDigital/>
          </>}
          <LayoutSidebarMenu>{navigation.map((item) => (
            <div key={item.name} className={item.href === window.location?.pathname ? 'active' : ''}>
              <span><item.icon/></span>
              <ul>
                <li className={item.children?'title haschildren':'title'}>{item.href?<NavLink
                  onClick={switchmenu}
                  to={item.href}
                  children={item.name}
                />:<p>{item.name}</p>}</li>
                {item.children?item.children.map(child=><li className="children" key={child.name}><NavLink
                  onClick={switchmenu}
                  to={child.href}
                >{child.name}</NavLink></li>):<></>}
              </ul>
            </div>
          ))}</LayoutSidebarMenu>
          <div className="Content2">
          <Card>
            <DivTitle2 color="maincolor">{userData.name} {userData.last_name.toUpperCase()}</DivTitle2>
            <DivSubtitle color="maincolor" className="mt-1">{userCitizen.type}<b className="ml-2">{userCitizen.message}</b></DivSubtitle>
            <Link to={Pages.DC_CONFIGURATIONS} className="f-width"><Button color="maincolor">
              <IoIosSettings/>Mi perfil<LayoutSpacer/>
            </Button></Link>
          </Card> 
          {/*userActor?<Link to={Pages.DA}><Button color="secondary" className="mt-4">
            Ir al Panel de Actor<LayoutSpacer/><AiOutlineArrowRight/>
                </Button></Link>:<></>*/}
          <Button color="primary" onClick={Logout} className="mt-4">
            Cerrar Sesión
          </Button>
          </div>
        </div>
      </LayoutSidebar>
      <LayoutBody mobile={mobile}>
        {mobile?<LayoutRow className="mt-7">
          <Link to={Pages.DC_PROCEDURES} className="-mt-7 w-full"><Button color="secondary">VER TODOS LOS TRÁMITES ONLINE</Button></Link>
        </LayoutRow>:<></>}
        {userCitizen.level===1?
          <Link to={Pages.DC_CONFIGURATIONS}>
            <LayoutAlert>Completa tus datos en la sección de <b>Mi Perfil</b> para alcanzar el nivel 2 de validación.</LayoutAlert>
          </Link>
        :<></>}
        {userCitizen.level===2?
          <Link to={Pages.DC_CONFIGURATIONS}>
            <LayoutAlert>Vincula alguna Aplicación en la sección de <b>Mi Perfil</b> para alcanzar el nivel 3 de validación.</LayoutAlert>
          </Link>
        :<></>}
        <LayoutBreadcrump/>
        <Outlet></Outlet>
        <LayoutFooter className="FlexSwitchTablet">
        <LogoER width="150px" color='var(--gray_tint)' />
          <div>Secretaría de Modernización</div> 
        </LayoutFooter>
      </LayoutBody>
    </LayoutContainer>
  </>);
};