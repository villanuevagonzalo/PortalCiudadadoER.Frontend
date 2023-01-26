import { useContext } from "react";
import { AiFillHome, AiOutlineSchedule } from "react-icons/ai";
import { BiNotification } from "react-icons/bi";
import { BsLayoutWtf } from "react-icons/bs";
import { Link, NavLink, Outlet } from "react-router-dom";
import { AuthContext } from "../../Contexts/AuthContext";
import { Card, DivOutlined, DivSubtitle, DivTitle2, LayoutBody, LayoutContainer, LayoutFooter, LayoutHeader, LayoutSidebar, LayoutSidebarMenu, LayoutSidebarMenuItem, NavigatorSpacer } from "../Elements/StyledComponents";
import { Button } from "../Forms/Button";
import { LogoCiudadanoDigital } from "../Images/LogoCiudadanoDigital";
import { LogoER } from "../Images/LogoEntreRios";

import logo2 from '../../Assets/LOGO-ER.svg'
import { FaSearch } from "react-icons/fa";
import { FormikField } from "../Forms/FormikField";

const navigation = [
  { name: 'Inicio', icon: BsLayoutWtf, href: 'Dashboard/', current: true },
  { name: 'Mis Tramites', icon: AiOutlineSchedule, href: 'Dashboard/Tramites', current: false },
  { name: 'Notificaciones', icon: BiNotification, href: 'Dashboard/Mensajes', current: false }
]


export const DashboardLayout = () => {


  const { isLogged, userData, Logout } = useContext(AuthContext);

  return (<>
    <LayoutSidebar>
      <LogoCiudadanoDigital width="200px" />
      <LayoutSidebarMenu>
      {navigation.map((item) => (
                      <NavLink
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
        <DivTitle2 color="mainbg">{userData.name} {userData.lastname.toUpperCase()}</DivTitle2>
        <DivSubtitle color="mainbg" className="mt-1">{userData.roles[0].type}<b className="ml-2">{userData.roles[0].message}</b></DivSubtitle>

        <Link to="Dashboard/Config" className="w-full"><Button color="mainbg">
          Mi Perfil
        </Button></Link>

      </Card>
      <Button color="secondary" onClick={Logout}>
          Cerrar Sesión
        </Button>
    </LayoutSidebar>
    <LayoutContainer>
      <LayoutHeader>
        <NavigatorSpacer /> 
        <Link to="/Dashboard/Tramites"><Button color="secondary">
          Ver todos los trámites online
        </Button></Link>
        
        
        <button type="button" className="p-2 text-gray-500 hover:text-gray-700">
                  <span className="sr-only">Ver Notificaciones</span>
                  <FaSearch aria-hidden="true" className="h-6 w-6"  />
                </button>
      </LayoutHeader>
      <LayoutBody>
      <Outlet></Outlet>
      </LayoutBody>
      <LayoutFooter>
        <LogoER width="150px" color='var(--gray)' /> Secretaría de Modernización
      </LayoutFooter>
    </LayoutContainer>
  </>);
};

/**    <>
      <HeaderComponet />
      <Outlet></Outlet>
      <div>
        <FooterComponet />
      </div>
    </> */
