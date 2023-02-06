import { useContext, useEffect, useState } from "react";
import { AiOutlineSchedule } from "react-icons/ai";
import { BiChevronsLeft, BiMenu, BiNotification, BiUserCircle } from "react-icons/bi";
import { BsLayoutWtf } from "react-icons/bs";
import { Link, NavLink, Outlet } from "react-router-dom";
import { AuthContext } from "../../Contexts/AuthContext";
import {  Card, DivSubtitle, DivTitle2,  LayoutBody,  LayoutContainer,  LayoutFooter,  LayoutHeader, LayoutOverlay, LayoutSidebar, LayoutSidebarMenu, NavigatorSpacer, UserNav } from "../Elements/StyledComponents";
import { Button } from "../Forms/Button";
import { LogoCiudadanoDigital } from "../Images/LogoCiudadanoDigital";
import { LogoER } from "../Images/LogoEntreRios";

import useMediaQuery from "../../Utils/hooks";

const navigation = [
  { name: 'Inicio', icon: BsLayoutWtf, href: 'Dashboard/', current: true },
  { name: 'Tramites Online', icon: AiOutlineSchedule, href: 'Dashboard/Tramites', current: false },
  { name: 'Notificaciones', icon: BiNotification, href: 'Dashboard/Mensajes', current: false }
]

export const DashboardLayout = () => {

  const matches = useMediaQuery('(min-width: 1024px)');
  const [ IsOpen, setIsOpen ] = useState<boolean>(matches);
  const { isLogged, userData, Logout } = useContext(AuthContext);
  
  useEffect(() => {
    if(matches){
      setIsOpen(true)
    }
  }, [matches])
  

  const switchmenu = () => setIsOpen(matches || !IsOpen);

  return (<>
    <LayoutHeader>{matches?<>
      <NavigatorSpacer /> 
      <Link to="Dashboard/Config" onClick={switchmenu}><UserNav>
        <span>{userData.name} {userData.lastname.toUpperCase()}</span>
        <BiUserCircle />
      </UserNav></Link>
      
        
    </>:<>
      {IsOpen?<BiChevronsLeft onClick={switchmenu}/>:<BiMenu onClick={switchmenu}/>}
      <NavigatorSpacer /> 
      <LogoCiudadanoDigital width="250px" mobile={true} />
      <NavigatorSpacer className="ml-1"/> 
      <BiUserCircle />
    </>}</LayoutHeader>
    <LayoutContainer>
      <LayoutOverlay visible={IsOpen && !matches} onClick={switchmenu}/>
      <LayoutSidebar open={IsOpen} className="sidebar">
      {matches?<LogoCiudadanoDigital width="300px" className="m-8"/>:''}
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
        <DivTitle2 color="mainbg">{userData.name} {userData.lastname.toUpperCase()}</DivTitle2>
        <DivSubtitle color="mainbg" className="mt-1">{userData.roles[0].type}<b className="ml-2">{userData.roles[0].message}</b></DivSubtitle>

        <Link to="Dashboard/Config" className="w-full" onClick={switchmenu}><Button color="mainbg">
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
          <LogoER width="150px" color='var(--gray)' /> Secretaría de Modernización
        </LayoutFooter>
      </LayoutBody>
    </LayoutContainer>



  </>);
};

/*

    <LayoutSidebar open={IsOpen} className="sidebar">
      <LayoutHeader>
        <MdClose onClick={switchmenu} className="mr-2"/>
        <LogoCiudadanoDigital width="250px" mobile={true} /></LayoutHeader>
      <BOX height="30px">d</BOX>
    </LayoutSidebar>
    <LayoutContainer>
      <LayoutHeader>{matches?<>
        
      </>:<>
        <BiMenu onClick={switchmenu} className="mr-2"/>
        <LogoCiudadanoDigital width="250px" mobile={true} />
      </>}</LayoutHeader>
      <LayoutBody>
      <Outlet></Outlet>
      </LayoutBody>
      <LayoutFooter>
        <LogoER width="150px" color='var(--gray)' /> Secretaría de Modernización
      </LayoutFooter>
    </LayoutContainer>

*/




/**    <>
      <HeaderComponet />
      <Outlet></Outlet>
      <div>
        <FooterComponet />
      </div>
    </> */


    /**
     * 
    <Button color="primary" onClick={switchmenu}>
          menu
        </Button>
      {`The view port is ${matches ? 'at least' : 'less than'} 768 pixels wide`}
     * 
     * <LayoutSidebar open={IsOpen} className="sidebar">
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
        <NavigatorSpacer /> <Button color="primary" onClick={switchmenu}>
          menu
        </Button>
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
     * 
     */