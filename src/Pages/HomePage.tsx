import { useContext } from "react";
import { Link } from "react-router-dom";
import { Hero } from "../Components/Elements/Hero";
import { AuthContext } from "../Contexts/AuthContext";
import { MdOutlineLogout } from 'react-icons/md';
import { AiOutlineLock, AiOutlinePaperClip, AiOutlineSchedule } from 'react-icons/ai'
import { FormikError, LabelDiv, MainContainer, NavigatorSpacer, NavigatorWrapper, Sidebar, SubtitleDiv, Title2Div, TitleDiv } from "../Components/Elements/StyledComponents";
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
        <TitleDiv>Bienvenido/a</TitleDiv>
        <Title2Div>{userData.name} {userData.lastname}</Title2Div>
        <SubtitleDiv className="mt-2">CUIL: <b>{userData.cuil}</b></SubtitleDiv>
        <FormikError open={true} color="primary">{userData.roles[0][0]}:<b className="ml-2">{userData.roles[0][1]}</b></FormikError>
        <NavigatorWrapper><NavigatorSpacer /><Link to="/" onClick={Logout}><Button>
          Cerrar Sesión
          <MdOutlineLogout aria-hidden="true" className="h-6 w-auto ml-2"/> 
        </Button></Link></NavigatorWrapper>

        <br />
        <SubtitleDiv>Accede a las diferentes opciones de servicios online disponibles para tu nivel</SubtitleDiv>
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
