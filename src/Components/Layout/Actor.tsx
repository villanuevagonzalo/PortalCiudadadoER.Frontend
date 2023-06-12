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
import DropDownEx from "./dropdown";


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
        <div className="LogoContainer">
          <LogoER width="135px" color="white" />
        </div>
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
             {/* <h2 className=" text-white py-5 px-4 text-xs font-bold"> */}
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
           ))}
           </LayoutActorSidebarMenu>
         </div>
      </LayoutActorSidebar>
      <MainContainer>
           <LayoutActorHeader mobile={mobile}>
       <LayoutActorHeaderSpacer/>
       <Link to={Pages.DA_NOTIFICATIONS} className="button notifications"><AiOutlineBell/>{newNotifications.length>0?<span>{newNotifications.length}</span>:<></>}</Link>
       <DropDownEx/>
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

// const DropdownItem = (props: any) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const handleToggle = () => {
//     setIsOpen(!isOpen);
//   };

//   const handleLogout = () => {
//     // Lógica para cerrar sesión
//   };

//   return(
//       <><button id="dropdownMenuIconButton" data-dropdown-toggle="dropdownDots" className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-600" type="button" onClick={handleToggle}>
//       {/* <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"></path></svg> */}
//       <AiOutlineMore />
//       </button>
//     <div id="dropdownDots" className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
//         {/* <AiOutlineMore /> */}
//         {/* <button className="dropdown-toggle" onClick={handleToggle}>
//     <AiOutlineMore />
//     </button> */}
//         {isOpen && (
//           <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownMenuIconButton">
//             <li>
//               <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" onClick={handleLogout}>Cerrar Sesión</a>
//               {/* <button onClick={handleLogout}>Cerrar sesión</button> */}
//             </li>
//             <li>
//               <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Settings</a>
//             </li>
//           </ul>
//         )}
//       </div></>
//   );
// };