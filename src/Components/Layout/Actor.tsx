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
import { FaClipboardList } from "react-icons/fa";


const navigation:INavigation[] = 
[
  {
    name: 'Validación presencial', icon: AiOutlineHome
  },
  { name: 'Gestor de Notificaciones', icon: AiFillEdit, children:
    [
      { name: 'Lista de Notificaciones', href: Pages.DA_NOTIFICATIONS },
      { name: 'Crear Nueva Notificación', href: Pages.DA_NOTIFICATIONS_NEW },
    ] 
  },
  { name: 'Gestor de Trámites', icon: FaClipboardList, children:
    [
      { name: 'Lista de Formularios', href: Pages.DA_PROCEDURES_FORMS },
      { name: 'Lista de Tramites', href: Pages.DA_PROCEDURES_LIST },
    ] 
  }
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

  return (
    <LayoutContainer className='FlexSwitchMobile'>
      <LayoutActorSidebar>
      <div className="Content">
           <LayoutActorSidebarMenu>
           <div>  
               <ul>
                 <li className='title'>
                 <span><AiOutlineHome/></span>
                     <NavLink
                       onClick={switchmenu}
                       to={Pages.DA}
                       children='Inicio'/>
                 </li>
               </ul>
             </div>
             <h2>
              CIUDADANO DIGITAL
             </h2>
            {navigation.map((item) => (
             <div key={item.name} className={window.location.pathname.startsWith(item.href||"") ? 'active' : ''} aria-label={item.href + " "+window.location.pathname}>
               <ul>
                 <li className='title'>
                 <span><item.icon/></span>
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
                   <span><item.icon/></span>
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
          <Button color="gray" onClick={Logout} className="mt-4">
             Cerrar Sesión
           </Button>
         </div>
      </LayoutActorSidebar>
      <MainContainer>
           <LayoutActorHeader mobile={mobile}>
       <LayoutActorHeaderSpacer/>
       <Link to={Pages.DA_NOTIFICATIONS} className="button notifications"><AiOutlineBell/>{newNotifications.length>0?<span>{newNotifications.length}</span>:<></>}</Link>
       <Link to={Pages.DC_CONFIGURATIONS}><RoundedActorButton>
         <span>{userData.name} {userData.last_name.toUpperCase()}</span>
         {/* <AiOutlineMore /> */}
        
       </RoundedActorButton></Link>
       {/* <DropdownItem/> */}
     </LayoutActorHeader>
     <LayoutActorHeader mobile={mobile} secondaryHeader={true}>
     {/* Contenido del encabezado inferior */}
     <LayoutActorBreadcrump color="gray"/>
     </LayoutActorHeader>
        <LayoutBody mobile={mobile}>
         {/* <LayoutBreadcrump color="secondary"/> */}
         <Outlet></Outlet>
         <LayoutFooter className="FlexSwitchTablet">
           <LogoER width="150px" color='var(--gray_tint)' />
           <div>Secretaría de Modernización</div> 
         </LayoutFooter>
       </LayoutBody>
      </MainContainer>
    </LayoutContainer>


  )
 };

const DropdownItem = (props: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    // Lógica para cerrar sesión
  };

  return(
      <div className="dropdownItem">
          {/* <AiOutlineMore /> */}
          <button className="dropdown-toggle" onClick={handleToggle}>
          <AiOutlineMore />
          </button>
      {isOpen && (
        <ul className="dropdown-menu">
          <li>
            <button onClick={handleLogout}>Cerrar sesión</button>
          </li>
        </ul>
      )}
      </div>
  );
};