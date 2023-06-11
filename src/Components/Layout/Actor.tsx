import { useContext, useEffect, useState } from "react";
import { BiChevronsLeft, BiMenu, BiNotification, BiUserCircle } from "react-icons/bi";
import { Link, NavLink, Navigate, Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Contexts/AuthContext";
import { LayoutBody, LayoutContainer, LayoutFooter, LayoutHeader, LayoutHeaderSpacer, LayoutOverlay, LayoutActorSidebar, LayoutSidebarMenu, LayoutSpacer, RoundedButton, RoundedActorButton, LayoutActorSidebarMenu, LayoutActorHeader, LayoutActorHeaderSpacer } from "./StyledComponents";
import { Card, ColoredLabel, DivSubtitle, DivTitle2, LogoActorContainer, MainContainer } from "../Elements/StyledComponents";
import { Button } from "../Forms/Button";
import { LogoCiudadanoDigital } from "../Images/LogoCiudadanoDigital";
import { LogoER } from "../Images/LogoEntreRios";

import useMediaQuery from "../../Utils/Hooks";
import { RiLayout4Fill } from "react-icons/ri";
import { IoIosSettings } from "react-icons/io";
import { AiFillEdit, AiOutlineArrowLeft, AiOutlineBell, AiOutlineHome, AiOutlineMore } from "react-icons/ai";
import { Pages } from "../../Routes/Pages";
import { CitizenNotification, INavigation } from "../../Interfaces/Data";
import { LayoutBreadcrump } from "./Breadcrump";
import { DefaultUserRol } from "../../Data/DefaultValues";
import { HiBellAlert } from "react-icons/hi2";
import { NotificationsContext } from "../../Contexts/NotificationContext";
import { LayoutActorBreadcrump } from "./ActorBreadcrump";


const navigation:INavigation[] = [
  { name: 'Inicio', icon: AiOutlineHome, href: Pages.DA },
  /*{ name: 'Gestor de Trámites', icon: FaClipboardList, href: Pages.DA_PROCEDURES, children:[
    { name: 'Lista de Formularios', href: Pages.DA_PROCEDURES_FORMS },
    { name: 'Lista de Tramites', href: Pages.DA_PROCEDURES_LIST },
  ] },*/
  { name: 'Gestor de Notificaciones', icon: AiFillEdit, href: Pages.DA_NOTIFICATIONS, children:[
    { name: 'Crear Nueva Notificación', href: Pages.DA_NOTIFICATIONS_NEW },
  ] }
]

export const LayoutActor = () => { 
  
  
  const navigate = useNavigate();

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

  useEffect(()=>{
    if(userRol != DefaultUserRol && !userActor){
      navigate(Pages.DC)
    }
  },[userRol])
  
  const switchmenu = () => setOpen(!isSmallResolution || !open);
  const closemenu = () => setOpen(false);

  return (userActor?<>
    <LayoutActorHeader mobile={mobile}>{mobile?<>
      <div>{open?<BiChevronsLeft onClick={switchmenu} color="var(--secondary)"/>:<BiMenu onClick={switchmenu} color="var(--secondary)"/>}</div>
      <Link to={Pages.DA} onClick={closemenu} className="flex-1 items-center"><LogoCiudadanoDigital width="250px" mobile={true} color="var(--secondary)" /></Link>
      <Link to={Pages.DC_CONFIGURATIONS} onClick={closemenu}><BiUserCircle color="var(--secondary)"/></Link>
    </>:<>
      <LayoutActorHeaderSpacer/>
      <Link to={Pages.DA_NOTIFICATIONS} className="button notifications"><AiOutlineBell/>{newNotifications.length>0?<span>{newNotifications.length}</span>:<></>}</Link>
      <Link to={Pages.DC_CONFIGURATIONS}><RoundedActorButton>
        <span>{userData.name} {userData.last_name.toUpperCase()}</span>
        <AiOutlineMore />
      </RoundedActorButton></Link>
    </>}</LayoutActorHeader>
    <LayoutActorHeader mobile={mobile} secondaryHeader={true}>
    {/* Contenido del encabezado inferior */}
    <LayoutActorBreadcrump color="gray"/>
    </LayoutActorHeader>

    <LayoutContainer>
      <LayoutOverlay visible={open && mobile} onClick={switchmenu}/>
      <LayoutActorSidebar collapsable={mobile} open={open}>
        <div className="Content">
          {mobile?<></>:<>
            <LogoActorContainer><LogoER width="135px" color='white'/></LogoActorContainer>
          </>}
          <LayoutActorSidebarMenu>{navigation.map((item) => (
            <div key={item.name} className={window.location.pathname.startsWith(item.href||"") ? 'active' : ''} aria-label={item.href + " "+window.location.pathname}>
              <span><item.icon/></span>
              <ul>
                <li className='title'>
                  {
                    item.href?<NavLink
                      onClick={switchmenu}
                      to={item.href}
                      children={item.name}
                    />:<p>{item.name}</p>
                  }
                </li>
                {
                item.children?item.children.map(child=>
                  <li className='children'>
                  <NavLink
                  onClick={switchmenu}
                  to={child.href}
                  className={window.location.pathname.startsWith(child.href||"") ? 'active' : ''}
                  >
                    {child.name}
                  </NavLink>
                  </li>):<></>
                }
              </ul>
            </div>
          ))}</LayoutActorSidebarMenu>
          {/* <Card color="secondary">
            <DivTitle2 color="maincolor">{userData.name} {userData.last_name.toUpperCase()}</DivTitle2>
            <DivSubtitle color="maincolor" className="mt-1">{userActor.type}<b className="ml-2">{userActor.message}</b></DivSubtitle>
            <Link to={Pages.DC_CONFIGURATIONS} className="f-width"><Button color="maincolor">
              <IoIosSettings/>Mi perfil<LayoutSpacer/>
            </Button></Link>
          </Card> */}
          {/* <Link to={Pages.DC}><Button className="mt-4">
            <AiOutlineArrowLeft/><LayoutSpacer/>Volver al Panel Ciudadano
          </Button></Link> */}
          <Button color="gray" onClick={Logout} className="mt-4">
            Cerrar Sesión
          </Button>
        </div>
      </LayoutActorSidebar>
      <LayoutBody mobile={mobile}>
        {/* <LayoutBreadcrump color="secondary"/> */}
        <Outlet></Outlet>
        <LayoutFooter className="FlexSwitchTablet">
          <LogoER width="150px" color='var(--gray_tint)' />
          <div>Secretaría de Modernización</div> 
        </LayoutFooter>
      </LayoutBody>
    </LayoutContainer>
  </>:<></>);
};