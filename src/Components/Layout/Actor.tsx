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
import { AiFillEdit, AiOutlineArrowLeft, AiOutlineBell, AiOutlineHome, AiOutlineMenu, AiOutlineMore } from "react-icons/ai";
import { Pages } from "../../Routes/Pages";
import { CitizenNotification, INavigation } from "../../Interfaces/Data";
import { LayoutBreadcrump } from "./Breadcrump";
import { DefaultUserRol } from "../../Data/DefaultValues";
import { HiBellAlert } from "react-icons/hi2";
import { NotificationsContext } from "../../Contexts/NotificationContext";
import { LayoutActorBreadcrump } from "./ActorBreadcrump";
import { FaClipboardList } from "react-icons/fa";
import DropDownEx from "./dropdown";
import { TbPencil } from "react-icons/tb";

const REACTENV = process.env

const navigation:INavigation[] = 
[
  {
    name: 'Validación presencial', href: Pages.DA_PRESENTIAL, icon: TbPencil, path: '/ciudadano_digital/autenticar'
  },
  { 
    name: 'Notificaciones Generales', href: Pages.DA_NOTIFICATIONS, icon: TbPencil, path: '/ciudadano_digital/notificaciones_generales'
  },
  { name: 'Trámites', href: Pages.DA_PROCEDURES, icon: TbPencil, path: "/ciudadano_digital/tramites", children:
    [
      { name: 'Generador de Formularios', href: Pages.DA_PROCEDURES_FORMS, path: "/ciudadano_digital/tramites/formularios" },
      { name: 'Configurador de Tramites', href: Pages.DA_PROCEDURES_CONFIG, path: "/ciudadano_digital/tramites/configuracion" },
      { name: 'Asociar elementos', href: Pages.DA_PROCEDURES_CONFIG_ASSOCIATE, path: "/ciudadano_digital/tramites/configuracion/asociar" },
    ] 
  }
]

export const LayoutActor = () => { 
  
  const [sidebarVisible, setSidebarVisible] = useState(true);
  
  const navigate = useNavigate();

  const isSmallResolution = useMediaQuery('(max-width: 1024px)');
  const [ open, setOpen ] = useState<boolean>(isSmallResolution);
  const { userData, userRol, actorActions, Logout } = useContext(AuthContext);

  const userCitizen:any = userRol.find((obj) => obj.type === "Ciudadano")
  const userActor:any = userRol.find((obj) => obj.type === "Actor")
  const { userNotifications, actorNotifications } = useContext(NotificationsContext);
  const newNotifications = userNotifications.filter((N:CitizenNotification)=>N.NEW);

  let paths = actorActions.map(e=>e[1]);
  
  //paths = ['/ciudadano_digital', '/ciudadano_digital/autenticar', '/ciudadano_digital/notificaciones_generales',, '/ciudadano_digital/tramites','/ciudadano_digital/tramites/configuracion',  '/ciudadano_digital/tramites/formularios']
  //paths = [  '/ciudadano_digital/tramites','/ciudadano_digital/tramites/configuracion',]
  

  useEffect(()=>{
    if((userRol != DefaultUserRol && !userActor)){
      const location = REACTENV.REACT_APP_PROJECT_ADMIN+"/" ;
      window.location.href = location;
    }
  },[userRol])
  
  return (
    <LayoutContainer className='FlexSwitchMobile'>
      <LayoutActorSidebar sidebarVisible={sidebarVisible}>
        <div className="Content">
          <div className="LogoContainer">
            <LogoER width="135px" color="white" />
          </div>
          <LayoutActorSidebarMenu>
            <div className={window.location.pathname==Pages.DA ? 'active' : ''}>  
              <ul>
                <li className='title'>
                  <span><AiOutlineHome/></span>
                  <a href="#" onClick={()=>{window.location.href= REACTENV.REACT_APP_PROJECT_ADMIN+"bienvenido" }} children='Bienvenido' />
                </li>
              </ul>
            </div>
            <h2>
              CIUDADANO DIGITAL
            </h2>
            {navigation.map((item) => (
              <div key={item.name} aria-label={item.href + " "+window.location.pathname} 
              className={(window.location.pathname.startsWith(item.href||"") ? 'active' : '')+" "+(paths.includes(item.path||"")?"":"HIDE")}
              >
                <ul>
                  <li className='title'>
                    <span><item.icon/></span>
                    {item.href?<NavLink to={item.href} children={item.name}/>:<p>{item.name}</p>}
                  </li>
                  {item.children?item.children.map(child=>
                    <li className={'children'+" "+(paths.includes(child.path||"")?"":"HIDE")}>
                      <NavLink to={child.href}
                        className={(window.location.pathname.startsWith(child.href||"") ? 'active' : '')}
                      >
                        {child.name}
                      </NavLink>
                    </li>):<></>
                  }
                </ul>
             </div>
           ))}
           </LayoutActorSidebarMenu>
        </div>
      </LayoutActorSidebar>
      <MainContainer>
        <LayoutActorHeader>
          <button onClick={() => setSidebarVisible(!sidebarVisible)}>
            {sidebarVisible ? <AiOutlineMenu size={25} color="gray"/> : <AiOutlineMenu size={25} color="gray"/>}
          </button>
          <LayoutActorHeaderSpacer/>
          <Link to={Pages.DA_NOTIFICATIONS} className="button notifications"><AiOutlineBell/>{newNotifications.length>0?<span>{newNotifications.length}</span>:<></>}</Link>
          <DropDownEx/>
        </LayoutActorHeader>
        <LayoutActorHeader secondaryHeader={true}>
          <LayoutActorBreadcrump color="gray"/>
        </LayoutActorHeader>
        <LayoutBody>
          <Outlet></Outlet>
          <LayoutFooter className="FlexSwitchTablet">
            <div>
              Dirección General de Informática - <a target="_blank" rel="noreferrer" href="https://www.entrerios.gov.ar/dgin">www.entrerios.gov.ar/dgin</a>
            </div>
          </LayoutFooter>
        </LayoutBody>
      </MainContainer>
    </LayoutContainer>
  )
 };