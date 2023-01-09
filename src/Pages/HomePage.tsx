import { useContext } from "react";
import { Link } from "react-router-dom";
import { Hero } from "../Components/Elements/Hero";
import { AuthContext } from "../Contexts/AuthContext";
import { MdOutlineLogout } from 'react-icons/md';
import { AiOutlineLock, AiOutlinePaperClip } from 'react-icons/ai'
import { LabelDiv, MainContainer, Sidebar, SubtitleDiv, TitleDiv } from "../Components/Elements/StyledComponents";
import { Descripcion } from "../Components/Elements/Descripcion";
import { LogoCiudadanoDigital } from "../Components/Elements/LogoCiudadanoDigital";
import { Button } from "../Components/Forms/Button";

export const HomePage = () => {
  
  const { isLogged, userData, Logout } = useContext(AuthContext);

  return(<>
    <Sidebar open={true}>
      <LogoCiudadanoDigital/>
      <br />
      {isLogged?<>
        <TitleDiv>Bienvenido <b>{userData.name} {userData.lastname}</b></TitleDiv>
        <SubtitleDiv>Accede a las diferentes opciones de servicios online disponibles para tu nivel</SubtitleDiv>
        <div className="flex space-x-4 text-sm justify-center w-full md:justify-start">
          <Button color="gray">CUIL<br/><b>{userData.cuil}</b></Button>
          <Button color="gray">{userData.roles[0][0]}<br/><b>{userData.roles[0][1]}</b></Button>
        </div>
        <br />
        <div className="flex space-x-4 text-sm justify-center w-full md:justify-start">
        <Link to="/DashboardCiudadano"><Button color="secondary">
          <AiOutlinePaperClip aria-hidden="true" className="h-6 w-auto mr-2"/> 
          Servicios
        </Button></Link>
        <Link to="/" onClick={Logout}><Button>
          Cerrar Sesión
          <MdOutlineLogout aria-hidden="true" className="h-6 w-auto ml-2"/> 
        </Button></Link>
        </div>
      </>:<>
        <TitleDiv>Bienvenido</TitleDiv>
        <br />
        <LabelDiv>¿Ya te registraste?</LabelDiv>
        <Link to="/Ingresar" className="w-full"><Button>
          Iniciar Sesión
        </Button></Link>
        <LabelDiv color="secondary">¿Sos nuevo en Ciudadano Digital?</LabelDiv>
        <Link to="/Registro" className="w-full"><Button color="secondary">
            Crear una cuenta                               
        </Button></Link>
        <br />
        <LabelDiv color="gray_tint">¿Tuviste algun problema al registrarte?</LabelDiv>
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
