import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../Contexts/AuthContext";
import { MdOutlineLogout } from 'react-icons/md';
import { AiOutlinePaperClip, AiOutlineSchedule } from 'react-icons/ai'
import { DivOutlined, DivLabel, MainContainer, NavigatorSpacer, NavigatorWrapper, Sidebar, DivSubtitle, DivTitle2, DivTitle } from "../Components/Elements/StyledComponents";
import { Descripcion } from "../Components/Elements/Descripcion";
import { LogoCiudadanoDigital } from "../Components/Images/LogoCiudadanoDigital";
import { Button } from "../Components/Forms/Button";

export const HomePage = () => {
  
  const { isLogged, userData, Logout } = useContext(AuthContext);

  return(<>
    <Sidebar open={true}>
      <LogoCiudadanoDigital/>
      <br />
      {isLogged?<>
        <DivTitle>Bienvenido/a</DivTitle>
        <DivTitle2>{userData.name} {userData.lastname}</DivTitle2>
        <DivSubtitle className="mt-2">CUIL: <b>{userData.cuil}</b></DivSubtitle>
        <DivOutlined color="primary">{userData.roles[0].type}:<b className="ml-2">{userData.roles[0].message}</b></DivOutlined>
        <NavigatorWrapper><NavigatorSpacer /><Link to="/" onClick={Logout}><Button>
          Cerrar Sesión
          <MdOutlineLogout aria-hidden="true" className="h-6 w-auto ml-2"/> 
        </Button></Link></NavigatorWrapper>

        <br />
        <DivSubtitle>Accede a las diferentes opciones de servicios online disponibles para tu nivel</DivSubtitle>
        <div className="flex gap-4 justify-center">
          <Button color="secondary">
            <AiOutlineSchedule aria-hidden="true" className="h-6 w-auto mr-2"/> 
            Servicios
          </Button>
          <Button color="secondary">
            <AiOutlinePaperClip aria-hidden="true" className="h-6 w-auto mr-2"/> 
            Tramites
          </Button>
        </div>
      </>:<>
        <DivTitle>Bienvenido</DivTitle>
        <br />
        <DivLabel>¿Ya te registraste?</DivLabel>
        <Link to="/Ingresar" className="w-full"><Button>
          Iniciar Sesión
        </Button></Link>
        <DivLabel color="secondary">¿Sos nuevo en Ciudadano Digital?</DivLabel>
        <Link to="/Registro" className="w-full"><Button color="secondary">
            Crear una cuenta                               
        </Button></Link>
        <br />
        <DivLabel color="gray_tint">¿Tuviste algun problema al registrarte?</DivLabel>
        <Link to="/RestaurarPassword" className="w-full"><Button color="gray">
            No recuerdo mi contraseña                              
        </Button></Link>
        <Button color="gray" className="w-full">
            No pude validar mi correo electrónico                            
        </Button>
      </>}
    </Sidebar>
    <MainContainer>
      <Descripcion />
    </MainContainer>
  </>)
};
